require('express-async-errors');
const express = require('express');
// const { validateToken } = require('./middlewares/auth.middleware');
const { errorCodes } = require('./utils/errorCodes');

// ...
const app = express();
app.use(express.json());

const { loginRoutes, userRoutes, postRoutes, categoriesRoutes } = require('./routers');

app.use('/login', loginRoutes);
app.use('/user', userRoutes);
// app.use(validateToken);
app.use('/post', postRoutes);
app.use('/categories', categoriesRoutes);

app.use(async (error, req, res, _next) => {
  const { type, message } = error;
  console.log('MIDDLEWARE DE ERRO', type, errorCodes[type], message, error);
  return res.status(errorCodes[type]).json({ message });
});

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
