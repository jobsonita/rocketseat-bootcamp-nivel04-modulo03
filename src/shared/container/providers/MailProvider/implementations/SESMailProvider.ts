import aws from 'aws-sdk'
import nodemailer, { Transporter } from 'nodemailer'
import { inject, injectable } from 'tsyringe'

import mailConfig from '@config/mail'

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'

import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client!: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    })
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || mailConfig.sender.name,
        address: from?.email || mailConfig.sender.email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })
  }
}
