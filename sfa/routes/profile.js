var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
  res.render('profile', {title: 'Perfil', breadcrumb: 'Perfil', id: req.query.id ? req.query.id : -1});
});

module.exports = router;
