var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
  res.render('products', {title: 'Produtos', breadcrumb: 'Produtos'});
});

module.exports = router;
