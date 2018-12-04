const defaultHost = 'http://localhost:' + (process.env.API || 3000);

module.exports = {
  host: process.env.HOST || defaultHost,
  port: process.env.PORT || 3000,
  api: process.env.API || defaultHost,
  mongodb: {
    host: process.env.MONGODB_HOST || 'localhost',
    port: process.env.MONGODB_PORT || '27017',
    database: process.env.MONGODB_NAME || 'notsanta',
  },
};
