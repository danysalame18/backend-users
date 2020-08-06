require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV || 'staging'

dbData = {
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
};
const config = {
  // Servidor en produccion
  production:{
    db_url: `mongodb+srv://${dbData.dbUser}:${dbData.dbPassword}@${dbData.dbHost}/${dbData.dbName}?retryWrites=true&w=majority`,
  },
  // Probando local
  staging:{
    db_url: `mongodb+srv://${dbData.dbUser}:${dbData.dbPassword}@${dbData.dbHost}/${dbData.dbName}?retryWrite=true&w=majority`,
  },
  // Entorno igual a produccion con datos prueba
  test:{
    db_url: `mongodb+srv://${dbData.dbUser}:${dbData.dbPassword}@${dbData.dbHost}/${dbData.dbName}?retryWrites=true&w=majority`,
  },
};

module.exports = config[NODE_ENV] ;
