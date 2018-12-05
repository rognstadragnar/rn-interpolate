import {
  colorToRgba,
  findRange,
  isRgbOrRgba,
  linear,
  stringShapeRegex
} from './utils'

import interpolate from './interpolate'

export default function createInterpolation(config) {
  if (config.outputRange && typeof config.outputRange[0] === 'string') {
    return createInterpolationFromStringOutputRange(config)
  }

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

function createInterpolationFromStringOutputRange(config) {
  let outputRange = config.outputRange
  outputRange = outputRange.map(colorToRgba)

  const outputRanges = outputRange[0].match(stringShapeRegex).map(() => [])
  outputRange.forEach(value => {
    value.match(stringShapeRegex).forEach((num, i) => {
      outputRanges[i].push(+num)
    })
  })

  const interpolations = outputRange[0]
    .match(stringShapeRegex)
    .map((value, i) => {
      return createInterpolation({
        ...config,
        outputRange: outputRanges[i]
      })
    })

  const shouldRound = isRgbOrRgba(outputRange[0])

  return input => {
    let i = 0

    return outputRange[0].replace(stringShapeRegex, () => {
      const val = +interpolations[i++](input)
      const rounded =
        shouldRound && i < 4 ? Math.round(val) : Math.round(val * 1000) / 1000
      return String(rounded)
    })
  }
}
