# Étape 1 : Build de l'application Vue.js
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Utilisation de Node.js pour servir les fichiers
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist /app
RUN npm install express axios
EXPOSE 8080

# Script de démarrage pour inclure Consul
CMD ["node", "-e", "const express = require('express'); const axios = require('axios'); const app = express(); const port = 8080; const CONSUL_ADDRESS = process.env.CONSUL_HTTP_ADDR || 'http://localhost:8500'; const SERVICE_ID = 'vue-front'; app.use(express.static('./')); axios.put(`${CONSUL_ADDRESS}/v1/agent/service/register`, { Name: 'vue-front', ID: SERVICE_ID, Address: 'vue-front', Port: port, Check: { HTTP: `http://vue-front:${port}`, Interval: '10s', Timeout: '5s' } }).then(() => console.log('Service vue-front registered with Consul')).catch(err => console.error('Failed to register vue-front with Consul:', err.message)); process.on('SIGINT', async () => { try { await axios.put(`${CONSUL_ADDRESS}/v1/agent/service/deregister/${SERVICE_ID}`); console.log('Service vue-front deregistered from Consul'); process.exit(); } catch (err) { console.error('Failed to deregister vue-front from Consul:', err.message); process.exit(1); } }); app.listen(port, () => console.log('Application running on http://localhost:' + port));"]
