const express = require('express');
const router = express.Router();
const projects = require('../lib/projects');
const nodemailerHelper = require('../nodemailer/nodemailerHelper');
const request = require('request');
const fs = require('fs');

const dbOriginal = require('../lib/db-original.json');

const startDate = new Date();
let lastResetDate = new Date();
/**
 * Set interval of 29 minutes to keep this Heroku Dyno active.
 */
(() => {
  setInterval(() => {
    request('https://aaronmichael.herokuapp.com/ping', (error, response, body) => {
      console.log(`Made request to https://aaronmichael.herokuapp.com/ping at: ${new Date()}
      The Response is: ${body}`);
    });
    if ((new Date()).getDay() !== lastResetDate.getDay()) {
      // reset the db.json file
      lastResetDate = new Date();
      fs.writeFile('lib/db.json', JSON.stringify(dbOriginal, null, 2), (err) => {
        if (err) {
          console.log(err);
        }
        console.log('reseting db.json at: ' + lastResetDate);
      });
    }
  }, 1740000);
})();

/**
 * Get home page. 
 * On page load ping all of the Heroku hosted sites in projects.json.
 */
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

/**
 * Route for sending email from contact me form.
 */
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

/**
 * Endpoint used to ping the server to keep the app awake.
 */
router.get('/ping', (req, res) => {
  res.status(200).send(`The app has been awake since: ${startDate}`);
});

module.exports = router;
