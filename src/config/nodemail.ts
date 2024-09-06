import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

export const nodemailerConfig: SMTPTransport.Options = {
  host: "smtp-mail.outlook.com", // hostname
  secure: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: 'SSLv3'
  },
  auth: {
    user: process.env.OUTLOOK_EMAIL,
    pass: process.env.OUTLOOK_PASSWORD,
  },
};
