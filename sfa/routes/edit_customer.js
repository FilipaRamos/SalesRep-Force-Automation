var express = require('express');
var router = express.Router();

/* GET [?id=eventId]. */
router.get('/', function(req, res, next) {
  res.render('edit-customer', { title: 'Editar cliente',
                            breadcrumb: 'Editar cliente',
                            id: req.query.id
                          });
});

module.exports = router;
