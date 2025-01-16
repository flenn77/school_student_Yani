# Étape 1 : Construction de l'application
FROM node:18-alpine AS build

WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez tout le reste du code
COPY . .

# Construisez l'application
RUN npm run build

# Étape 2 : Servir l'application avec un serveur léger
FROM node:18-alpine

WORKDIR /app

# Copiez le dossier 'build' du conteneur précédent
COPY --from=build /app /app

# Installez les dépendances pour démarrer l'application
RUN npm install --only=production

# Exposez le port de l'application Next.js
EXPOSE 3000

# Commande de démarrage de Next.js
CMD ["npm", "start"]
