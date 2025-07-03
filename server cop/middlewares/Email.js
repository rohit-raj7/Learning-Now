
import { transporter } from "./Email.config.js";

import dotenv from 'dotenv';

import {
  Verification_Email_Template,
  Welcome_Email_Template,
  Reset_Email_Template,
} from "./EmailTemplate.js";



dotenv.config();
// Helper to replace all occurrences
const replaceAll = (template, placeholder, value) =>
  template.split(placeholder).join(value);

// Send signup verification code
export const SendVerificationCode = async (email, verificationCode) => {
  try {
    const html = replaceAll(Verification_Email_Template, "{verificationCode}", verificationCode);

    const response = await transporter.sendMail({
      // from: `"Online Education" <rohitraj.contact.me@gmail.com>`,
       from: `"Online Education" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your Email",
      text: `Your verification code is: ${verificationCode}`,
      html,
    });

    console.log("✅ Verification email sent:", response.messageId);
  } catch (error) {
    console.error("❌ Error sending verification email:", error.message);
  }
};

// Send welcome email after successful verification
export const WelcomeEmail = async (email, name) => {
  try {
    const html = replaceAll(Welcome_Email_Template, "{name}", name);

    const response = await transporter.sendMail({
      // from: `"Online Education" <rohitraj85211@gmail.com>`,
       from: `"Online Education" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Online Education",
      text: `Welcome, ${name}!`,
      html,
    });

    console.log("✅ Welcome email sent:", response.messageId);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error.message);
  }
};

// Send password reset OTP
export const SendResetCode = async (email, resetCode) => {
  try {
    const html = replaceAll(Reset_Email_Template, "{resetCode}", resetCode);

    const response = await transporter.sendMail({
      // from: `"Online Education" <rohitraj85211@gmail.com>`,
       from: `"Online Education" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      text: `Your password reset code is: ${resetCode}`,
      html,
    });

    console.log("✅ Reset code email sent:", response.messageId);
  } catch (error) {
    console.error("❌ Error sending reset code email:", error.message);
  }
};
