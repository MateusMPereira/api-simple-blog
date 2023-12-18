const express = require('express');
const mongoose = require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const artigosRoutes = require('./routes/artigosRoutes');

const app = express();

mongoose.connect('mongodb+srv://owner:QHJCpoM4l3z7b2Tc@blog360.v1oqwf5.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB!');
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API-SIMPLE-BLOG',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/v1/artigos', artigosRoutes);

module.exports = app;
