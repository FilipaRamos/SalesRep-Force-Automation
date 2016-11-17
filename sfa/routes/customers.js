var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
  res.render('customers', {title: 'Clientes', breadcrumb: 'Clientes'});
});

module.exports = router;
