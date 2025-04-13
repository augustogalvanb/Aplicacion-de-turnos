import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Tu correo (ej. tuemail@gmail.com)
    pass: process.env.EMAIL_PASS, // Contraseña de aplicación de Gmail
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email enviado a ${to}`);
  } catch (error) {
    console.error('Error enviando email:', error);
    throw new Error('No se pudo enviar el correo');
  }
};