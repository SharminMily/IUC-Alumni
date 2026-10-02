import nodemailer from 'nodemailer';
import config from '../config';


export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production', 
    auth: {
      user: 'sharminmily039@gmail.com',
      pass: 'wzlm onym djlk cdjv',
    },
  });
  await transporter.sendMail({
    // from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    from: 'sharminmily039@gmail.com',
    to, 
    subject: 'Hello! Reset your password within 10 mins ✔', 
    text: '', 
    html, 
  });
};
