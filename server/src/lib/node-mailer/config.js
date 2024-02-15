import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

export const connectNodemailer = () => {
  transporter.verify(function (error, success) {
    if (error) console.log(error);
    else console.log('Nodemailer connect successful!');
  });
};

export const sendMail = async ({ to, subject, text, html, attachments = [] }) => {
  let mailOptions = {
    from: process.env.NODEMAILER_USERNAME,
    to,
    subject,
    text,
    html,
    attachments
  };

  const attr = { to, subject, content: html || text };

  try {
    let info = await transporter.sendMail(mailOptions);
    return { ...attr, status: 1, mess: info.response };
  } catch (error) {
    return { ...attr, status: 2, mess: error.code };
  }
};
