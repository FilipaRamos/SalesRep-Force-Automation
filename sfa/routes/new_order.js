var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
    res.render('new-order', { title: 'Nova Encomenda',
        breadcrumb: 'Nova Encomenda',
        customerId: req.query.clienteId? req.query.clienteId : 'null',
        opportunityId: req.query.oportunidadeId? req.query.oportunidadeId : 'null',
    });
});

module.exports = router;
