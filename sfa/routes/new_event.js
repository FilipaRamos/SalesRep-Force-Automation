var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
  res.render('new_event', {'title': 'Novo evento', breadcrum: 'Novo evento'});
});

module.exports = router;
