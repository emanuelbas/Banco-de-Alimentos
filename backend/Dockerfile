FROM node:12
#directorio donde va a estar la app
RUN mkdir -p /usr/src/app/backend
WORKDIR /usr/src/app/backend
#instala librerias
COPY package.json /usr/src/app/backend
RUN npm install
#copia el proyecto
COPY . /usr/src/app/backend

#puerto a publicar
EXPOSE 3000

CMD [ "npm", "start" ]