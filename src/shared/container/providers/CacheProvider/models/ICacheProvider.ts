export default interface ICacheProvider {
  store(key: string, value: string): Promise<void>
  retrieve(key: string): Promise<string | null>
  invalidate(key: string): Promise<void>
}
