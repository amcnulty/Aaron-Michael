const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../public/resume');
    },
    filename: (req, file, callback) => {
        callback(null, 'aaron_mcnulty_resume.pdf');
    }
})});

const auth = function(req, res, next) {
    console.log(req.headers);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      const err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
    
    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];
    if (user === process.env.USER && pass === process.env.PASSWORD) {
      return next(); // authorized
    }
    else {
      const err = new Error('You are not authenticated!')
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
}

router.get('/', auth,  (req, res, next) => {
    res.render('upload', {
        title: 'Aaron Michael | Resume Upload'
    });
});

router.post('/', auth, (req, res, next) => {
    upload.single('resume')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log('multer error', err);
            res.status(500).end(err.message);
        }
        else if (err) {
            console.log(err);
            res.status(500).end(err.message);
        }
        else {
            res.status(200).end();
        }
    });
});

module.exports = router;