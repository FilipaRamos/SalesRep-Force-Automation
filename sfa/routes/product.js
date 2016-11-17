var express = require('express');
var router = express.Router();

/* GET ?id=produtoId. */
router.get('/', function(req, res, next) {
  res.render('product', {title: 'Produto', breadcrumb: 'Produto', productId: req.query.id});
});

module.exports = router;
