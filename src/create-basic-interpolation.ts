import { findRange, linear } from './utils'

import interpolate from './interpolate'

export default function createInterpolation(config) {
  

  const outputRange = config.outputRange // checkInfiniteRange('outputRange', outputRange);
  const inputRange = config.inputRange
  const easing = config.easing || linear

  let extrapolateLeft = 'extend'
  if (config.extrapolateLeft !== undefined) {
    extrapolateLeft = config.extrapolateLeft
  } else if (config.extrapolate !== undefined) {
    extrapolateLeft = config.extrapolate
  }

  let extrapolateRight = 'extend'
  if (config.extrapolateRight !== undefined) {
    extrapolateRight = config.extrapolateRight
  } else if (config.extrapolate !== undefined) {
    extrapolateRight = config.extrapolate
  }

  return input => {
    const range = findRange(input, inputRange)
    return interpolate(
      input,
      inputRange[range],
      inputRange[range + 1],
      outputRange[range],
      outputRange[range + 1],
      easing,
      extrapolateLeft,
      extrapolateRight
    )
  }
}

