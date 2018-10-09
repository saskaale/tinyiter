import TinySeq from '../src';
import { assert, expect } from 'chai';

describe('TinySeq', () => {
  describe('#basics', () => {
    it("hasClassProperty", () => {
        let instance = TinySeq({});
        expect(instance)
            .to.be.an.instanceof(Object);
        expect(instance)
            .to.be.an.instanceof(TinySeq.class);
    });
    it("arrInit", () => {
        expect(TinySeq([1,{a:1,b:2},3]).toArray())
            .to.deep.equal([1,{a:1,b:2},3]);
    });
    it("objInit", () => {
        expect(TinySeq({a:1,b:{a:1,b:2},c:3}).toObject())
            .to.deep.equal({a:1,b:{a:1,b:2},c:3});
    });
    it("arrToObj", () => {
        expect(TinySeq([1,{a:1,b:2},3]).toObject())
            .to.deep.equal({'0':1,'1':{a:1,b:2},'2':3});
    });
    it("objToArr", () => {
        expect(TinySeq({'0':1,'1':{a:1,b:2},'2':3}).toArray())
            .to.deep.equal([1,{a:1,b:2},3]);
    });
    it("tinySeqInit", () => {
        expect(TinySeq(TinySeq({a:1,b:3,d:{a:1,b:2}})
            .map(e=>typeof e === 'number' ? e*2 : e))
            .toArray())
            .to.deep.equal([2,6,{a:1,b:2}]);
    });
  });

  describe('#iterator', () => {
    it("arr", () => {
        expect([...TinySeq([1,2,5])]).to.deep.equal([1,2,5]);
    });

    it("obj", () => {
        expect([...TinySeq({a:1,b:7,c:5})]).to.deep.equal([1,7,5]);
    });
  });



  const sortDesc = (a, b) => {
    if(a > b)
        return -1;
    if(b > a)
        return 1;
    return 0;
  }

  describe('#sortArr', () => {
    it("arrSort", () => {
        expect(TinySeq([7,2,5]).sort().toArray()).to.deep.equal([2,5,7]);
    });

    it("arrSortFunc", () => {
        expect(TinySeq([7,2,5]).sort(sortDesc).toArray()).to.deep.equal([7,5,2]);
    });
  });

  describe('#sortObj', () => {
    it("objSort", () => {
        expect(TinySeq({a:7,b:2,c:5}).sort().toObject()).to.deep.equal({b:2,c:5,a:7});
    });

    it("objSortFunc", () => {
        expect(TinySeq({a:7,b:2,c:5}).sort(sortDesc).toObject()).to.deep.equal({a:7,c:5,b:2});
    });
  });

  describe('#sortBy', () => {
    const inverse = a => -a;

    it("sortBy", () => {
        expect(TinySeq({a:7,b:2,c:5}).sortBy(inverse).toArray()).to.deep.equal([7,5,2]);
    });
  });


  describe('#indexed', () => {
    it("arr", () => {
        const data = [1,2,3];
        expect(TinySeq(data).isIndexed())
            .to.equal(true);
        expect(TinySeq(data).isKeyed())
            .to.equal(false);
    });
    it("obj", () => {
        const data = {'a': 0, 'c': 1, 'd': 2};
        expect(TinySeq(data).isIndexed())
            .to.equal(false);
        expect(TinySeq(data).isKeyed())
            .to.equal(true);
    });
  });


  describe('#size', () => {
    it("array", () => {
        expect(TinySeq([0,6,1]).size()).to.eq(3);
        expect(TinySeq([0,0,0,0]).size()).to.eq(4);
    });
    it("object", () => {
        expect(TinySeq({a:0,c:6,b:1}).size()).to.eq(3);
        expect(TinySeq({aa:0,b:0,c:0,aaa:0}).size()).to.eq(4);
    });
  });

  describe('#every', () => {
    it("empty", () => {
        expect(TinySeq([]).every(() => false)).to.eq(true);
    });
    it("nonvalid", () => {
        expect(TinySeq([1,2,5,10,132,13]).every(e => e>10)).to.eq(false);
    });
    it("valid", () => {
        expect(TinySeq([11,12,15,10,132,13]).every(e => e>=10)).to.eq(true);
    });
  });

  describe('#find', () => {
    it("first", () => {
        expect(TinySeq([1,2,4,5]).find((e) => e>=2)).to.eq(2);
    });
    it("empty", () => {
        expect(TinySeq([1,2,4,5]).find(() => false)).to.eq(undefined);
    });
    it("key", () => {
        expect(TinySeq([1,2,5,10,132,13]).find((_,k) => k===2)).to.eq(5);
    });
    it("obj", () => {
        expect(TinySeq({a:1,b:14,d:5,e:6}).find((_, k) => k==='b')).to.eq(14);
    });
  });

  describe('#findLast', () => {
    it("first", () => {
        expect(TinySeq([1,2,4,5]).findLast((e) => e>=2)).to.eq(5);
    });
    it("empty", () => {
        expect(TinySeq([1,2,4,5]).findLast(() => false)).to.eq(undefined);
    });
    it("key", () => {
        expect(TinySeq([1,2,5,10,132,13]).findLast((_,k) => k===2)).to.eq(5);
    });
    it("obj", () => {
        expect(TinySeq({a:1,b:14,d:5,e:6}).findLast((_, k) => k==='b')).to.eq(14);
    });
  });

  describe('#some', () => {
    it("empty", () => {
        expect(TinySeq([]).some(() => true)).to.eq(false);
    });
    it("valid", () => {
        expect(TinySeq([1,2,5,10,132,13]).some(e => e>10)).to.eq(true);
    });
    it("nonvalid", () => {
        expect(TinySeq([11,12,15,10,132,13]).some(e => e<10)).to.eq(false);
    });
  });

  describe('#mapForeach', () => {
    it("arrMap", () => {
        expect(TinySeq([1,{a:1,b:2},3])
            .map((e, k)=>[k, typeof e === 'number' ? e*2 : e])
            .toArray())
            .to.deep.equal([[0,2],[1,{a:1,b:2}],[2,6]]);
    });
    it("objMap", () => {
        expect(TinySeq({a:1,d:{a:1,b:2},b:3})
            .map((e, k)=>[k, typeof e === 'number' ? e*2 : e])
            .toObject())
            .to.deep.equal({a:['a', 2],b:['b', 6],d:['d', {a:1,b:2}]});
    });

    it("objForeach", () => {
        let data = {a:1,d:{a:1,b:2},c:3};
        let keys = [];
        let values = [];
        TinySeq(data).forEach((v,k) => {
            keys.push(k);
            values.push(v);
        });
        expect(keys).to.deep.equal(Object.keys(data));
        expect(values).to.deep.equal(Object.values(data));
    });
    it("arrForeach", () => {
        let data = [1,{a:1,b:2},3];
        let keys = [];
        let values = [];
        TinySeq(data).forEach((v,k) => {
            keys.push(k);
            values.push(v);
        });
        expect(values).to.deep.equal(data);
        expect(keys).to.deep.equal([0,1,2]);
    });
  });

  describe('#reduce', () => {
    it("skipFirst", () => {
        expect(TinySeq({a:4,c:7,b:10}).reduce((prev, cur) => prev+':'+cur))
            .to.equal('4:7:10');
    });
    it("value", () => {
        expect(TinySeq({a:4,c:7,b:10}).reduce((prev, cur) => prev+cur+',', 'val ='))
            .to.equal('val =4,7,10,');
    });
    it("keys", () => {
        expect(TinySeq({a:4,c:7,b:10}).reduce((prev, _, key) => prev+key+',', 'val ='))
            .to.equal('val =a,c,b,');
    });
  })

  describe('#advanced', () => {
    it("mapValues", () => {
        expect(TinySeq([4,7,10]).mapValues(([k,v]) => ([k*2, v*3])).toObject())
            .deep.to.equal({'0':12, '2':21, '4': 30});
    });

    it("arrConcat", () => {
        expect(TinySeq([4,7,10]).concat([4,1], [-2]).toArray())
            .deep.to.equal([4,7,10,4,1,-2]);
    });

    it("objConcat", () => {
        expect(TinySeq({a:4,b:7,c:10}).concat({d:4,e:1}, {f:-2}).toObject())
            .deep.to.equal({a:4,b:7,c:10,d:4,e:1,f:-2});
    });

    it("mixConcat", () => {
        expect(TinySeq([4,7,10]).concat({d:4,e:1}, {f:-2}).toObject())
            .deep.to.equal({'0':4,'1':7,'2':10,d:4,e:1,f:-2});

        expect(TinySeq({a:4,b:7,c:10}).concat({d:4,e:1}, [-2]).toObject())
            .deep.to.equal({a:4,b:7,c:10,d:4,e:1,'0':-2});
    });

  });

});
