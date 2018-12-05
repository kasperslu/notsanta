module.exports = {
  port: process.env.PORT || 3000,
  mongodb: {
    host: process.env.MONGODB_HOST || 'localhost',
    port: process.env.MONGODB_PORT || '27017',
    database: process.env.MONGODB_NAME || 'notsanta',
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    authSource: process.env.MONGODB_AUTH_SOURCE,
  },
};
