
# 📚 School & Student Management Microservices

## 🔥 Introduction
Ce projet est une architecture microservices permettant de gérer des écoles (`school-service`) et des étudiants (`student-service`). Il est basé sur **Node.js**, **Express.js**, **PostgreSQL**, **MongoDB**, et **Consul** pour la découverte de services.  
L'architecture inclut aussi **Traefik** comme reverse proxy et **Docker Compose** pour la gestion des conteneurs.

---

## 📌 Technologies utilisées
| Technologie   | Description |
|--------------|------------|
| **Node.js**  | Environnement d'exécution JavaScript pour le backend |
| **Express.js** | Framework web rapide et minimaliste pour les APIs REST |
| **Sequelize** | ORM pour interagir avec PostgreSQL dans `school-service` |
| **Mongoose** | ODM pour interagir avec MongoDB dans `student-service` |
| **PostgreSQL** | Base de données relationnelle utilisée pour `school-service` |
| **MongoDB** | Base de données NoSQL utilisée pour `student-service` |
| **Consul** | Service de découverte et de configuration dynamique |
| **Traefik** | Reverse proxy utilisé pour exposer les services |
| **Docker & Docker Compose** | Conteneurisation des services |
| **Next.js** (Front-end) | Framework React pour le front-end (non détaillé ici) |

---

## 🛠️ **Architecture générale**

```
+------------------+      +------------------+
|  school-service  | ---> | PostgreSQL (DB)  |
+------------------+      +------------------+
          |
          | REST API
          |
          v
+------------------+      +------------------+
| student-service  | ---> |  MongoDB (DB)    |
+------------------+      +------------------+
          |
          | REST API
          |
          v
+------------------+      +------------------+
|     Frontend     | ---> | Traefik (Proxy)  |
+------------------+      +------------------+
          |
          v
+------------------+
|   Consul (SD)   |
+------------------+
```

---

## ⚙️ **Services et configurations**
| Service | Port Interne | Port Exposé | URL d'accès |
|---------|------------|------------|-------------|
| **Traefik (Proxy)** | 80 | 8080 | `http://localhost:8080` (Dashboard) |
| **PostgreSQL (DB)** | 5432 | 5432 | `postgres://postgres:postgres@localhost:5432/schooldb` |
| **MongoDB (DB)** | 27017 | 27017 | `mongodb://mongo_db:27017/studentdb` |
| **Consul (Service Discovery)** | 8500 | 8500 | `http://localhost:8500` |
| **School Service** | 8081 | 8081 | `http://localhost:8081/schools` |
| **Student Service** | 8082 | 8082 | `http://localhost:8082/students` |
| **Frontend (Next.js)** | 3000 | 3000 | `http://localhost:3000` |

---

## 📂 **Structure du projet**
```
mon-projet/
│── school-service/
│   ├── models/school.js
│   ├── routes/schoolRoutes.js
│   ├── config/db.js
│   ├── index.js
│   ├── Dockerfile
│   ├── package.json
│── student-service/
│   ├── models/student.js
│   ├── routes/studentRoutes.js
│   ├── config/db.js
│   ├── index.js
│   ├── Dockerfile
│   ├── package.json
│── my-next-front/ (Frontend)
│   ├── pages/
│   ├── components/
│   ├── services/api.js
│   ├── package.json
│   ├── Dockerfile
│── docker-compose.yml
│── README.md
```

---

## 🏗️ **Installation et démarrage**
### 1️⃣ **Cloner le projet**
```sh
git clone https://github.com/mon-projet.git
cd mon-projet
```

### 2️⃣ **Lancer les services avec Docker**
```sh
docker-compose up --build -d
```

### 3️⃣ **Vérifier les conteneurs**
```sh
docker ps
```

### 4️⃣ **Vérifier la santé des services**
```sh
curl -X GET http://localhost:8500/v1/agent/services
```

### 5️⃣ **Tester les APIs**
#### 📌 **School Service**
- Récupérer toutes les écoles :  
  ```sh
  curl -X GET http://localhost:8081/schools
  ```
- Ajouter une école :  
  ```sh
  curl -X POST http://localhost:8081/schools -H "Content-Type: application/json" -d '{"name":"Ecole Test", "adress":"123 Rue Test", "directorName":"John Doe"}'
  ```
- Supprimer une école :  
  ```sh
  curl -X DELETE http://localhost:8081/schools/1
  ```

#### 📌 **Student Service**
- Récupérer tous les étudiants :  
  ```sh
  curl -X GET http://localhost:8082/students
  ```
- Ajouter un étudiant :  
  ```sh
  curl -X POST http://localhost:8082/students -H "Content-Type: application/json" -d '{"name":"Jane Doe", "genre":"Female", "schoolId":1}'
  ```
- Supprimer un étudiant :  
  ```sh
  curl -X DELETE http://localhost:8082/students/6788e71da2f30272453275f7
  ```

---

## 🛠️ **Dépannage & Debug**
### 🔍 **Consulter les logs**
```sh
docker logs -f mon-projet_school-service_1
docker logs -f mon-projet_student-service_1
```

### 🔍 **Accéder au shell d'un service**
```sh
docker exec -it mon-projet_school-service_1 sh
docker exec -it mon-projet_student-service_1 sh
```

### 🔍 **Tester la connexion à la base de données**
```sh
docker exec -it postgres_db psql -U postgres -d schooldb
```
Puis, dans `psql` :
```sql
SELECT * FROM "Schools";
```

---

