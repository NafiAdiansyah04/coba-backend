const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const ArticleRoutes = require('./routes/articleRoutes');
const EventRoutes = require('./routes/eventRoutes');

mongoose.set('strictQuery', true); // Atur strictQuery sesuai peringatan

const createServer = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3030,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Tambahkan rute untuk root
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello, world!';
    },
  });

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb+srv://nafiadiansyah24:6dOemfKxwgtirMbs@cluster1.3rmyszq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', () => {
    console.log('Connection with database succeeded.');
  });

  server.route(ArticleRoutes);
  server.route(EventRoutes);

  return server;
};

module.exports = async (req, res) => {
  const server = await createServer();
  await server.start();
  console.log(`Server running at ${server.info.uri}`);
  res.status(200).send('Server is running');
};
