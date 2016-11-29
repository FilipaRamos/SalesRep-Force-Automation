var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Sales Force Automation', breadcrumb: 'Autenticação' });
});

module.exports = router;
