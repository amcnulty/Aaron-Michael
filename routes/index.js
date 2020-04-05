const express = require('express');
const router = express.Router();
const projects = require('../lib/projects');
const nodemailerHelper = require('../nodemailer/nodemailerHelper');
const request = require('request');

/**
 * Set interval of 29 minutes to keep this Heroku Dyno active.
 * On page load ping all of the Heroku hosted sites in projects.json.
 */
(() => {
  setInterval(() => {
    request('https://aaronmichael.herokuapp.com/', (error, response, body) => {
      console.log('Made request to https://aaronmichael.herokuapp.com/ at: ' + new Date());
    });
  }, 1740000);
  projects.forEach(project => {
    if (project.pingOnLoad) {
      request(project.url, (error, response, body) => {
        console.log('Made request to ' + project.url + ' at: ' + new Date());
      });
    }
  });
})();

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
    }
    else {
      return res.status(200).end();
    }
  });
});

module.exports = router;
