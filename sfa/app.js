var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var agenda = require('./routes/agenda');
var costumers = require('./routes/costumers');
var costumer = require('./routes/costumer');
var event = require('./routes/event');
var products = require('./routes/products');
var product = require('./routes/product');
var new_costumer = require('./routes/new_costumer');
var new_event = require('./routes/new_event');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO review routing to cliente, produto
app.use('/', index);
app.use('/agenda', agenda);
app.use('/clientes', costumers);
app.use('/cliente', costumer);
app.use('/evento', event);
app.use('/produtos', products);
app.use('/produto', product);
app.use('/novo_cliente', new_costumer);
app.use('/novo_evento', new_event);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
