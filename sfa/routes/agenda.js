var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
  res.render('agenda', {'title': 'Agenda', breadcrumb: 'Agenda'});
});

module.exports = router;
