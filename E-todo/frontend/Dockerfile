
FROM node:18-alpine AS build

WORKDIR /app

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 80

