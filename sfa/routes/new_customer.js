var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
  res.render('new-customer', {'title': 'Novo cliente', breadcrumb: 'Novo cliente'});
});

module.exports = router;
