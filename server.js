require('dotenv').config();

const dbUrl = process.env.DB_URL;

const myName = 'myName'

const express = require ('express')
const mongoose = require ('mongoose')

const app = express();
const PORT = 3000;

mongoose.connect( dbUrl, {
    useNewUrlParser : true,
    useUnifiedTopology :true, 


});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to the db');
  });

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);

  });