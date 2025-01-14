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
RUN npm install express
EXPOSE 8080

# Script de démarrage pour servir les fichiers statiques
CMD ["node", "-e", "const express = require('express'); const app = express(); const port = 8080; app.use(express.static('./')); app.listen(port, () => console.log('Application running on http://localhost:' + port));"]
