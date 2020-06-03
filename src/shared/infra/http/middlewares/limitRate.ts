import { Request, Response, NextFunction } from 'express'

import { RateLimiterRedis } from 'rate-limiter-flexible'
import Redis from 'ioredis'

import cacheConfig from '@config/cache'

import AppError from '@shared/errors/AppError'

const redisClient = new Redis(cacheConfig.redis)

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'limit-rate',
  points: 5,
  duration: 1,
})

export default async function limitRate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await rateLimiter.consume(req.ip)

    return next()
  } catch (err) {
    throw new AppError('Too many requests', 429)
  }
}
