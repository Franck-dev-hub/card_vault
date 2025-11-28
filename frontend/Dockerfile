FROM node:18-alpine
WORKDIR /app
RUN apt-get update
RUN apt-get install -y --no-install-recommends build-essential gcc
RUN rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
