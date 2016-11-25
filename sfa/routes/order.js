var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
    res.render('order', { title: 'Encomenda',
        breadcrumb: 'Encomenda',
        id: req.query.id
    });
});

module.exports = router;
