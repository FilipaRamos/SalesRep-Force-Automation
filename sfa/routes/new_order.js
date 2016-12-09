var express = require('express');
var authentication = require('./authentication-check');
var router = express.Router();

/* GET. */
router.get('/', authentication.checkAuth, function(req, res, next) {
    res.render('new-order', { title: 'Nova Encomenda',
        breadcrumb: 'Nova Encomenda',
        customerId: req.query.clienteId? req.query.clienteId : 'null',
        opportunityId: req.query.oportunidadeId? req.query.oportunidadeId : 'null',
        user: req.cookies.user ? req.cookies.user.VendedorID : 'null'});
});

module.exports = router;
