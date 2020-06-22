import path from 'path'
import { inject, injectable } from 'tsyringe'

import appConfig from '@config/app'

import AppError from '@shared/errors/AppError'

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'

import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

interface IRequest {
  email: string
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Invalid email.')
    }

    const { token } = await this.userTokensRepository.generate(user.id)

    const forgotPasswordTemplateFile = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplateFile,
        variables: {
          name: user.name,
          link: `${appConfig.web_url}/reset-password?token=${token}`,
        },
      },
    })
  }
}
