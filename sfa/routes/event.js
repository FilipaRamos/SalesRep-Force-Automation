var express = require('express');
var authentication = require('./authentication-check');
var router = express.Router();

/* GET ?id=eventoId. */
router.get('/', authentication.checkAuth, function(req, res, next) {
    res.render('event', {title: 'Evento', breadcrumb: 'Evento', id: req.query.id, user: req.cookies.user ? req.cookies.user.VendedorID : 'null'});
});

module.exports = router;
