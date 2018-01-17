var express = require('express');
var router = express.Router();
const projects = require('../lib/projects');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Aaron Michael | A Personal Website For Aaron Michael McNulty',
    projects: projects
  });
});

module.exports = router;
