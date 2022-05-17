require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const db = require('./config/db');

db.authenticate()
  .then((result) => {
    console.log('Connection established.');
  })
  .catch((error) => {
    console.log('Unable to connect to db: ', error);
  });

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use('/api', router);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
