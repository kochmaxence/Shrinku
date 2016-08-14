# shrinku

## TL;DR

```sh
npm install shrinku
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
- Shrinku.Adapters.BaseAdapter
- Shrinku.Adapters.DumbAdapter
- Shrinku.Adapters.MemoryAdapter
- [RethinkdbAdapter](http://github.com/karasube/shrinku-adapter-rethinkdb)
- [YourlsAdapter](http://github.com/karasube/shrinku-adapter-yourls) [not yet released/WIP]

An adapter must implement:
- `findByUrl(options)`
- `findByHash(options)`
- `find(options)`
- `save(options)`

### Strategies
- Shrinku.Strategies.BaseStrategy
- Shrinku.Strategies.SimpleStrategy
- [CachedStrategy](http://github.com/karasube/shrinku-strategy-cached) [not yet released/WIP]
- [MigrationStrategy](http://github.com/karasube/shrinku-strategy-migration) [not yet released/WIP]

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
