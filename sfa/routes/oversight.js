var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
  res.render('oversight', {'title': 'Supervisão', breadcrumb: 'Supervisão'});
});

module.exports = router;
