FROM python:3.11-slim

WORKDIR /app

COPY index.html robots.txt sitemap.xml api-status.json ./
COPY assets ./assets
COPY api ./api

RUN test -s ./assets/models/cena_completa.glb \
    && test -s ./assets/draco/draco_decoder.js \
    && test -s ./assets/draco/draco_decoder.wasm \
    && test -s ./assets/draco/draco_wasm_wrapper.js

ENV PORT=8000
EXPOSE 8000

CMD ["python3", "api/server.py"]
