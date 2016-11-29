var express = require('express');
var router = express.Router();

/* GET [?data=MM/DD/YYYY], [?clienteId=clientId]. */
router.get('/', function(req, res, next) {
  res.render('new-event', { title: 'Criar evento',
                            breadcrumb: 'Criar evento',
                            date: req.query.data ? req.query.data : "null",
                            customerId: req.query.clienteId ? req.query.clienteId : "null"
  });
});

module.exports = router;
