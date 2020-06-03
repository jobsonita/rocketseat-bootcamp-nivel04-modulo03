import { RedisOptions } from 'ioredis'

const redis = {
  host: process.env.CACHE_HOST,
  port: process.env.CACHE_PORT,
  password: process.env.CACHE_PASSWORD,
} as RedisOptions

export default {
  driver: 'redis',

  redis,
}
