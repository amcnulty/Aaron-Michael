const express = require('express');
const router = express.Router();
const fs = require('fs');
// The original db file used for reseting the active one that is being used for requests.
const dbOriginal = require('../lib/db-original.json');
// Used as the db.json file used for requests.
let data;
// Last date the db.json file was reset.
let lastResetDate = new Date();
// 29 minute interval to check if it is a new day to reset the db.json file.
(() => {
    setInterval(() => {
        if ((new Date()).getDay() !== lastResetDate.getDay()) {
          // reset the db.json file
          lastResetDate = new Date();
          fs.writeFile('lib/db.json', JSON.stringify(dbOriginal, null, 2), (err) => {
            if (err) {
              console.log(err);
            }
            console.log('reseting db.json at: ' + lastResetDate);
            setDbFile();
          });
        }
    }, 1740000);
})();
// Reads the db.json file and loads it into the data variable.
const setDbFile = () => {
    fs.readFile('lib/db.json', (err, file) => {
        if (err) {
            console.log('error reading db.json file while attempting to reset it.');
            console.log(err);
        }
        data = JSON.parse(file);
    });
}
// Initial call to load the contents of the db.json file into the data variable.
setDbFile();

router.get('/campsites', (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify(data.campsites));
});

router.get('/partners', (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify(data.partners));
});

router.get('/comments', (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify(data.comments));
});

router.get('/promotions', (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify(data.promotions));
});

router.get('/feedback', (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify(data.feedback));
});

router.post('/comments', (req, res) => {
    if (req.body) {
        let missingFields = [];
        let missingFieldsMessage = 'The following fields are missing from the request body: ';
        if (!req.body.rating) {
            missingFields.push('rating');
        }
        if (!req.body.campsiteId) {
            missingFields.push('campsiteId');
        }
        if (!req.body.text) {
            missingFields.push('text');
        }
        if (!req.body.author) {
            missingFields.push('author');
        }
        if (!req.body.date) {
            missingFields.push('date');
        }
        if (missingFields.length > 0) {
            res.statusCode = 206;
            missingFieldsMessage += missingFields.join(', ');
            missingFieldsMessage += '.';
            fs.writeFile('lib/db.json', updateJson('comments', req.body), (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(err.message);
                    return;
                }
                else {
                    console.log('Writing to db.json comments array.');
                }
            })
            res.end(missingFieldsMessage);
        }
        else {
            res.statusCode = 200;
            fs.writeFile('lib/db.json', updateJson('comments', req.body), (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(err.message);
                    return;
                }
                else {
                    console.log('Writing to db.json comments array.');
                }
            })
            res.end('Comment successfully added.');
        }
    }
    else {
        res.statusCode = 204;
        res.end('No request body provided to post method! Please add a body to your request.');
    }
});

router.post('/feedback', (req, res) => {
    if (req.body) {
        let missingFields = [];
        let missingFieldsMessage = 'The following fields are missing from the request body: ';
        if (!req.body.firstname) {
            missingFields.push('firstname');
        }
        if (!req.body.lastname) {
            missingFields.push('lastname');
        }
        if (!req.body.telnum) {
            missingFields.push('telnum');
        }
        if (!req.body.email) {
            missingFields.push('email');
        }
        if (!req.body.agree) {
            missingFields.push('agree');
        }
        if (!req.body.contactType) {
            missingFields.push('contactType');
        }
        if (!req.body.message) {
            missingFields.push('message');
        }
        if (!req.body.date) {
            missingFields.push('date');
        }
        if (missingFields.length > 0) {
            res.statusCode = 206;
            missingFieldsMessage += missingFields.join(', ');
            missingFieldsMessage += '.';
            fs.writeFile('lib/db.json', updateJson('feedback', req.body), (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(err.message);
                    return;
                }
                else {
                    console.log('Writing to db.json feedback array.');
                }
            })
            res.end(missingFieldsMessage);
        }
        else {
            res.statusCode = 200;
            fs.writeFile('lib/db.json', updateJson('feedback', req.body), (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(err.message);
                    return;
                }
                else {
                    console.log('Writing to db.json feedback array.');
                }
            })
            res.end('Feedback successfully added.');
        }
    }
    else {
        res.statusCode = 204;
        res.end('No request body provided to post method! Please add a body to your request.');
    }
});

const updateJson = (field, valueToAdd) => {
    valueToAdd.id = data[field].length;
    data[field].push(valueToAdd);
    return JSON.stringify(data, null, 2);
}

module.exports = router;
