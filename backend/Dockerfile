FROM node:12
#directorio donde va a estar la app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
#instala librerias
COPY package.json /usr/src/app/
RUN npm install
#copia el proyecto
COPY . /usr/src/app

#puerto a publicar
EXPOSE 3000

CMD [ "npm", "start" ]