var express = require('express');
var authentication = require('./authentication-check');
var router = express.Router();

/* GET. */
router.get('/', authentication.checkAuth, function(req, res, next) {
  res.render('products', {title: 'Produtos', breadcrumb: 'Produtos', user: req.cookies.user ? req.cookies.user.VendedorID : 'null'});
});

module.exports = router;
