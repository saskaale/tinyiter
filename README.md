# tinyiter [![Build Status](https://travis-ci.com/saskaale/tinyiter.svg?branch=master)](https://travis-ci.com/saskaale/tinyiter)
> *"An easy way to iterate and manipulate with javascript objects and arrays."*

Very lightweight library (3KB :hammer:) to manipulate javascript objects and arrays. No 3rd party dependencies, no bullshit :heart:. Inspired by [Immutable.js Seq](https://facebook.github.io/immutable-js/docs/#/Seq)

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

### Usage
```javascript
import TinyIter from 'tinyiter';

TinyIter({a:1, b:3, c:5}).filter((e) => e >= 3).toObject();  // {b:3, c:5}
TinyIter([1,3,5]).filter((e) => e >= 3).toArray();  // [3,5]
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

Has the native support for ES2015 iterators.

```javascript
import TinyIter from 'tinyiter';
const collection = TinyIter([1,5,7,15]);

// for..of literal
for(let e of collection){
    /// ... do any magic here
}

//array literal
let asArr = [...collection];
```

#### Chaining the functions

The tinyiter sequence is intended to be chained:

```javascript
const e = TinyIter({a:1, b:3, c:6, e:10}).filter(e => e >= 6 ).map(e => e * 2 ).toObject(); // {c:12, e:20}
```

### Documentation

##### TinyIter()

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

##### forEach()

The sideEffect is executed for every entry.

```javascript
forEach(
    sideEffect: (value: V, key: K, iter: this) => M,
    context?: any
): undefined
```

example:

```javascript
import TinyIter from 'tinyiter';
TinyIter([ 1, 2 ]).forEach((value, key) => { console.log(key+" = "+value ); }
```

##### map()

Returns a new TinyIter with values passed through a mapper function.

```javascript
map(
    mapper: (value: V, key: K, iter: this) => M,
    context?: any
): TinyIter
```

###### example

```javascript
import TinyIter from 'tinyiter';
TinyIter([ 1, 2 ]).map((value, key) => key * value * 2)
```

##### reduce()

Reduces the Collection to a value by calling the reducer for every entry in the Collection and passing along the reduced value.

```javascript
reduce(
reducer: (reduction: R, value: V, key: K, iter: this) => R,
initialReduction: R,
context?: any
): TinyIter
reduce(
reducer: (reduction: R, value: V, key: K, iter: this) => R,
initialReduction: R,
context?: any
): TinyIter

```

If initialReduction is not provided, the first item in the Collection will be used.

See [Array#reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

##### toObject()

Shallowly converts the Collection to an JavaScript Object.

```javascript
toObject(): {[key: string]: V}
```

##### toArray()

Shallowly converts the Collection to an JavaScript Array.

```javascript
toArray(): Array<V> | Array<[K, V]>
```

##### filter()

Returns a new TinyIter with only the values for which the predicate function returns true.

```javascript
filter(
    predicate: (value: V, key: K, iter: this) => boolean,
    context?: any
): TinyIter
```

##### concat()

Returns a new Collection of the same type with other values and collection-like concatenated to this one.

```javascript
concat(...valuesOrCollections: Array<any>): TinyIter
```

note:

This method has variable argument length with each of them can be any of those which are initiatized in the TinyIter constructor.

##### size()

Returns number of the elements in the Collection.

```javascript
size(): number
```

##### find()

Returns the first value for which the predicate returns true.

```javascript
filter(
    predicate: (value: V, key: K, iter: this) => boolean,
    context?: any
): TinyIter
```

##### findLast()

Returns the last value for which the predicate returns true.

```javascript
filter(
    predicate: (value: V, key: K, iter: this) => boolean,
    context?: any
): TinyIter
```

##### mapValues()

Remap the each entry key and value to different one.

```javascript
mapValues(
    mapper: (Array<key: K, value: V>) => Array<key: K, value: V>,
    context?: any
): TinyIter
```

```javascript
import TinyIter from 'tinyiter';
TinyIter({ 'a': 1, 'b' : 2 }).mapValues(([key, value]) => {return ['mapped_'+k, value*2];} );
```

##### sort()

Returns a new Collection of the same type which includes the same entries, sorted by using a comparator.

```javascript
sort(
    comparator?: (valueA: V, valueB: V) => number
): TinyIter
```

If a comparator is not provided, a default comparator uses < and >.

```javascript
comparator(valueA, valueB):
```
* Returns 0 if the elements should not be swapped.
* Returns -1 (or any negative number) if valueA comes before valueB
* Returns 1 (or any positive number) if valueA comes after valueB
* Is pure, i.e. it must always return the same value for the same pair of values.

Example:
```javascript
import TinyIter from 'tinyiter';
TinyIter({ "c": 3, "a": 1, "b": 2 }).sort((a, b) => {
  if (a < b) { return -1; }
  if (a > b) { return 1; }
  if (a === b) { return 0; }
});
```

##### sortBy()

Like sort, but also accepts a comparatorValueMapper which allows for sorting by more sophisticated means:

```javascript
sortBy(
    comparatorValueMapper: (value: V, key: K, iter: this) => C,
    comparator?: (valueA: C, valueB: C) => number
): TinyIter
```

Example:
```javascript
hitters.sortBy(hitter => hitter.avgHits)
```


##### isIndexed()

Returns boolean indicating if the wrapped element is index\ed from 0 (array or its equivalent).

```javascript
isIndexed(): boolean
```

##### isKeyed()

Returns boolean indicating if the wrapped element is keyed (object or its equivalent).

```javascript
isKeyed(): boolean
```

##### toIndexed()

Returns new TinyIter with collection transformed to the indexed version.

```javascript
toIndexed(): TinyIter
```

note:
All elements are now indexed ( incrementally from 0 ).

##### toKeyed()

Returns new TinyIter with collection transformed to the keyed version.

```javascript
toKeyed(): TinyIter
```

##### toRaw()

Returns internal representation of Collection.

```javascript
toRaw(): Array | {[key: string]: V}
```

Returns is either Array ( if the Collection is Indexed ) or an object ( if the Collection is Keyed ).

##### first()

Get the first element from the collection.

```javascript
first(): any
```

### Contribute

Tinyiter is [FOSS](https://en.wikipedia.org/wiki/Free_and_open-source_software) project, so you're welcome to be one of our [developers](https://github.com/saskaale/tinyiter/blob/master/AUTHORS) and making the library even better.

### Testing
We are using the [Chai Assertion Library](http://www.chaijs.com/) to help our library fully tested stable.

#### Contribution
Use [GitHub issues](https://github.com/saskaale/tinyiter/issues) for requests.

We actively welcome [pull requests](https://github.com/saskaale/tinyiter/pulls), feel free to contribute.

### Licence
This project is licenced by [Apache License 2.0](https://github.com/saskaale/tinyiter/blob/master/LICENSE).


