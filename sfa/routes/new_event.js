var express = require('express');
var authentication = require('./authentication-check');
var router = express.Router();

/* GET [?data=YYYY-MM-DD], [?clienteId=clientId]. */
router.get('/', authentication.checkAuth, function(req, res, next) {
  res.render('new-event', { title: 'Criar evento',
                            breadcrumb: 'Criar evento',
                            date: req.query.data ? req.query.data : "null",
                            customerId: req.query.clienteId ? req.query.clienteId : "null",
      user: req.cookies.user ? req.cookies.user.VendedorID : 'null'});
});

module.exports = router;
