var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aaron Michael | A Personal Website For Aaron Michael McNulty' });
});

module.exports = router;
