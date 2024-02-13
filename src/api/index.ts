/**
 * 接口返回结果
 */

export interface WebApiResult<T> {
  code: number
  message?: string
  data?: T
}
