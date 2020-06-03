import ICacheProvider from '../models/ICacheProvider'

export default class FakeCacheProvider implements ICacheProvider {
  private cache: Record<string, unknown> = {}

  public async store(key: string, value: unknown): Promise<void> {
    this.cache[key] = value
  }

  public async retrieve<T>(key: string): Promise<T | null> {
    return this.cache[key] as T
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key]
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const pattern = new RegExp(`^${prefix}:`)
    const keys = Object.keys(this.cache).filter((key) => pattern.test(key))

    keys.forEach((key) => {
      delete this.cache[key]
    })
  }
}
