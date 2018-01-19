const nodemailer = require('nodemailer');
let mailOptions = {};

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
  }
});

const sendMessage = function(data, cb) {
  setMailOptions(data.senderName, data.senderEmail, data.message);
  smtpTransport.sendMail(mailOptions, function(err, res) {
    if (err) cb(err);
    else cb(null, res);
  });
}

const setMailOptions = function(senderName, senderEmail, message) {
  mailOptions = {
    from: `${senderName} <aaronmcnulty@gmail.com>`,
    to: `amcnulty88@swbell.net`,
    subject: `New Message From Portfolio Page!`,
    text: message,
    html: `<h2 style="color: grey">You have received a message from - ${senderName}</h2>
          <h4 style="color: grey">Return Address: ${senderEmail}</h4>
          <p style="font-size: 20px, color: #333333">${message}</p>
          <br>
          <br>
          <img src="https://raw.githubusercontent.com/amcnulty/Aaron-Michael/master/public/images/logos/darkInitials.png" style="width: 150px, height: 150px"/>
          <br>
          <span style="font-size: 18px, font-weight: bold">Monkey Stomp Games 2018</span>
          <br>
          <span>Aaron Michael Portfolio Page</span>
          <br>
          <span>p: 913-219-5521</span>
          <br>
          <span>e: aaronmcnulty88@gmail.com</span>`
  }
}

module.exports = {
  sendMessage: sendMessage
}