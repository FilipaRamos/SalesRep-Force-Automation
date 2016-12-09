var express = require('express');
var authentication = require('./authentication-check');
var router = express.Router();

/* GET ?id=clienteID. */
router.get('/', authentication.checkAuth, function(req, res, next) {
  res.render('customer', {title: 'Cliente', breadcrumb: 'Cliente', customerId: req.query.id, user: req.cookies.user ? req.cookies.user.VendedorID : 'null'});
});

module.exports = router;
