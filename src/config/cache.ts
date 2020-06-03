import { RedisOptions } from 'ioredis'

const redis = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS,
} as RedisOptions

export default {
  driver: 'redis',

  redis,
}
