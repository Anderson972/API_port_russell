const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');

const mongodb = require('./db/mangoDb')
const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const catwaysRouter = require('./src/routes/catways');
const reservationsRouter = require('./src/routes/reservations');

const swaggerUi   = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
    definition: {
        openapi : '3.0.0',
        info    : {
            title       : 'API Port Russell',
            version     : '1.0.0',
            description : 'API de gestion des catways et réservations'
        },
        servers: [
            { url: 'http://localhost:3000' }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type   : 'http',
                    scheme : 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};


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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

/* const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)) */


try {
    const swaggerDocs = swaggerJsDoc(swaggerOptions)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
} catch (error) {
    console.error('Erreur Swagger :', error.message)
}

app.use('/', (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

app.use('/', indexRouter);


app.use(function(err, req, res, next) {
    res.status(404).json({name: "API", version: "1.0", status: 404, message : "not_found"})
});

module.exports = app;