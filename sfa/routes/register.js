var express = require('express');
var authentication = require('./authentication-check');
var router = express.Router();

/* GET. */
router.get('/',  authentication.checkSuperAuth, function(req, res, next) {
  res.render('register', { title: 'Registo', breadcrumb: 'Registo', user: req.cookies.user ? req.cookies.user.VendedorID : 'null'});
});

module.exports = router;
