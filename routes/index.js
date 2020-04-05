const express = require('express');
const router = express.Router();
const projects = require('../lib/projects');
const nodemailerHelper = require('../nodemailer/nodemailerHelper');
const request = require('request');

const startDate = new Date();
/**
 * Set interval of 29 minutes to keep this Heroku Dyno active.
 * On page load ping all of the Heroku hosted sites in projects.json.
 */
(() => {
  setInterval(() => {
    request('https://aaronmichael.herokuapp.com/ping', (error, response, body) => {
      console.log(`Made request to https://aaronmichael.herokuapp.com/ping at: ${new Date()}
      The Response is: ${response}`);
    });
  }, 10000);
})();

/* GET home page. */
router.get('/', function(req, res, next) {
    projects.forEach(project => {
      if (project.pingOnLoad) {
        request(project.url, (error, response, body) => {
          console.log('Made request to ' + project.url + ' at: ' + new Date());
        });
      }
    });
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

router.get('/ping', (req, res) => {
  console.log('inside ping route');
  res.status(200).send(`The app has been awake since: ${startDate}`);
});

module.exports = router;
