/* eslint-disable @typescript-eslint/explicit-function-return-type */
require('dotenv-safe').config()

const loggingOptions = [
  'all',
  'query',
  'error',
  'schema',
  'warn',
  'info',
  'log',
]

/**
 * @param {string} options
 * @returns {boolean|string|string[]}
 */
function parseLoggingOptions(options) {
  if (options) {
    const trimmedOptions = options.trim()

    if (trimmedOptions === 'true') {
      return true
    }

    if (trimmedOptions === 'false') {
      return false
    }

    const typeormOptions = trimmedOptions
      .split(',')
      .map((item) => item.trim())
      .filter((item) => {
        if (loggingOptions.includes(item)) {
          return true
        }
        console.warn(
          `ormconfig.js: option "${item}" isn't a valid typeorm logging option for sql and was ignored.`
        )
        return false
      })

    if (typeormOptions.includes('all')) {
      if (typeormOptions.length > 1) {
        console.log(
          "ormconfig.js: 'all' option received, ignoring other options"
        )
      }
      return 'all'
    }

    if (typeormOptions.length > 0) {
      return typeormOptions
    }
  }
  return true
}

module.exports = [
  {
    name: 'default',
    type: process.env.SQL_DIALECT,
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    username: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB,
    logging: parseLoggingOptions(process.env.SQL_LOGGING),
    entities: [process.env.SQL_ENTITIES_GLOB_PATTERN],
    migrations: [process.env.SQL_MIGRATIONS_GLOB_PATTERN],
    cli: {
      migrationsDir: process.env.SQL_CLI_MIGRATIONS_DIR,
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASS,
    database: process.env.MONGO_DB,
    logging: parseLoggingOptions(process.env.MONGO_LOGGING),
    entities: [process.env.MONGO_ENTITIES_GLOB_PATTERN],
    useUnifiedTopology: true,
    extra: {
      authSource: 'admin',
    },
  },
]
