function isObject(v){
      return v !== null
            && typeof v === 'object'
            && Array.isArray(v) === false;
};

function isArray(v){
  return Array.isArray(v);
}

const UNREACHABLE = () => {
  throw new Error("Unreachable");
};

const bindContext = (f, context) => 
  context ?
      f.bind(context)
      :
      f;


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
  UNREACHABLE();
}

const cmp = (a,b) => (a < b) ? -1 : ( a > b ? 1 : 0)


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

  forEach(f, context){
    this.map(f, context);
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
    UNREACHABLE();
  }

  reduce(f, reduction, context){
    f = bindContext(f, context);

    this.forEach((v,k) => {
      if(reduction === undefined){
        reduction = v;
      }else{
        reduction = f(reduction, v, k);
      }
    });
    return reduction;
  }

  findIndex(f, context){
    f = bindContext(f, context);
    if(this._isArray()){
      return this._d.findIndex(f);
    }else if(this._isObject()){
      for(let e in this._d){
        if(f(this._d[e], e)){
          return e;
        }
      }
      return -1;
    }else{
      UNREACHABLE();
    }
  }

  find(f, context){
    return this._d[this.findIndex(f, context)];
  }

  findLast(f, context){
    let ret = undefined;
    this.forEach((v,k) => {
      if(f(v,k)){
        ret = v;
      }
    }, context);
    return ret;
  }


  some(f, context){
    f = bindContext(f, context);
    return this.reduce((prev, v, k) => prev || f(v,k), false);
  }

  every(f, context){
    f = bindContext(f, context);
    return this.reduce((prev, v, k) => prev && f(v,k), true);
  }

  filter(f, context) {
    f = bindContext(f, context);
    return mapFilter(this._d, undefined, f);
  }
  map(f, context){
    f = bindContext(f, context);
    return mapFilter(this._d, f);
  }
  sort(comparator = cmp){
    if(this._isArray()){
      return new Seq([...this._d].sort(comparator));
    }else if(this._isObject()){
      const _d = this._d;
      const compareVals = (k1, k2) => {
        const v1 = _d[k1];
        const v2 = _d[k2];
        return comparator(v1, v2);
      }
      let newd = {};
      let keys = Object.keys(this._d)
                  .sort(compareVals)
                  .forEach((k) => {
                    newd[k] = _d[k];
                  });
      return new Seq(newd);
    }

    UNREACHABLE();
  }
  sortBy(getValue, comparator = cmp){
    const compareBy = (a, b) => 
      comparator(getValue(a), getValue(b));
    return this.sort(compareBy);
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
  mapValues(f, context){
    f = bindContext(f, context);

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
      UNREACHABLE();
    }
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

    UNREACHABLE();
  }

  size(){
    if(this._isArray())
      return this._d.length;
    else if(this._isObject())
      return Object.keys(this._d).length;

    UNREACHABLE();
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
