export default interface ICacheProvider {
  store(key: string, value: unknown): Promise<void>
  retrieve<T>(key: string): Promise<T | null>
  invalidate(key: string): Promise<void>
}
