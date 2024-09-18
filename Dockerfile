FROM node:20.16-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:dev

