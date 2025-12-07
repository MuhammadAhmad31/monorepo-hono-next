import 'hono'

declare module 'hono' {
  interface HonoRequest {
    valid<T = unknown>(key: 'json'): T
    valid<T = Record<string, string>>(key: 'param'): T
    valid<T = Record<string, string | string[]>>(key: 'query'): T
    valid<T = unknown>(key: 'form'): T
    valid<T = unknown>(key: 'header'): T
    valid<T = unknown>(key: 'cookie'): T
  }
}