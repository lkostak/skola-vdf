/* Maturita 04: čisté modely kombinační logiky a přesná minimalizace
   úplně definované 3proměnné funkce bez don't-care stavů. */
(function(root){
  "use strict";
  const VARS=["A","B","C"];
  function bit(v){if(v!==0&&v!==1)throw Error("Vstup musí být 0 nebo 1");return v;}
  function bits3(i){if(!Number.isInteger(i)||i<0||i>7)throw Error("Řádek musí být 0–7");return [(i>>2)&1,(i>>1)&1,i&1];}
  function majority(a,b,c){a=bit(a);b=bit(b);c=bit(c);return Number(a+b+c>=2);}
  function truth3(kind){
    const out=[];
    for(let i=0;i<8;i++){const [a,b,c]=bits3(i);
      let y;
      if(kind==="majority")y=majority(a,b,c);
      else if(kind==="ab_or_c")y=Number((a&b)|c);
      else if(kind==="xor3")y=a^b^c;
      else if(kind==="a_and_not_b")y=a&(1-b);
      else if(kind==="at_least_one")y=Number(a|b|c);
      else throw Error("Neznámá funkce");
      out.push(y);
    }
    return out;
  }
  function checkTruth(array){
    if(!Array.isArray(array)||array.length!==8)throw Error("Tabulka musí mít přesně osm výstupů");
    array.forEach(bit);return array;
  }
  function minterm(i){const b=bits3(i);return b.map((v,k)=>v?VARS[k]:"¬"+VARS[k]).join("·");}
  function maxterm(i){const b=bits3(i);return "(" + b.map((v,k)=>v?"¬"+VARS[k]:VARS[k]).join("+") + ")";}
  function canonicalSOP(array){checkTruth(array);const i=array.flatMap((v,k)=>v?[k]:[]);return i.length===0?"0":i.length===8?"1":i.map(minterm).join(" + ");}
  function canonicalPOS(array){checkTruth(array);const i=array.flatMap((v,k)=>v?[]:[k]);return i.length===0?"1":i.length===8?"0":i.map(maxterm).join(" · ");}
  function cubeCovers(cube,row){
    const b=bits3(row);return cube.every((v,k)=>v===-1||v===b[k]);
  }
  function allCubes(){
    const values=[-1,0,1],cubes=[];
    for(const a of values)for(const b of values)for(const c of values)
      cubes.push({pattern:[a,b,c],covered:Array.from({length:8},(_,i)=>i).filter(i=>cubeCovers([a,b,c],i))});
    return cubes;
  }
  const CUBES=allCubes();
  function cubeText(pattern){
    const terms=pattern.flatMap((v,i)=>v===-1?[]:[v?VARS[i]:"¬"+VARS[i]]);
    return terms.length?terms.join("·"):"1";
  }
  function simplifyForOnes(ones){
    if(!ones.length)return {text:"0",groups:[]};
    if(ones.length===8)return {text:"1",groups:[{pattern:[-1,-1,-1],covered:[0,1,2,3,4,5,6,7],text:"1"}]};
    const allowed=new Set(ones);
    const valid=CUBES.filter(c=>c.covered.length&&c.covered.every(i=>allowed.has(i))).
      map(c=>({...c,literals:c.pattern.filter(v=>v!==-1).length,text:cubeText(c.pattern)}));
    // Z kandidátů odstraníme ty, které jsou obsažené ve větším validním implikantu.
    const primes=valid.filter(c=>!valid.some(d=>d.covered.length>c.covered.length&&c.covered.every(i=>d.covered.includes(i))));
    // Vyzkoušíme všechny podmnožiny maximálně 8 primárních implikantů (pro 3 proměnné).
    let best=null;
    for(let mask=1;mask<(1<<primes.length);mask++){
      const group=primes.filter((_,i)=>mask&(1<<i));
      const covered=new Set(group.flatMap(c=>c.covered));
      if(!ones.every(i=>covered.has(i)))continue;
      const score=[group.length,group.reduce((n,c)=>n+c.literals,0),group.map(c=>c.text).sort().join("|")];
      if(!best||score[0]<best.score[0]||(score[0]===best.score[0]&&score[1]<best.score[1])||
          (score[0]===best.score[0]&&score[1]===best.score[1]&&score[2]<best.score[2]))
        best={score,group};
    }
    if(!best)throw Error("Výraz nelze minimalizovat");
    const sorted=best.group.sort((a,b)=>a.text.localeCompare(b.text,"cs"));
    return {text:sorted.map(c=>c.text).join(" + "),groups:sorted.map(c=>({pattern:c.pattern.slice(),covered:c.covered.slice(),text:c.text}))};
  }
  function minimizeSOP(array){
    checkTruth(array);
    return simplifyForOnes(array.flatMap((v,i)=>v?[i]:[]));
  }
  function minimizePOS(array){
    checkTruth(array);
    const zeros=array.flatMap((v,i)=>v?[]:[i]);
    const inv=simplifyForOnes(zeros);
    if(inv.text==="0")return {text:"1",groups:[]};
    if(inv.text==="1")return {text:"0",groups:inv.groups};
    const negated=inv.groups.map(g=>{
      const ls=g.pattern.flatMap((v,i)=>v===-1?[]:[v?("¬"+VARS[i]):VARS[i]]);
      return "("+ls.join(" + ")+")";
    });
    return {text:negated.join(" · "),groups:inv.groups};
  }
  function kmap(array){
    checkTruth(array);
    const columns=[0,1,3,2]; // BC v Grayově pořadí 00,01,11,10.
    return [0,1].map(a=>columns.map(bc=>({a,bc:[(bc>>1)&1,bc&1].join(""),index:(a<<2)|bc,y:array[(a<<2)|bc]})));
  }
  function evalCube(pattern,a,b,c){
    const row=[bit(a),bit(b),bit(c)];
    return Number(pattern.every((p,i)=>p===-1||p===row[i]));
  }
  function evalSOPGroups(groups,a,b,c){
    if(!Array.isArray(groups))throw Error("Neplatné skupiny");
    return Number(groups.some(g=>evalCube(g.pattern,a,b,c)));
  }
  function mux2(d0,d1,select){d0=bit(d0);d1=bit(d1);select=bit(select);return select?d1:d0;}
  function mux4(data,s0,s1){
    if(!Array.isArray(data)||data.length!==4)throw Error("MUX 4:1 má čtyři datové vstupy");
    data.forEach(bit);s0=bit(s0);s1=bit(s1);
    return data[(s1<<1)|s0];
  }
  function demux1to4(data,s0,s1){
    data=bit(data);s0=bit(s0);s1=bit(s1);
    const out=[0,0,0,0];out[(s1<<1)|s0]=data;return out;
  }
  function decoder2(a,b,enable=1){
    a=bit(a);b=bit(b);enable=bit(enable);
    const outputs=[0,0,0,0];
    if(enable)outputs[(a<<1)|b]=1;
    return outputs;
  }
  function encoder4(onehot){
    if(!Array.isArray(onehot)||onehot.length!==4)throw Error("Kodér vyžaduje čtyři vstupy");
    onehot.forEach(bit);
    const hot=onehot.flatMap((v,i)=>v?[i]:[]);
    if(hot.length!==1)return {valid:false,reason:hot.length===0?"Žádný aktivní vstup":"Více aktivních vstupů"};
    return {valid:true,input:hot[0],out:[(hot[0]>>1)&1,hot[0]&1]};
  }
  function comparator2(a,b){
    if(!Number.isInteger(a)||a<0||a>3||!Number.isInteger(b)||b<0||b>3)throw Error("Komparátor očekává dvě dvoubitová čísla 0–3");
    return {equal:Number(a===b),greater:Number(a>b),less:Number(a<b)};
  }
  function halfAdder(a,b){a=bit(a);b=bit(b);return {sum:a^b,carry:a&b};}
  function fullAdder(a,b,cin){a=bit(a);b=bit(b);cin=bit(cin);
    return {sum:a^b^cin,carry:(a&b)|(a&cin)|(b&cin)};
  }
  function halfSubtractor(a,b){a=bit(a);b=bit(b);return {difference:a^b,borrow:(1-a)&b};}
  root.SkolaCombModel=Object.freeze({
    bits3,majority,truth3,canonicalSOP,canonicalPOS,minimizeSOP,minimizePOS,kmap,
    evalCube,evalSOPGroups,mux2,mux4,demux1to4,decoder2,encoder4,comparator2,halfAdder,fullAdder,halfSubtractor
  });
})(window);
