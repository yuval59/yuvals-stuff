// A vendored copy of https://github.com/yuval59/random/tree/main/src/noise-gen
// (commit 4690258, 2024-03-31).
//
// It is copied rather than pulled in as a git submodule because submodules
// track whole repositories, not subdirectories, so `random` would have to be
// checked out in full. Only the pieces this site needs are here: the Node-only
// `examples/` and the unused `types.ts` (which imports a path that no longer
// exists upstream) were left out.
export { NoiseMap } from './noise/abstract'
export {
  FractionalBrownianMotion,
  GradientNoise,
  ValueNoise,
} from './noise/noise'
export { getHashedL4PRNG, getMulberry32 } from './utils/useful-math'
