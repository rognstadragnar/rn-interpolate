import * as chai from 'chai'
import * as mocha from 'mocha'
import createInterpolation from '../src/index'

const expect = chai.expect

describe('Number interpolation', () => {
  it('Should handle basic interpolation', () => {
    const config = {
      inputRange: [0, 1],
      outputRange: [0, 100]
    }

    const interpolate = createInterpolation(config)

    const min = interpolate(0)
    expect(min).to.equal(0)

    const middle = interpolate(0.5)
    expect(middle).to.equal(50)

    const max = interpolate(1)
    expect(max).to.equal(100)
  })
})
