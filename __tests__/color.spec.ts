import * as chai from 'chai'
import * as mocha from 'mocha'
import createInterpolation from '../src/index'

const expect = chai.expect

describe('Color interpolation', () => {
  it('Should handle basic interpolation', () => {
    const config = {
      inputRange: [0, 1],
      outputRange: ['rgba(100, 100, 100, 1)', 'rgba(0, 0, 0, 0)']
    }

    const interpolate = createInterpolation(config)

    const min = interpolate(0)
    expect(min).to.equal('rgba(100, 100, 100, 1)')

    const middle = interpolate(0.5)
    expect(middle).to.equal('rgba(50, 50, 50, 0.5)')

    const max = interpolate(1)
    expect(max).to.equal('rgba(0, 0, 0, 0)')
  })
})
