import { Injectable } from '@nestjs/common';
import *as nodemailer from "nodemailer"

@Injectable()
export class EmailService {

    private transporter

    constructor() {
        this.transporter =  nodemailer.createTransport({
            port: 587,
            host: 'live.smtp.mailtrap.io',
            auth: {
                user: 'api', 
                pass: '34178b92a4e5620b3a5a9a0058a9a368'  
            }
          })
    }

    public async sendEmail (config){
        const info = await this.transporter.sendMail({
          ...config,
          from: 'mailtrap@demomailtrap.com'
        });
          console.log("Message sent: %s", info.messageId);
    }
}
