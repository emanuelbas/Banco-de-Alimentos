Para usar la datasource del container de mongo reemplazar las credenciales 
/server/datasources.json por

  "mongo": {
    "host": "dockerDB",
    "port": 27017,
    "connector": "mongodb"
  }

Tambien hay un problema con el lbservices y el datasources

En el datasources.json figura esto:
  "dataStorage": {
    "name": "dataStorage",
    "connector": "loopback-component-storage",
    "provider": "filesystem",
    "root": "./store"
  }

Para generar los archivos de angular hay que cambiar el root por "."
Quedaria asi:
  "dataStorage": {
    "name": "dataStorage",
    "connector": "loopback-component-storage",
    "provider": "filesystem",
    "root": "."
  }


Entonces se puede usar el plugin y despues hay que devolverlo a "./store" para que funcione correctamente