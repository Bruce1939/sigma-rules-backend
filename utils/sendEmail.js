// Library(s)
import nodemailer from "nodemailer";

// Constants
import { env } from "./../config/index.js";

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: env.SMTP_SERVER,
            port: env.SMTP_PORT,
            auth: {
                user: env.SMTP_USERNAME,
                pass: env.SMTP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: "sigma-rules@gmail.com",
            to: email,
            subject,
            text,
        });
    } catch (error) {
        console.log(error);
    }
};

export default sendEmail;
