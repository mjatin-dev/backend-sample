import { Injectable } from '@nestjs/common';
import sgMail from '@sendgrid/mail';
import env from '@/config/env.config';
import {
  SendMailData,
  WelcomeTemplateData,
  PasswordResetTemplateData,
  SignUpVerification,
  SendHtmlMail,
} from './types';

@Injectable()
export class MailService {
  constructor() {
    sgMail.setApiKey(env().sendgridApiKey);
  }

  async sendEmail<T>(mailData: SendMailData<T>): Promise<void> {
    await sgMail.send({
      ...mailData,
      from: mailData.from
        ? `<${mailData.from}>`
        : `<hello@${env().sendgridSendingDomain}>`,
    });
  }
  async sendHtmlEmail<T>(mailData: SendHtmlMail): Promise<void> {
    try {
      await sgMail.send({
        ...mailData,
        from: mailData.from
          ? `<${mailData.from}>`
          : `<hello@${env().sendgridSendingDomain}>`,
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async sendWelcomeEmail(
    to: string,
    data: WelcomeTemplateData,
    from?: string,
  ): Promise<void> {
    await this.sendEmail<WelcomeTemplateData>({
      to,
      from,
      templateId: 'd-a506f06454614faab4fb1ebde6060af9',
      dynamicTemplateData: data,
    });
  }

  async sendVerificationEmail(
    to: string,
    htmlContent: string,
    from?: string,
  ): Promise<void> {
    await this.sendHtmlEmail<SignUpVerification>({
      to,
      from,
      text: htmlContent,
      html: htmlContent,
      subject: 'Please Verify Your Email Address',
    });
  }

  async sendPasswordResetEmail(
    to: string,
    data: PasswordResetTemplateData,
    from?: string,
  ): Promise<void> {
    await this.sendEmail<PasswordResetTemplateData>({
      to,
      from,
      templateId: 'd-9770504226ca4f4ca886634de7c43e13',
      dynamicTemplateData: data,
    });
  }

  async sendUserInvitationEmail(
    subject: string,
    to: string,
    htmlContent: string,
    from?: string
  ): Promise<void> {
    await this.sendHtmlEmail<SignUpVerification>({
      to,
      from,
      text: htmlContent,
      html: htmlContent,
      subject: subject,
    });
  }
}
