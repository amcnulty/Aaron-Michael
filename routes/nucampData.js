const express = require('express');
const router = express.Router();
const fs = require('fs');

const data = require('../lib/db.json');

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
