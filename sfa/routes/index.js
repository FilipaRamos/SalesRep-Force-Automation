var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sales Force Automation', breadcrumb: 'Início' });
});

module.exports = router;
