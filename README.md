# tinyiter [![Build Status](https://travis-ci.com/saskaale/tinyiter.svg?branch=master)](https://travis-ci.com/saskaale/tinyiter)
> *"An easy way to iterate and manipulate with javascript objects and arrays."*

Very lightweight library (6KB) to manipulate javascript objects and arrays.No 3rd party dependencies. Inspired by [Immutable.js Seq](https://facebook.github.io/immutable-js/docs/#/Seq)

### Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Documentation](#documentation)
* [License](#license)

### Installation
Add library into your project:
```console
$ yarn install tinyiter
```

### Usage
```javascript
import TinyIter from 'tinyiter';

TinyIter({a:1, b:3}).filter((e) => e == 3).toObject();  // {b:3}
TinyIter([1,3,5]).filter((e) => e == 3).toArray();  // {b:3}
```
### Documentation



### Licence
This project is licenced by [Apache License 2.0](https://github.com/saskaale/tinyiter/blob/master/LICENSE).


