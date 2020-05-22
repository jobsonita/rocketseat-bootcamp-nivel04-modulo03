type MailDriver = 'ethereal' | 'ses'

type Sender = {
  name: string
  email: string
}

function getMailDriver(): MailDriver {
  const driver = process.env.MAIL_DRIVER?.trim()
  if (driver === 'ethereal' || driver === 'ses') {
    return driver
  }
  throw new Error('Invalid MAIL_DRIVER on .env file, use "ethereal" or "ses".')
}

function getSender(): Sender {
  const name = process.env.MAIL_SENDER_NAME?.trim()
  const email = process.env.MAIL_SENDER_EMAIL?.trim()
  if (email && name) {
    return { name, email }
  }
  throw new Error('Please fill up MAIL_SENDER_* information on .env file.')
}

export default {
  driver: getMailDriver(),

  sender: getSender(),
}
