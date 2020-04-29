module.exports = {
  apps: [{
    name: 'pet-store',
    script: './index.js',
    env: {
      NODE_ENV: 'development',
      CONFIGURATIONS_PATH: 'dev',
      SERVER_PORT: 3050,
      DATABASE_NAME: 'pet_store',
      DATABASE_USER_NAME: 'root',
      DATABASE_PASSWORD: 'root',
      DATABASE_HOST: '127.0.0.1',
      DATABASE_PORT: 2001,
      JWT_SECRET: "secret",
      LOGS: "dev"
    }
  }]
};