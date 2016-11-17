var express = require('express');
var router = express.Router();

/* GET ?id=eventoId. */
router.get('/', function(req, res, next) {
    res.render('event', {title: 'Evento', breadcrumb: 'Evento', eventId: req.query.id});
});

module.exports = router;
