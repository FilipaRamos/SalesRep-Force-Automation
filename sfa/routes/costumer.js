var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
  res.render('costumer', {title: 'Cliente', breadcrum: 'Cliente'});
});

module.exports = router;
