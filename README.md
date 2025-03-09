# 🚀 BigFive

## 📌 Descripción

Bienvenido al proyecto **BigFive**. Esta aplicación web integra un chatbot emocional con un diario personal, permitiendo analizar la personalidad del usuario y ofrecer recomendaciones personalizadas basadas en sus entradas y conversaciones.

## 🛠 Tecnologías

- **Frontend:** React, Vite y TailwindCSS
- **Backend:** FastAPI

- **Base de Datos Vectorial:** Weaviate
- **Base de Datos:** MongoDB
- **Modelo de Análisis Emocional:** `SamLowe/roberta-base-go_emotions`
- **Chatbot:** Deepseek R1 1776

## 📂 Instalación y Uso

### Requisitos Previos

- Docker
- Docker Compose

### Pasos para la Instalación

1. Clona el repositorio en tu máquina local:
   ```bash

   git clone https://github.com/pablolobat0/bigFive.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd bigFive
   ```
3. Crea un fichero .env en el directorio raíz con la variable de entorno: DATABASE_NAME
4. Crea un fichero .env en el directorio backedn con las variables de entorno: MONGODB_URI, DATABASE_NAME, PERPLEXITY_API_KEY, SECRET_KEY, REDIS_HOST, REDIS_PORT
5. Inicia los servicios con Docker Compose:
   ```bash
   docker compose up
   ```
6. Accede a la aplicación:
   Una vez que los servicios estén en funcionamiento, abre tu navegador y dirígete a http://localhost:3000 para interactuar con la aplicación.
   ## 🤖 Funcionamiento del Chatbot

El chatbot emplea el modelo `SamLowe/roberta-base-go_emotions` para analizar el tono emocional de los mensajes y utiliza Weaviate para gestionar y recuperar información basada en embeddings vectoriales, permitiendo respuestas más contextuales y personalizadas.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar con el proyecto, por favor revisa el archivo `CONTRIBUTING.md` para obtener directrices sobre cómo hacerlo.

## 🔒 Seguridad

Para reportar vulnerabilidades o problemas de seguridad, abre un *issue* en el repositorio o contacta directamente a los mantenedores del proyecto.

## 📄 Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT. Para más detalles, revisa el archivo `LICENSE.md`.

## 📞 Contacto

Para preguntas o sugerencias, puedes abrir un *issue* en el repositorio o contactar directamente a los mantenedores del proyecto.
