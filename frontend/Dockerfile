### STAGE 1: Build ###
FROM node:13.3.0 AS build
RUN mkdir -p /usr/src/app/frontend
WORKDIR /usr/src/app/frontend
COPY package.json /usr/src/app/frontend
RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
COPY . /usr/src/app/frontend
RUN ng build --prod
EXPOSE 4200

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/frontend/dist/todolist /usr/share/nginx/html