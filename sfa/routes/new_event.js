var express = require('express');
var router = express.Router();

/* GET [?data=MM/DD/YYYY], [?clienteId=clientId]. */
router.get('/', function(req, res, next) {
  res.render('new-event', { title: 'Novo evento',
                            breadcrumb: 'Novo evento',
                            date: req.query.data ? req.query.data : "''",
                            customerId: req.query.clienteId ? req.query.clienteId : " "
                          });
});

module.exports = router;
