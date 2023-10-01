// pages/api/sendEmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, subject, message } = req.body;

      // Validate the request data (you can add more validation if needed)
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All input fields are required' });
      }

      // Create a transporter using your SMTP credentials from environment variables
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_E, // Using the environment variable for Gmail email
          pass: process.env.GMAIL_P, // Using the environment variable for Gmail password
        },
      });

      // Compose the email message
      const mailOptions = {
        from: process.env.GMAIL_E, // Using the environment variable for Gmail email
        to: process.env.GMAIL_E, // Replace with the email where you want to receive messages
        subject: `New message from ${name} (${email}): ${subject}`,
        text: message,
      };

      // Send mail with defined transport object
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
