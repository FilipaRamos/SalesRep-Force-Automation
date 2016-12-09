var express = require('express');
var router = express.Router();

/* GET. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Sales Force Automation', breadcrumb: 'Autenticação' });
});

router.post('/', function(req, res, next) {
  if(req.body.login) {
    res.cookie('user', req.body.user, {expire: new Date() + 1000 * 60 * 30});
  }else if(req.body.logout) {
    res.clearCookie('user');
  }

  res.send({status: 'success'});
});

module.exports = router;
