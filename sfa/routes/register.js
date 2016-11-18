var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Registo', breadcrumb: 'Registo' });
});

module.exports = router;
