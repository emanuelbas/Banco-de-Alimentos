Para usar la datasource del container de mongo reemplazar las credenciales 
/server/datasources.json por

  "mongo": {
    "host": "dockerDB",
    "port": 27017,
    "connector": "mongodb"
  }