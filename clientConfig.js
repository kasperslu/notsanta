const defaultHost = 'http://localhost:' + (process.env.PORT || 3000);

module.exports = {
  host: process.env.HOST || defaultHost,
  api: process.env.API || defaultHost,
  gtm: process.env.GTM,
};
