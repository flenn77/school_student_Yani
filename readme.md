### `README.md`
```markdown
# Microservices avec Node.js, Express, Vue.js et Consul

Ce projet illustre la création de microservices en Node.js avec une gestion des écoles (`school-service`) et des étudiants (`student-service`), intégrés à Consul pour le service discovery.

## Pré-requis
- **Node.js** (v18 ou plus)
- **Docker** et **Docker Compose**
- Un éditeur de code comme **VS Code**

---

## Architecture
1. **school-service** : Gestion des écoles, connecté à PostgreSQL.
2. **student-service** : Gestion des étudiants, connecté à MongoDB.
3. **Vue.js Frontend** : Interface utilisateur pour interagir avec les services.
4. **Consul** : Utilisé pour le service discovery et les health checks.

---

## Commandes pour lancer le projet

### Étape 1 : Cloner le dépôt
```bash
git clone <repository_url>
cd <repository_folder>
```

### Étape 2 : Lancer Docker Compose
```bash
docker-compose up --build
```
- OU :

```bash
DOCKER_BUILDKIT=0 docker-compose up --build
```

---

## Points d'accès principaux

### **Endpoints d'API**
- **School Service**
  - Health Check : `GET http://localhost:8081/health`
  - Liste des écoles : `GET http://localhost:8081/schools`
  - Ajouter une école : `POST http://localhost:8081/schools`
  - Modifier une école : `PUT http://localhost:8081/schools/:id`
  - Supprimer une école : `DELETE http://localhost:8081/schools/:id`

- **Student Service**
  - Health Check : `GET http://localhost:8082/health`
  - Liste des étudiants : `GET http://localhost:8082/students`
  - Ajouter un étudiant : `POST http://localhost:8082/students`
  - Modifier un étudiant : `PUT http://localhost:8082/students/:id`
  - Supprimer un étudiant : `DELETE http://localhost:8082/students/:id`

### **Frontend**
- Accessible via : `http://localhost:8080`

---

## Tests des API

### Exemple de requête avec `curl`

#### School Service
- Ajouter une école :
  ```bash
  curl -X POST http://localhost:8081/schools \
  -H "Content-Type: application/json" \
  -d '{"name": "École A", "adress": "123 rue principale", "directorName": "M. Dupont"}'
  ```

- Récupérer toutes les écoles :
  ```bash
  curl -X GET http://localhost:8081/schools
  ```

#### Student Service
- Ajouter un étudiant :
  ```bash
  curl -X POST http://localhost:8082/students \
  -H "Content-Type: application/json" \
  -d '{"name": "Jean Dupont", "genre": "M", "schoolId": 1}'
  ```

- Récupérer tous les étudiants :
  ```bash
  curl -X GET http://localhost:8082/students
  ```

---

## Consul

### Accès à l'interface de Consul
- **URL** : `http://localhost:8500`

### Vérification des services enregistrés
1. Ouvrir `http://localhost:8500` dans un navigateur.
2. Vérifier que les services `school-service` et `student-service` apparaissent avec le statut `UP`.

---

## Structure des dossiers

```
project/
├── school-service/
│   ├── models/
│   │   └── school.js
│   ├── routes/
│   │   └── schoolRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── student-service/
│   ├── models/
│   │   └── student.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── services/
│   │   └── schoolService.js
│   ├── config/
│   │   └── db.js
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── my-vue-front/
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── router/
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## Auteur
Projet réalisé pour démontrer l'architecture microservices avec Node.js, Vue.js et Consul.
```

N'hésite pas à me demander si des ajustements sont nécessaires ! 😊