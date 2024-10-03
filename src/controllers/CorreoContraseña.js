import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,  // Tu correo de Gmail
        pass: process.env.GMAIL_PASS   // Contraseña de aplicación generada
    }
});
export const SendEmail = async (email, token, userId) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Recuperación de cuenta',
        text: `Hola, para recuperar tu cuenta ingresa a este link: http://localhost:3000/contrasena/password/${userId}/${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });
};
