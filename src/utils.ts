// tslint:disable no-bitwise

import normalizeColor from './normalize-color'
const linear = t => t

function findRange(input, inputRange) {
  let i
  for (i = 1; i < inputRange.length - 1; ++i) {
    if (inputRange[i] >= input) {
      break
    }
  }
  return i - 1
}

const stringShapeRegex = /[0-9\.-]+/g
function isRgbOrRgba(range) {
  return typeof range === 'string' && range.indexOf('rgb') === 0
}

function colorToRgba(input) {
  let int32Color = normalizeColor(input)
  if (int32Color === null) {
    return input
  }

  int32Color = int32Color || 0

  const r = (int32Color & 0xff000000) >>> 24
  const g = (int32Color & 0x00ff0000) >>> 16
  const b = (int32Color & 0x0000ff00) >>> 8
  const a = (int32Color & 0x000000ff) / 255

  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export { findRange, stringShapeRegex, isRgbOrRgba, colorToRgba, linear }
