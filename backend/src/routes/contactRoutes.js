import { Router } from 'express';
import nodemailer from 'nodemailer';
import ContactMessage from '../models/ContactMessage.js';

const router = Router();

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

router.post('/', async (request, response) => {
  try {
    const { name, email, message } = request.body;

    if (!name || !email || !message) {
      return response.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const transporter = createTransporter();
    const to = process.env.CONTACT_TO_EMAIL;

    if (!transporter || !to) {
      return response.status(500).json({
        message: 'Contact email is not configured on the server.',
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    const savedMessage = await ContactMessage.create({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });

    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
      to,
      replyTo: trimmedEmail,
      subject: `Portfolio Contact from ${trimmedName}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
      html: `
        <h2>New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${trimmedName}</p>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${trimmedMessage.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return response.status(201).json({
      message: 'Message sent and saved successfully.',
      id: savedMessage._id,
    });
  } catch (error) {
    console.error('Failed to process contact submission:', error);
    return response.status(500).json({ message: 'Failed to send and save message.' });
  }
});

export default router;
