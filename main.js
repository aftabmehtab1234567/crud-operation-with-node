// Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
<<<<<<< HEAD
=======

>>>>>>> 9ccf282 (hi)
const app = express();
const PORT = process.env.PORT || 5000; // Using the PORT variable from the .env file
const dbURI = process.env.Db_URI; // Using the Db_URI variable from the .env file

// Database connection
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected successfully'));
//middle ware
 app.use(express.urlencoded({extended:false}));
  app.use(express.json());  
  app.use(session({
        secret:"my secret key",
<<<<<<< HEAD
        saveUninitialized:true,
        resave:false,
    }),
  );
=======
        saveUninitialized:false,
        resave:false,
    }),
  );
 
>>>>>>> 9ccf282 (hi)
app.get("/" ,(req ,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message;
    
    next();
});

<<<<<<< HEAD
=======

>>>>>>> 9ccf282 (hi)
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
