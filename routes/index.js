var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.writeHead(200, {
  //   'Cache-Control': 'no-cache',
  //   'Cache-Control': 'must-revalidate',
  //   'Cache-Control': 'no-store'
  // });
  // res.setHeader('Cache-Control', 'no-cache');
  // res.setHeader('Cache-Control', 'must-revalidate');
  // res.setHeader('Cache-Control', 'no-store');
  res.render('index', { title: 'Aaron Michael | A Personal Website For Aaron Michael McNulty' });
});

module.exports = router;
