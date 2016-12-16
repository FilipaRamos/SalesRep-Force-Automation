var express = require('express');
var authentication = require('./authentication-check');
var router = express.Router();

/* GET. */
router.get('/', authentication.checkAuth, function(req, res, next) {
  res.render('profile', {title: 'Perfil', breadcrumb: 'Perfil', id: req.query.id ? req.query.id : -1, user: req.cookies.user ? req.cookies.user.VendedorID : 'null'});
});

module.exports = router;
