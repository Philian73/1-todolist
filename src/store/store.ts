export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U }
  ? U
  : never
