var express = require('express');
var authentication = require('./authentication-check');
var router = express.Router();

/* GET. */
router.get('/', authentication.checkAuth, function(req, res, next) {
    res.render('index', { title: 'Sales Force Automation', breadcrumb: 'Início', user: req.cookies.user ? req.cookies.user.VendedorID : 'null'});
});

module.exports = router;
