var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
  res.render('new_costumer', {'title': 'Novo cliente', breadcrum: 'Novo cliente'});
});

module.exports = router;