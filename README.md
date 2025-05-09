# React Todo App with Persistent Backend and Reverse Proxy

## Projektstruktur
- `frontend/`: React-Frontend mit Nginx als Reverse Proxy
- `backend/`: Node.js-Express-Backend mit Dateibasiertem Speicher
- `.dockerignore` und `.gitignore`: Ignorierte Dateien

## Anwendung starten
1. Docker-Netzwerk erstellen:
   ```bash
   docker network create my-app-network
   ```

2. Backend-Container starten:
   ```bash
   cd backend
   docker build -t my-backend-api:network-proxy .
   docker run -d --name backend-service --network my-app-network -v my-backend-data:/app/data my-backend-api:network-proxy
   ```

3. Frontend-Container starten:
   ```bash
   cd ../frontend
   docker build --build-arg VITE_API_URL=/api -t my-frontend-app:network-proxy .
   docker run -d --name frontend-app --network my-app-network -p 8080:80 my-frontend-app:network-proxy
   ```

4. Anwendung im Browser öffnen: [http://localhost:8080](http://localhost:8080).

## SQL Recap
Das Repository enthält eine theoretische Ausarbeitung zum relationalen Datenmodell und den zugehörigen SQL-Abfragen. Die Dokumentation befindet sich in der Datei [sql-recap.md](./sql-recap.md).