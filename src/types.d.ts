export interface IsnstanceResult {
  front: number
  back: number
  db: number
}

export interface TestResult {
  title: string
  dev: IsnstanceResult
  test: IsnstanceResult
  prod: IsnstanceResult
  norm: number
}

export type KeyList<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

export type IsnstanceType = KeyList<TestResult, IsnstanceResult>

export interface OSoptionList {
  title: string
  url: string
}
