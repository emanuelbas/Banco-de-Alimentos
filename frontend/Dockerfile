### Buildear proyecto ###
FROM node:14.8.0-alpine3.10 AS build
RUN mkdir -p /usr/src/app/frontend
WORKDIR /usr/src/app/frontend
COPY package.json package-lock.json /usr/src/app/frontend/
RUN npm i
COPY . /usr/src/app/frontend/
RUN npm run-script build --prod

### Correrlo ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/frontend/dist/todolist /usr/share/nginx/html

### Buildear angular manualmente ###
# Debe correr ng build --prod
#FROM nginx:1.17.1-alpine
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY /dist/todolist /usr/share/nginx/html