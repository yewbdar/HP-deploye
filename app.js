/** require dependencies */
const express = require("express");
const routes = require('./routes/');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var session = require('express-session');

const app = express();
const router = express.Router();
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/hp";
// const url = process.env.MONGODB_URI || "mongodb://Yewbdar:1Hulet3@ds237641.mlab.com:37641/hp";



/** connect to MongoDB datastore */
// mongoose.connect(url)
try {
    mongoose.connect(url, {
        //useMongoClient: true
    })    
} catch (error) {
    
}

let port = 5000 || process.env.PORT;

/** set up routes {API Endpoints} */
routes(router);

/** set up middlewares */
app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(helmet());
//app.use('/static',express.static(path.join(__dirname,'static')))
/**
 * Login and session
 */
var sessionStore = new session.MemoryStore();

app.use(session({
    secret: 'new session key',
    store: sessionStore,
    resave: true,
    proxy: undefined,
    saveUninitialized: false,
    cookie: {
                maxAge: Date.now() + (30 * 86400 * 1000),
                secure: false,
                httpOnly: false
            }
}));

app.use('/hp-api', router);

/** start server */
app.listen(port, () => {
    console.log(`HP-Server started at port: ${port} Lets get the party going`);
});