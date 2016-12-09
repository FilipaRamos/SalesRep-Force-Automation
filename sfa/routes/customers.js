var express = require('express');
var authentication = require('./authentication-check');
var router = express.Router();

/* GET. */
router.get('/',  authentication.checkAuth, function(req, res, next) {
  res.render('customers', {title: 'Clientes', breadcrumb: 'Clientes', user: req.cookies.user ? req.cookies.user.VendedorID : 'null'});
});

module.exports = router;
