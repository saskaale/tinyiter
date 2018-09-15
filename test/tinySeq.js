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
    })
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
