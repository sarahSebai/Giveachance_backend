
require('dotenv').config();
require('./models/connection')
var express = require('express')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var onbordingRouter = require('./routes/Onbording');
var usersRouter = require('./routes/users');
const AuthRouter= require('./routes/authentification')
const recruteurRouter= require('./routes/Recruteur')
const profilRouter= require('./routes/Profils')

var app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/update', onbordingRouter);
app.use('/users', usersRouter);
app.use('/create', AuthRouter);
app.use('/recruteur', recruteurRouter);
app.use('/profil', profilRouter);

module.exports = app;