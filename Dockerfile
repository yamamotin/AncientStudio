FROM python:3.11-slim

WORKDIR /app

COPY index.html robots.txt sitemap.xml api-status.json ./
COPY assets ./assets
COPY api ./api

ENV PORT=8000
EXPOSE 8000

CMD ["python3", "api/server.py"]
