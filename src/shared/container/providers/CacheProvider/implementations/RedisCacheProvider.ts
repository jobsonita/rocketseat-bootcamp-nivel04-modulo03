import Redis, { Redis as RedisClient } from 'ioredis'

import cacheConfig from '@config/cache'

import ICacheProvider from '../models/ICacheProvider'

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient

  constructor() {
    this.client = new Redis(cacheConfig.redis)
    console.log('Redis Cache: connected!')
  }

  public async store(key: string, value: unknown): Promise<void> {
    await this.client.set(key, JSON.stringify(value))
  }

  public async retrieve<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key)

    return data ? (JSON.parse(data) as T) : null
  }

  public async invalidate(key: string): Promise<void> {}
}