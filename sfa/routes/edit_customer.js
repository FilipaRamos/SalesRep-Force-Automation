var express = require('express');
var authentication = require('./authentication-check');
var router = express.Router();

/* GET [?id=eventId]. */
router.get('/',  authentication.checkAuth, function(req, res, next) {
  res.render('edit-customer', { title: 'Editar cliente',
                            breadcrumb: 'Editar cliente',
                            id: req.query.id
      , user: req.cookies.user ? req.cookies.user.VendedorID : 'null'});
});

module.exports = router;
