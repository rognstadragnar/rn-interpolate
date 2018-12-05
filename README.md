# rn-interpolate

`AnimationValue.interpolate` from React Native as a standalone js module

## Usage

#### Installation

```js
npm i rn-interpolate // soon
```

#### Basic usage

```ts
import createInterpolation from 'rn-interpolate'

const config = {
  inputRange: [0, 1],
  outputRange: [0, 100]
}

const interpolate = createInterpolation(config)

console.log(interpolate(0.5)) // 50
```

#### Advanced usage

See the [React Native docs](https://facebook.github.io/react-native/docs/animations#interpolation)

## License

[MIT](LICENSE).
