import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(): Promise<void> {
    await this.mailerService.sendMail({
      from: 'My App <noreply@test.com>',
      // to: 'jinang.shah.sa@gmail.com',
      to: 'hard.sheth.sa@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email',
      // attachments: [
      //   // to Send the file which is hosted on server?
      //   // {
      //   //   filename: 'link.txt',
      //   //   path: 'https://example.com',
      //   // },
      // //  to Send the file which is stored on local server.
      //   // {
      //   //   filename: 'file.txt',
      //   //   path: '/path/to/file.txt',
      //   // },
      // ],
    });
  }
}
