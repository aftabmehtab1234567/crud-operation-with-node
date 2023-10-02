// Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 5000;
const dbURI = process.env.Db_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected successfully'));

// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  
  })
);

  
  app.get('/', (req, res) => {
    // Access the session
    if (req.session.views) {
      req.session.views++;
    } else {
      req.session.views = 1;
    }
    res.send(`Views: ${req.session.views}`);
  });

app.use(express.static("upload"));
//set template engine
app.set('view engine', 'ejs');
//route prefix
app.use("", require('./routes/routes'));
app.get('/login', (req, res) => {
    res.render('login', { title: 'Add user' });
  });
 
  
  //admin
  app.get('/admin', (req, res) => {
    res.render('admin', { title: 'Add user' });
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
