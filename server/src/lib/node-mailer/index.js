import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const connectNodemailer = () => {
  transporter.verify(function (error, success) {
    if (error) console.log(error);
    else console.log('Nodemailer connect successful!');
  });
};

export const sendMail = ({ to, subject, text, html, attachments = [] }) => {
  let mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    text,
    html,
    attachments
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
  });
};
