var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var profile = require('./routes/profile');
var agenda = require('./routes/agenda');
var customers = require('./routes/customers');
var costumer = require('./routes/customer');
var event = require('./routes/event');
var products = require('./routes/products');
var product = require('./routes/product');
var new_costumer = require('./routes/new_customer');
var new_event = require('./routes/new_event');
var new_order = require('./routes/new_order');
var order_page = require('./routes/order');
var oversight = require('./routes/oversight');

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

app.use('/', index);
app.use('/entrar', login);
app.use('/registar', register);
app.use('/eventos', agenda);
app.use('/evento', event);
app.use('/criar_evento', new_event);
app.use('/editar_evento', new_event);
app.use('/encomenda', order_page);
app.use('/clientes', customers);
app.use('/cliente', costumer);
app.use('/criar_cliente', new_costumer);
app.use('/nova_encomenda', new_order);
app.use('/produtos', products);
app.use('/produto', product);
app.use('/supervisao', oversight);
app.use('/perfil', profile);

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
