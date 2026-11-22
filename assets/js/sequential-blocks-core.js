/* Otazka 06: didakticke diskretni modely registru, citacu a CTU.
   Zmena stavu nastava jen na zvolene hrane, krome vyrazne oznaceneho RESET.
   Model nepredstira analogove zpozdeni asynchronnich obvodu. */
(function(root) {
  "use strict";
  const int=(v,min,max,label)=>{
    if(!Number.isInteger(v)||v<min||v>max)throw Error((label||"Hodnota")+" musi byt cele cislo od "+min+" do "+max);
    return v;
  };
  const bit=v=>int(v,0,1,"Bit");
  const mask=w=>(2**int(w,1,16,"Sirka"))-1;
  function bits(value,width=4){return int(value,0,mask(width),"Registr").toString(2).padStart(width,"0");}
  // Konvence: SHL posun k vyssimu bitu, novy bit v b0; SHR opacne.
  function registerStep(value,action,{width=4,serial=0,load=0}={}) {
    let m=mask(width);int(value,0,m,"Registr");bit(serial);int(load,0,m,"Paralelni vstup");
    let output=null,next=value;
    switch(action) {
      case "HOLD":break;
      case "CLEAR":next=0;break;
      case "LOAD":next=load;break;
      case "SHL":output=(value>>(width-1))&1;next=((value<<1)&m)|serial;break;
      case "SHR":output=value&1;next=(value>>1)|(serial<<(width-1));break;
      case "ROL":output=(value>>(width-1))&1;next=((value<<1)&m)|output;break;
      case "ROR":output=value&1;next=(value>>1)|(output<<(width-1));break;
      default:throw Error("Neznama operace registru");
    }
    return {before:value,after:next,output,beforeBits:bits(value,width),afterBits:bits(next,width),width};
  }
  function registerWave(initial,actions,{width=4,serial=0,load=0}={}) {
    let value=int(initial,0,mask(width),"Vychozi hodnota");
    const result=[{edge:0,bits:bits(value,width),value,action:"START",serialOut:null}];
    actions.forEach((action,i)=>{
      const r=registerStep(value,action,{width,serial,load});value=r.after;
      result.push({edge:i+1,bits:r.afterBits,value,action,serialOut:r.output});
    });
    return result;
  }
  // Synch. abstraktni citac: udalost je vybrana hrana CLK.
  // carry/borrow odpovida skutecnemu prechodu pres posledni hodnotu.
  function counterStep(value,{modulus=16,direction="up",event=true,reset=false,load=null}={}) {
    int(modulus,2,65536,"Modulo");int(value,0,modulus-1,"Aktualni stav");
    if(direction!=="up"&&direction!=="down")throw Error("Smer musi byt up/down");
    let next=value,carry=false,borrow=false;
    if(reset)next=0;
    else if(load!==null)next=int(load,0,modulus-1,"LOAD");
    else if(event) {
      if(direction==="up"){carry=value===modulus-1;next=(value+1)%modulus;}
      else {borrow=value===0;next=(value+modulus-1)%modulus;}
    }
    return {before:value,after:next,carry,borrow,wrapped:carry||borrow,modulus,direction};
  }
  function counterSequence({modulus=16,start=0,direction="up",steps=16}={}) {
    int(modulus,2,256,"Modulo");int(start,0,modulus-1,"Start");int(steps,0,128,"Kroky");
    let value=start;const result=[{edge:0,value,carry:0,borrow:0}];
    for(let i=1;i<=steps;i++){const r=counterStep(value,{modulus,direction});value=r.after;result.push({edge:i,value,carry:Number(r.carry),borrow:Number(r.borrow)});}
    return result;
  }
  function requiredBits(modulus){int(modulus,2,65536,"Modulo");return Math.ceil(Math.log2(modulus));}
  function countFlags(value,width=4) {
    int(value,0,mask(width),"Hodnota");
    return Array.from({length:width},(_,i)=>(value>>i)&1);
  }
  // Idealni 4bitovy ripple conceptual sequence: nove vyvody se ustaluji postupne.
  // Tato posloupnost ukazuje, proc muze dekodovani behem prechodu zachytit hazard.
  function rippleTransition(value,width=4) {
    int(value,0,mask(width),"Stav");
    const old=Array.from({length:width},(_,i)=>(value>>i)&1);
    const next=(value+1)&mask(width);
    const stable=Array.from({length:width},(_,i)=>(next>>i)&1);
    let current=old.slice();
    const stages=[{stage:"Pred hranou",bits:old.slice().reverse().join(""),value}];
    for(let i=0;i<width;i++){
      const shouldToggle=i===0||(old.slice(0,i).every(v=>v===1));
      if(!shouldToggle)break;
      current[i]=1-current[i];
      stages.push({stage:"Po stupni Q"+i,bits:current.slice().reverse().join(""),
        value:current.reduce((n,b,k)=>n+(b<<k),0)});
    }
    return {old:value,next,stable:stable.reverse().join(""),stages};
  }
  // IEC CTU zjednoduseni: CU se pocita pouze pri nabezne hrane.
  // Q se aktivuje, kdyz CV >= PV. Maximalni kapacita simulace 999.
  function ctuStep(state,{cu=0,reset=false,preset=5}={}){
    bit(cu);int(preset,1,999,"PV");if(!state||!Number.isInteger(state.cv)||state.cv<0||state.cv>999)throw Error("Neplatny stav CTU");
    const prev=bit(state.prevCU||0);
    let cv=state.cv,edge=Boolean(cu&&!prev);
    if(reset){cv=0;edge=false;}
    else if(edge)cv=Math.min(999,cv+1);
    return {cv,prevCU:cu,q:Number(cv>=preset),counted:edge,preset};
  }
  root.SkolaSequentialModel=Object.freeze({bits,registerStep,registerWave,counterStep,counterSequence,requiredBits,countFlags,rippleTransition,ctuStep});
})(window);