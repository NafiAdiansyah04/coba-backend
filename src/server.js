const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const ArticleRoutes = require('./routes/articleRoutes');
const EventRoutes = require('./routes/eventRoutes');
 
const init = async () => {
  const server = Hapi.server({
    port: 3030,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  mongoose.connect('mongodb+srv://nafiadiansyah04:B5uOqsm9K8isxesc@cluster0.1h0rj5s.mongodb.net/?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
  });

  const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('Connection with database succeeded.');
  });

  server.route(ArticleRoutes);
  server.route(EventRoutes);
 
  await server.start();
  console.log(`Server running in ${server.info.uri}`);
};
 
init();
