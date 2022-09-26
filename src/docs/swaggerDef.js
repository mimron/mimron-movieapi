const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Movie API documentation',
    version,
  },
  servers: [
    {
      url: `http://${config.swaggerHost}:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
