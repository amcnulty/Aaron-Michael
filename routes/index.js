const express = require('express');
const router = express.Router();
const projects = require('../lib/projects');
const nodemailerHelper = require('../nodemailer/nodemailerHelper');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Aaron Michael | A Personal Website For Aaron Michael McNulty',
    projects: projects
  });
});

router.post('/send-message', function(req, res, next) {
  nodemailerHelper.sendMessage(req.body, function(err, emailResponse) {
    if (err) {
      throw err;
      return res.status(500).end();
      console.log("There has been an error!");
    }
    else {
      console.log("Success!");
      return res.status(200).end();
    }
  });
});

module.exports = router;
