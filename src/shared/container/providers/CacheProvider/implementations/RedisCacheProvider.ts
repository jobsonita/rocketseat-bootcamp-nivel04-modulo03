import Redis, { Redis as RedisClient } from 'ioredis'

import cacheConfig from '@config/cache'

import ICacheProvider from '../models/ICacheProvider'

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient

  constructor() {
    this.client = new Redis(cacheConfig.redis)
    console.log('Redis Cache: connected!')
  }

  public async store(key: string, value: string): Promise<void> {
    await this.client.set(key, value)
  }

  public async retrieve(key: string): Promise<string | null> {
    const data = this.client.get(key)

    return data
  }

  public async invalidate(key: string): Promise<void> {}
}
