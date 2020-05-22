function getAppSecret(): string {
  try {
    const app_secret = process.env.APP_SECRET?.trim()
    if (app_secret) {
      return app_secret
    }
  } catch (err) {
    // noop
  }
  throw new Error('You must set a valid APP_SECRET on .env file')
}

export default {
  secret: getAppSecret(),
  tokenDuration: '1d',
}
