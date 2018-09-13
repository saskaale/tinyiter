# tinyiter [![Build Status](https://travis-ci.com/saskaale/tinyiter.svg?branch=master)](https://travis-ci.com/saskaale/tinyiter)
> *"An easy way to iterate and manipulate with javascript objects and arrays."*

Very lightweight library (6KB :hammer:) to manipulate javascript objects and arrays. No 3rd party dependencies, no bullshit :heart:. Inspired by [Immutable.js Seq](https://facebook.github.io/immutable-js/docs/#/Seq)

### Table of Contents
* [Installation](#installation)
* [Features](#features)
* [Usage](#usage)
* [Documentation](#documentation)
* [License](#license)

### Installation
Add library into your project:
```console
$ yarn install tinyiter
```

### Features

#### Embraces ES2015

Tinyiter supports all JavaScript environments, including legacy browsers (even IE8). However it also takes advantage of features added to JavaScript in ES2015, the latest standard version of JavaScript,
 including Iterators, Arrow Functions, Classes, and Modules. It's inspired by the native Map and Set collections added to ES2015.

Note: All examples in the Documentation are presented in ES2015. To run in all browsers, they need to be translated to ES5.

```javascript
// ES2015
const mapped = foo.map(x => x * x);
// ES5
var mapped = foo.map(function (x) { return x * x; });
```

#### Chaining the functions

The tinyiter sequence is intended to be chained:

```javascript
const e = TinyIter({a:1, b:3, c:6, e:10}).filter(e => e >= 6 ).map(e => e * 2 ).toObject(); // {c:12, e:20}
```


### Usage
```javascript
import TinyIter from 'tinyiter';

TinyIter({a:1, b:3}).filter((e) => e == 3).toObject();  // {b:3}
TinyIter([1,3,5]).filter((e) => e == 3).toArray();  // {b:3}
```
### Documentation

#### TinyIter()

Creates a Sequence.

```javascript
    TinyIter(iter: I): TinyIter
    TinyIter(obj: {[key: string]: V}): TinyIter
    TinyIter(): TinyIter
```

Can be constructed with either of the:

* array
* object
* instance of the TinyIter

Returns instance of TinyIter

#### map()

Returns a new TinyIter with values passed through a mapper function.

```javascript
map(mapper: (value: V, key: K, iter: this) => M): TinyIter
```

##### example
```javascript
const TinyIter = require('tinyiter')
Seq([ 1, 2 ]).map((value, key) => key * value * 2)
```

#### forEach()

The sideEffect is executed for every entry.

```javascript
forEach(sideEffect: (value: V, key: K, iter: this) => M): undefined
```

##### example
```javascript
const TinyIter = require('tinyiter')
Seq([ 1, 2 ]).forEach((value, key) => { console.log(key+" = "+value ); }
```

#### toObject()

Shallowly converts the Collection to an JavaScript Object.

```javascript
toObject(): {[key: string]: V}
```

#### toArray()

Shallowly converts the Collection to an JavaScript Array.

```javascript
toArray(): Array<V> | Array<[K, V]>
```




### Contribute

Tinyiter is [FOSS](https://en.wikipedia.org/wiki/Free_and_open-source_software) project, so you're welcome to be one of our developers and making the library even better.

### Testing
We are using the [Chai Assertion Library](http://www.chaijs.com/) to help our library fully tested stable.

#### Contribution
Use [GitHub issues](https://github.com/saskaale/tinyiter/issues) for requests.

We actively welcome [pull requests](https://github.com/saskaale/tinyiter/pulls), feel free to contribute.

[comment]: # #### Changelog
[comment]: # Changes are tracked as GitHub releases.

### Licence
This project is licenced by [Apache License 2.0](https://github.com/saskaale/tinyiter/blob/master/LICENSE).


