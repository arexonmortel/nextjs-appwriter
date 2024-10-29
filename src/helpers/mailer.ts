import nodemailer from 'nodemailer';
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}: any) => {

    try {
        //hash token for email verification without special characters
        const hashedToken = await bcryptjs.hashSync(userId.toString(), 10).replace(/\W/g, '');

        if(emailType === 'VERIFY'){
             await User.findByIdAndUpdate(userId,{
            verifyToken: hashedToken,
            verifyExpiry: Date.now() + 3600000
        })
        } else if (emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,{
            forgotPasswordToken: hashedToken,
            forgotPasswordExpiry: Date.now() + 3600000
        })
        }
        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: process.env.USER,
            pass: process.env.PASS
          }
        });

        const mailOptions = {
            from: 'arexon@email.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Email Verification' : 'Password Reset',
            html: emailType === 'VERIFY' ? `<h1>Email Verification</h1>
            <p>Click <a href="https://${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email</p>` : `<h1>Password Reset</h1>
            <p>Click <a href="https://${process.env.DOMAIN}/newpassword?token=${hashedToken}">here</a> to reset your password</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

        
    } catch (error: any) {
        throw new Error(error.message);
        
    }
}