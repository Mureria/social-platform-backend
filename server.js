const express = require ('express')
const mongoose = require ('mongoose')

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://chosenireri42:Mureria42@social-platforms.s4sc6cs.mongodb.net/?retryWrites=true&w=majority', {
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