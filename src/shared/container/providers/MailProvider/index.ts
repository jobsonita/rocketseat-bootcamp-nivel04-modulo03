import { container } from 'tsyringe'

import mailConfig, { MailDriver } from '@config/mail'

import IMailProvider from './models/IMailProvider'

import EtherealMailProvider from './implementations/EtherealMailProvider'
import SESMailProvider from './implementations/SESMailProvider'

function resolveProvider(driver: MailDriver): IMailProvider {
  switch (driver) {
    case 'ethereal':
      return container.resolve(EtherealMailProvider)
    case 'ses':
      return container.resolve(SESMailProvider)
    default:
      throw new Error(`Unknown MailProvider driver "${driver}"`)
  }
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  resolveProvider(mailConfig.driver)
)
