var express = require('express');
var router = express.Router();

/* GET [?id=eventId]. */
router.get('/', function(req, res, next) {
  res.render('edit-order', { title: 'Editar encomenda',
                            breadcrumb: 'Editar encomenda',
                            id: req.query.id
                          });
});

module.exports = router;
