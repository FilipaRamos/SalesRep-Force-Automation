var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
  res.render('products', {title: 'Produtos', breadcrum: 'Produtos'});
});

module.exports = router;
