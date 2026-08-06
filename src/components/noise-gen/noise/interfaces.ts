// Vendored from https://github.com/yuval59/random/blob/main/src/noise-gen/noise/interfaces.ts
// (commit 4690258, 2024-03-31). Edit upstream first, then re-copy.
export interface HashFunction<outputType> {
  (seed: string): outputType
}

export interface RandomnessFunction {
  (): number
}

export interface ValueFunction<valueType> {
  (): valueType
}
