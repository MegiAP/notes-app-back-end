const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
        cors: {
            // origin: ['*'],
            isOriginMatch: (origin, callback) => {
              // Check if the origin is allowed
              const allowedOrigins = ['*']; // Replace with your allowed origin(s)
              const isAllowed = allowedOrigins.includes(origin);
              // Pass the result to the callback
              callback(null, isAllowed);
        },
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();