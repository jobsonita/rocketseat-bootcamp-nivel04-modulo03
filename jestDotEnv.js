/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
require('dotenv-safe').config({
  path: path.resolve(__dirname, '.env.test'),
})
