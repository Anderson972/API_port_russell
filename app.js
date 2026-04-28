const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');

const mongodb = require('./db/mangoDb')
const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const catwaysRouter = require('./src/routes/catways')

mongodb.initClientDbConnection();

const app = express();



app.use(cors({
    exposedHeaders : ['Authorization'],
    origin : '*'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret            : process.env.SECRET_KEY,
    resave            : false,
    saveUninitialized : false,
    cookie            : { 
        secure  : false,
        maxAge  : 24 * 60 * 60 * 1000
    }
}));

app.use('/', usersRouter);
app.use('/', catwaysRouter);
app.use('/', indexRouter);


app.use(function(err, req, res, next) {
    res.status(404).json({name: "API", version: "1.0", status: 404, message : "not_found"})
});

module.exports = app;