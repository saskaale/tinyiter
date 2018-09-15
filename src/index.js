function isObject(v){
      return v !== null
            && typeof v === 'object'
            && Array.isArray(v) === false;
};

function isArray(v){
  return Array.isArray(v);
}

const mapFilter = (_d, map, filter) => {
  if(isArray(_d)){
    //array
    let arr = _d;
    if(filter)
      arr = arr.filter(filter);
    if(map)
    arr = arr.map(map);
    return new Seq(arr);
  }else if(isObject(_d)){
    //object
    let r = {};
    for(let k in _d){
      if(filter && !filter(_d[k], k, _d))
        continue;
      r[k] = map ? map(_d[k], k, _d) : _d[k];
    }
    return new Seq(r);
  }
  throw new Error('Unreachable');
}



class Seq{
  constructor(_d){
    //so we can chain Seq
    if(_d && isObject(_d) && _d instanceof Seq && _d.toRaw)
      _d = _d.toRaw();
    this._d = _d;
  }

  _isObject(){
    return isObject(this._d);
  }

  _isArray(){
    return isArray(this._d);
  }

  forEach(f){
    this.map(f);
  }

  toObject(){
    if(this._isObject()){
      return this._d;
    }
    let r = {};
    this.forEach((v,k) => {
      r[k] = v;
    });
    return r;
  }

  toArray(){
    if(this._isArray()){
      return this._d;
    }else if(this._isObject()){
      return Object.values(this._d);
    }
    throw new Error('Unreachable');
  }

  first(){
    if(this._isArray()){
      return this._d[0];
    }else if(this._isObject()){
      //object
      for(let k in this._d){
        return _d[k];
      }
      return undefined;
    }

    throw new Error('Unreachable');
  }

  filter(f) {
    return mapFilter(this._d, undefined, f);
  }
  map(f){
    return mapFilter(this._d, f);
  }

  toKeyed(){
    return new Seq(this.toObject());
  }
  toIndexed(){
    return new Seq(this.toArray());
  }
  isKeyed(){ 
    return this._isObject();
  }
  isIndexed(){
    return this._isArray();
  }
  toRaw(){
    return this._d;
  }
  mapValues(f){
    let ret = {};
    this.forEach((v, k) => {
      let [newk, newv] = f([k,v]);
      ret[newk] = newv;
    });
    return new Seq(ret);
  }
  *[Symbol.iterator]() {
    if(this._isArray()){
      for(let e of this._d){
        yield e;
      }
    }else if(this._isObject()){
      for(let e in this._d){
        yield this._d[e];
      }
    }else{
      throw new Error('Unreachable');
    }
  }

  size(){
    if(this._isArray())
      return this._d.length;
    else if(this._isObject())
      return Object.keys(this._d).length;
    throw new Error('Unreachable');
  }

  concat(...args){
    args = new Seq(args).map(e=>createSeq(e)).toArray();

    let indexed = args.reduce(
        (prev, cur) => prev && cur.isIndexed(),
        this.isIndexed()
      );

    if(indexed){
      let d = this.toArray();
      args.forEach(e => {
        d = d.concat(e.toArray());
      });
      return new Seq(d);
    }else{
      let d = {};
      const addEls = (e,k) => {d[k] = e;};
      this.forEach(addEls);
      args.forEach((e) => e.forEach(addEls));
      return new Seq(d);
    }
  }

};

function createSeq(_d){
  if(_d && isObject(_d) && _d !== null && _d instanceof Seq)
    return _d;
  return new Seq(_d);
}
createSeq.class = Seq;

function isSeq(e){
  return e instanceof Seq;
}

export default createSeq;
export {isObject, isSeq};
