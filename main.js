// Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
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
        saveUninitialized:false,
        resave:false,
    }),
  );
app.get("/" ,(req ,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message;
    next();
});
app.use(express.static("upload"));
//set template engine
app.set('view engine', 'ejs');
//route prefix
app.use("", require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
