import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendVerificationEmail(email: string, code: string) {
    const mailOptions = {
      from: `"JapanGo Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your 6-Digit Login Code',
      text: `Your verification code is: ${code}`,
    };
  
    await transporter.sendMail(mailOptions);
  }