# shrinku

## Status
[![Crates.io](https://img.shields.io/badge/status-NOT%20READY-orange.svg?style=flat-square)]()

## TL;DR

```sh
npm install shrinku && echo 'NOT YET PUBLISHED ON NPM.'
```

```js
const Shrinku = require('shrinku');
const shrinku = new Shrinku();

shrinku.useStrategy(new Shrinku.Strategies.SimpleStrategy());
shrinku.addAdapter('memory', new Shrinku.Adapters.MemoryAdapter());

shrinku.shrink({ url: 'http://github.com' })
  .then((result) => {
    console.log(result.url, result.hash);

    return shrinku.unshrink({ hash: result.hash });
  })
  .then(console.log)
  .catch(console.log);
```

### Adapters
- BaseAdapter
- DumbAdapter
- MemoryAdapter

An adapter must implement:
- `findByUrl(options)`
- `findByHash(options)`
- `find(options)`
- `save(options)`

### Strategies
- BaseStrategy
- SimpleStrategy
- CachedStrategy

A strategy must implement:
- `shrink(adapters, options)`
- `unshrink(adapters, options)`

## Dependencies
- Node > `6.3`
- shortid
- bunyan

## Why ?
When you need to generate short url, you're somewhat stuck with services like bit.ly or goo.gl.
What if you want total control? You could spend time writing your own service... But let's face it, it's
old school to reinvent the wheel.

There are several options available... I find them too much opinionated or they looks like Behemoth (eg. YOURLS (PHP)).

**Shrinku** aims to be *adaptable and customizable* but works out of the box.
Select the strategy you want, the storage you want and start shrinking urls...

## How to help ?
You can help by writing tests, documentations, strategies and adapters.

## Documentation
Light documentation is available:  https://karasube.github.io/Shrinku/
or you can generate a local copy:
```sh
npm run doc && cd ./doc
```
