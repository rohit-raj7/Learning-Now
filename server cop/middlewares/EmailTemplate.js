
export const Verification_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
          body {
              margin: 0;
              padding: 0;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #e0e0e0;
          }
          .header {
              background: linear-gradient(to right, #4CAF50, #81C784);
              color: white;
              padding: 24px;
              text-align: center;
              font-size: 28px;
              font-weight: 600;
              letter-spacing: 1px;
          }
          .content {
              padding: 30px;
              font-size: 16px;
              line-height: 1.7;
              color: #444;
          }
          .verification-code {
              display: block;
              margin: 24px 0;
              font-size: 26px;
              color: #2e7d32;
              background: #e8f5e9;
              border: 2px dashed #66bb6a;
              padding: 16px;
              text-align: center;
              border-radius: 8px;
              font-weight: bold;
              letter-spacing: 4px;
              word-break: break-word;
          }
          .footer {
              background-color: #fafafa;
              padding: 20px;
              text-align: center;
              font-size: 13px;
              color: #999;
              border-top: 1px solid #ddd;
          }
          a {
              color: #4CAF50;
              text-decoration: none;
          }
          p {
              margin-bottom: 16px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Verify Your Email</div>
          <div class="content">
              <p>Hello,</p>
              <p>Thank you for signing up! To complete your registration, please enter the verification code below:</p>
              <span class="verification-code">{verificationCode}</span>
              <p>If you didn’t request this, you can safely ignore this email. For help, please <a href="mailto:support@yourcompany.com">contact support</a>.</p>
          </div>
          <div class="footer">
              &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
          </div>
      </div>
  </body>
  </html>
`;

export const Welcome_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our Community</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background-color: #007BFF;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              line-height: 1.8;
          }
          .welcome-message {
              font-size: 18px;
              margin: 20px 0;
          }
          .button {
              display: inline-block;
              padding: 12px 25px;
              margin: 20px 0;
              background-color: #007BFF;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              text-align: center;
              font-size: 16px;
              font-weight: bold;
              transition: background-color 0.3s;
          }
          .button:hover {
              background-color: #0056b3;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Welcome to Our Community!</div>
          <div class="content">
              <p class="welcome-message">Hello {name},</p>
              <p>We’re thrilled to have you join us! Your registration was successful, and we’re committed to providing you with the best experience possible.</p>
              <p>Here’s how you can get started:</p>
              <ul>
                  <li>Explore our features and customize your experience.</li>
                  <li>Stay informed by checking out our blog for the latest updates and tips.</li>
                  <li>Reach out to our support team if you have any questions or need assistance.</li>
              </ul>
              <a href="#" class="button">Get Started</a>
              <p>If you need any help, don’t hesitate to contact us. We’re here to support you every step of the way.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;

export const Reset_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Password Reset</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f0f4f8;
              color: #333;
              padding: 0;
              margin: 0;
          }
          .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #fff;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #e0e0e0;
          }
          .header {
              background-color: #FF9800;
              color: white;
              padding: 24px;
              text-align: center;
              font-size: 24px;
              font-weight: bold;
          }
          .content {
              padding: 30px;
              font-size: 16px;
              line-height: 1.6;
              color: #444;
          }
          .reset-code {
              display: block;
              margin: 20px 0;
              font-size: 24px;
              color: #d84315;
              background-color: #fff3e0;
              border: 2px dashed #ff9800;
              padding: 14px;
              text-align: center;
              border-radius: 8px;
              font-weight: bold;
              letter-spacing: 3px;
              word-break: break-word;
          }
          .footer {
              background-color: #fafafa;
              padding: 18px;
              text-align: center;
              font-size: 13px;
              color: #888;
              border-top: 1px solid #ddd;
          }
          a {
              color: #ff9800;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Reset Your Password</div>
          <div class="content">
              <p>Hello,</p>
              <p>We received a request to reset your password. Use the code below to proceed:</p>
              <span class="reset-code">{resetCode}</span>
              <p>If you didn’t request this, please ignore this email. For assistance, <a href="mailto:support@yourcompany.com">contact support</a>.</p>
          </div>
          <div class="footer">
              &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
          </div>
      </div>
  </body>
  </html>
`;
