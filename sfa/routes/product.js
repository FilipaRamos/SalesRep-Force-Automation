var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
  res.render('product', {title: 'Produto', breadcrum: 'Produto'});
});

module.exports = router;