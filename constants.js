var localDatabaseCredentials = require("./localDatabaseCredentials");

module.exports = Object.freeze({
    DATABASE_HOST: process.env.DATABASE_HOST || localDatabaseCredentials.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT || localDatabaseCredentials.DATABASE_PORT,
    DATABASE_USER_NAME: process.env.DATABASE_USER_NAME || localDatabaseCredentials.DATABASE_USER_NAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || localDatabaseCredentials.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME || localDatabaseCredentials.DATABASE_NAME
});