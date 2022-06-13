const express = require('express');
const passport = require('passport');
const xsenv = require('@sap/xsenv');
const JWTStrategy = require('@sap/xssec').JWTStrategy;

const app = express();


const services = xsenv.getServices({ uaa:'nodeuaa' });

passport.use(new JWTStrategy(services.uaa));


app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false }));



app.get('/', function (req, res, next) {
  res.send('Application user: ' + req.user.id);
});

const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});