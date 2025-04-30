# Basis-Image: Ein schlankes Nginx-Image
FROM nginx:alpine

# Lösche die Standard-Nginx-Seite (optional)
RUN rm -rf /usr/share/nginx/html/*

# Kopiere den gebauten Vite-Output in das Verzeichnis, das Nginx bereitstellt
COPY dist/ /usr/share/nginx/html

# Exponiere den Port 80
EXPOSE 80

# Starte Nginx im Vordergrund
CMD ["nginx", "-g", "daemon off;"]
