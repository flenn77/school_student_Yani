# 🛑 Arrêter immédiatement si une commande échoue
SHELL := /bin/bash
.DEFAULT_GOAL := help

# Variables
DOCKER_COMPOSE = docker-compose
DOCKER = docker
CURL = curl -s -o /dev/null -w "%{http_code}"

# 📌 Aide - Affiche les commandes disponibles
help:
	@echo "📌 Commandes disponibles :"
	@echo "  make restart     → Redémarre tous les services"
	@echo "  make logs        → Affiche les logs de tous les services"
	@echo "  make logs-traefik → Affiche les logs de Traefik"
	@echo "  make test        → Vérifie si les services sont UP"
	@echo "  make clean       → Supprime les conteneurs, volumes et images non utilisées"
	@echo "  make prune       → Nettoyage total de Docker (dangereux !)"

# 🔄 Redémarrer les services
restart:
	$(DOCKER_COMPOSE) restart

# 📜 Voir les logs de tous les services
logs:
	$(DOCKER_COMPOSE) logs -f --tail=100

# 📜 Voir les logs de Traefik
logs-traefik:
	$(DOCKER) logs -f traefik

# ✅ Tester si les services sont bien UP
test:
	@echo "🔎 Vérification des services..."
	@if curl -s -o /dev/null -w "%{http_code}" http://localhost/schools | grep -q '200'; then echo "✅ School Service: OK"; else echo "❌ School Service: FAILED"; fi
	@if curl -s -o /dev/null -w "%{http_code}" http://localhost/students | grep -q '200'; then echo "✅ Student Service: OK"; else echo "❌ Student Service: FAILED"; fi
	@if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q '200'; then echo "✅ Frontend (Next.js): OK"; else echo "❌ Frontend (Next.js): FAILED"; fi
	@if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/dashboard/ | grep -q '200'; then echo "✅ Traefik Dashboard: OK"; else echo "❌ Traefik Dashboard: FAILED"; fi

