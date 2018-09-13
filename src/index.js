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
    return new TinySeq(arr);
  }else if(isObject(_d)){
    //object
    let r = {};
    for(let k in _d){
      if(filter && !filter(_d[k], k, _d))
        continue;
      r[k] = map ? map(_d[k], k, _d) : _d[k];
    }
    return new TinySeq(r);
  }
  throw new Error('Unreachable');
}



class TinySeq{
  constructor(_d){
    //so we can chain TinySeq
    if(_d && isObject(_d) && _d instanceof TinySeq && _d.toRaw)
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
    return new TinySeq(this.toObject());
  }
  toIndexed(){
    return new TinySeq(this.toArray());
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
    return new TinySeq(ret);
  }

  size(){
    if(this._isArray())
      return this._d.length;
    else if(this._isObject())
      return Object.keys(this._d).length;
    throw new Error('Unreachable');
  }

  concat(...args){
    args = new TinySeq(args).map(e=>createSeq(e)).toArray();

    let indexed = args.reduce(
        (prev, cur) => prev && cur.isIndexed(),
        this.isIndexed()
      );

    if(indexed){
      let d = this.toArray();
      args.forEach(e => {
        d = d.concat(e.toArray());
      });
      return new TinySeq(d);
    }else{
      let d = {};
      const addEls = (e,k) => {d[k] = e;};
      this.forEach(addEls);
      args.forEach((e) => e.forEach(addEls));
      return new TinySeq(d);
    }
  }

};

function createSeq(_d){
  if(_d && isObject(_d) && _d !== null && _d instanceof TinySeq)
    return _d;
  return new TinySeq(_d);
}
createSeq.class = TinySeq;

function isSeq(e){
  return e instanceof TinySeq;
}

export default createSeq;
export {isObject, isSeq};
