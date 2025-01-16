const axios = require("axios");

const CONSUL_URL = process.env.CONSUL_HTTP_ADDR || "http://localhost:8500";
let cachedSchoolServiceUrl = null;
let cachedSchools = []; // Cache pour toutes les écoles
let cacheTimestamp = null; // Timestamp du dernier cache

const CACHE_EXPIRY_TIME = 10 * 60 * 1000; // Cache valable pendant 10 minutes
const MAX_RETRIES = 3; // Nombre maximal de tentatives de retry
const RETRY_DELAY = 2000; // Délai entre les tentatives en ms (2 secondes)

async function getSchoolServiceUrl() {
  if (cachedSchoolServiceUrl) {
    return cachedSchoolServiceUrl;
  }

  let attempts = 0;
  while (attempts < MAX_RETRIES) {
    try {
      const response = await axios.get(`${CONSUL_URL}/v1/catalog/service/school-service`);
      if (!response.data.length) {
        throw new Error("Aucune instance de school-service trouvée via Consul");
      }

      const service = response.data[0];
      cachedSchoolServiceUrl = `http://${service.ServiceAddress || service.Address}:${service.ServicePort}`;
      return cachedSchoolServiceUrl;
    } catch (error) {
      attempts++;
      console.error(`[Consul] Tentative ${attempts}/${MAX_RETRIES} échouée : ${error.message}`);
      if (attempts >= MAX_RETRIES) {
        console.error("[Consul] Échec après plusieurs tentatives, utilisation de l'URL de fallback.");
        return process.env.SCHOOL_SERVICE_URL || "http://localhost:8081"; // Fallback si toutes les tentatives échouent
      }
      console.log(`[Consul] Attente de ${RETRY_DELAY / 1000} secondes avant de réessayer...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
}

// Vérifier si le cache des écoles est encore valide
function isCacheValid() {
  return cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_EXPIRY_TIME;
}

// 🆕 Récupérer toutes les écoles en une seule requête avec cache et retry
async function getAllSchools() {
  if (isCacheValid()) {
    console.log("[SchoolService] Utilisation du cache pour les écoles");
    return cachedSchools;
  }

  try {
    const baseUrl = await getSchoolServiceUrl();
    const response = await axios.get(`${baseUrl}/schools`);
    cachedSchools = response.data;
    cacheTimestamp = Date.now(); // Mettre à jour le timestamp du cache
    console.log("[SchoolService] Cache des écoles rafraîchi");
    return cachedSchools;
  } catch (error) {
    console.error(`[SchoolService] Erreur récupération de toutes les écoles: ${error.message}`);
    return [];
  }
}

async function getSchoolById(schoolId) {
  let attempts = 0;
  while (attempts < MAX_RETRIES) {
    try {
      const baseUrl = await getSchoolServiceUrl();
      const response = await axios.get(`${baseUrl}/schools/${schoolId}`);
      return response.data;
    } catch (error) {
      attempts++;
      console.error(`[SchoolService] Tentative ${attempts}/${MAX_RETRIES} échouée pour l'école ${schoolId}: ${error.message}`);
      if (attempts >= MAX_RETRIES) {
        console.error("[SchoolService] Échec après plusieurs tentatives");
        return null;
      }
      console.log(`[SchoolService] Attente de ${RETRY_DELAY / 1000} secondes avant de réessayer...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
}

module.exports = { getSchoolById, getAllSchools };
