var express = require('express');
var authentication = require('./authentication-check');
var router = express.Router();

/* GET ?id=produtoId. */
router.get('/', authentication.checkAuth, function(req, res, next) {
  res.render('product', {title: 'Produto', breadcrumb: 'Produto', productId: req.query.id, user: req.cookies.user ? req.cookies.user.VendedorID : 'null'});
});

module.exports = router;
