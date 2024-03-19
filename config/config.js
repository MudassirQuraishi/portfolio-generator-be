const config = {
  development: {
    port: process.env.DEV_PORT || 3000,
    database: {
      url: process.env.MONGODB_DEV_URI,
    },
    api_url: process.env.API_BASE_URL_DEV,
    origin: process.env.DEV_FRONTEND_ORIGIN,
  },
  production: {
    port: process.env.PROD_PORT || 8080,
    database: {
      url: process.env.MONGODB_PROD_URI,
    },
    api_url: process.env.API_BASE_URL_PROD,
    origin: process.env.PROD_FRONTEND_ORIGIN,
  },
};

module.exports =
  process.env.NODE_ENV === 'production'
    ? config.production
    : config.development;
