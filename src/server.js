const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const ArticleRoutes = require('./routes/articleRoutes');
const EventRoutes = require('./routes/eventRoutes');

const init = async () => {
  const server = Hapi.server({
    port: 3030,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  mongoose.connect('mongodb+srv://nafiadiansyah24:6dOemfKxwgtirMbs@cluster1.3rmyszq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', { 
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
