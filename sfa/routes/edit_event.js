var express = require('express');
var router = express.Router();

/* GET [?id=eventId]. */
router.get('/', function(req, res, next) {
  res.render('edit-event', { title: 'Editar evento',
                            breadcrumb: 'Editar evento',
                            id: req.query.id
                          });
});

module.exports = router;
