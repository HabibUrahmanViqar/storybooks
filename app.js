const express = require('express');
const hbs = require('express-handlebars')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// Load User Model
require('./models/User');

// Passport Config
require('./config/passport')(passport);

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');

// Load Keys
const keys = require('./config/keys')

// Map Global promise  // This is for cleanning warning and in my computer it does not need
mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

const app = express();

// Handlebar Middleware
app.engine('hbs', hbs.engine({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main',
}));

app.set('view engine', 'hbs');


app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

// Use Routes
app.use('/', index);
app.use('/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});