require('dotenv').config()
module.exports = {
  configtest: {
    server: process.env.IP_SQLPROD,
    authentication: {
      type: process.env.TYPE,
      options: {
        userName: process.env.SQL_USERNAME,
        password: process.env.SQL_PASSWORDPROD
      }
    },
    driver: process.env.DRIVER,
    options: {
      instanceName: process.env.INSTANCE,
      database: process.env.DATABASE,
      rowCollectionOnDone: true,
      rowCollectionOnRequestCompletion: true,
      connectTimeout: 180000,
      requestTimeout: 180000,
      trustServerCertificate: true
    }
  },
  configPeru: {
    server: process.env.IP_SQLPROD,
    authentication: {
      type: process.env.TYPE,
      options: {
        userName: process.env.SQL_USERNAME,
        password: process.env.SQL_PASSWORDPROD
      }
    },
    driver: process.env.DRIVER,
    options: {
      instanceName: process.env.INSTANCE,
      database: process.env.DATABASEPERU,
      rowCollectionOnDone: true,
      rowCollectionOnRequestCompletion: true,
      connectTimeout: 180000,
      requestTimeout: 180000,
      trustServerCertificate: true
    }
  },
  configNic: {
    server: process.env.IP_SQLPROD,
    authentication: {
      type: process.env.TYPE,
      options: {
        userName: process.env.SQL_USERNAME,
        password: process.env.SQL_PASSWORDPROD
      }
    },
    driver: process.env.DRIVER,
    options: {
      instanceName: process.env.INSTANCE,
      database: process.env.DATABASENICARAGUA,
      rowCollectionOnDone: true,
      rowCollectionOnRequestCompletion: true,
      connectTimeout: 180000,
      requestTimeout: 180000,
      trustServerCertificate: true
    }
  },
  configGuy: {
    server: process.env.IP_SQL,
    authentication: {
      type: process.env.TYPE,
      options: {
        userName: process.env.SQL_USERNAME,
        password: process.env.SQL_PASSWORD
      }
    },
    driver: process.env.DRIVER,
    options: {
      instanceName: process.env.INSTANCE,
      database: process.env.DATABASEGUAYANA,
      rowCollectionOnDone: true,
      rowCollectionOnRequestCompletion: true,
      connectTimeout: 180000,
      requestTimeout: 180000,
      trustServerCertificate: true
    }
  },
  PORT: process.env.PORT || process.env.APP_PORT,
  valor: { secret: process.env.SECRET },
  ENV: process.env.ENV,
  headersl: {
    [process.env.CTTYPE]: process.env.CTVALUE,
    [process.env.ACLO]: process.env.ACLOV
  },
  headers: {
    [process.env.CTTYPE]: process.env.CTVALUE,
    [process.env.ACLO]: process.env.ACLOV
  },
  apiKey: process.env.API_KEY,
  encriptionKey: process.env.ENCRIPTION_KEY
}
