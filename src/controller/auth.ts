import nodemailer from "nodemailer";
import { nodemailerConfig } from "../config/nodemail.js";

const transporter = nodemailer.createTransport(nodemailerConfig);
export function sendVerificationEmail(email: string, token: string) {
  // Implement email sending logic
  console.log(`Email sent to ${email} with token ${token}`);
  const emailOptions = {
    from: process.env.OUTLOOK_EMAIL,
    to: email,
    subject: "Nodemailer test",
    text: "Testare de email registration",
    html: `<p>Click <a href="${process.env.BASE_URL}/api/users/verify/${token}">here</a> to verify your email address.</p>`,
  };

  return transporter.sendMail(emailOptions);
}
