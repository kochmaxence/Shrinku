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
  
  shrinku.addAdapter('memory', new Shrinku.Adapters.MemoryAdapter());
  
  shrinku.shrink({ url: 'http://github.com' })
    .then((result) => {
      console.log(result.url, result.hash);
      
      return shrinku.unshrink({ hash: result.hash });
    })
    .then(console.log)
    .catch(console.log);
```
## Why ?
To be written

## How to help ?
To be written

## Documentation
Light documentation is available:  https://karasube.github.io/Shrinku/ 
or you can generate a local copy:
```sh
npm run doc && cd ./doc
```
