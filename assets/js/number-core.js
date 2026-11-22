/* Maturitní otázka 01: přesné celočíselné operace v rozsahu 0...65535.
   Čisté funkce lze použít ve výkladu i pozdější samostatné Laboratoři.
   Desetinné zlomky a 32/64bitové hodnoty tento model nezpracovává. */
(function(root) {
  "use strict";
  var DIGITS="0123456789ABCDEF";
  function integer(value) {return Number.isSafeInteger(value);}
  function validBase(base) {return [2,8,10,16].includes(Number(base));}
  function parseNumber(raw,base) {
    base=Number(base); if(!validBase(base))throw Error("Neplatný základ soustavy");
    var t=String(raw).trim().toUpperCase().replace(/\s+/g,"");
    if(!t)throw Error("Zadej celé nezáporné číslo");
    var n=0;
    for(var i=0;i<t.length;i++) {
      var digit=DIGITS.indexOf(t[i]);
      if(digit<0||digit>=base)throw Error("Číslice "+t[i]+" není v soustavě o základu "+base+" povolena");
      n=n*base+digit;
      if(!Number.isSafeInteger(n)||n>65535)throw Error("Číslo je mimo rozsah výukového převodníku 0 až 65 535");
    }
    return n;
  }
  function formatNumber(value,base) {
    base=Number(base);
    if(!validBase(base)||!integer(value)||value<0||value>65535)throw Error("Číslo mimo rozsah převodníku");
    return value.toString(base).toUpperCase();
  }
  function expansions(value,base) {
    base=Number(base);var repr=formatNumber(value,base);
    return repr.split("").map(function(c,i){
      var exp=repr.length-1-i; return { digit:c, digitValue:DIGITS.indexOf(c), exponent:exp, weight:base**exp, contribution:DIGITS.indexOf(c)*(base**exp) };
    });
  }
  function unsignedRange(bits) {
    bits=Number(bits);
    if(!integer(bits)||bits<1||bits>16)throw Error("Použij 1 až 16 bitů");
    return {bits:bits,count:2**bits,min:0,max:(2**bits)-1};
  }
  function signedRange(bits) {
    var r=unsignedRange(bits);
    return {bits:r.bits,count:r.count,min:-(2**(r.bits-1)),max:(2**(r.bits-1))-1};
  }
  function asSigned(unsignedValue,bits) {
    var r=unsignedRange(bits);
    if(!integer(unsignedValue)||unsignedValue<0||unsignedValue>r.max)throw Error("Bitový vzor překračuje šířku");
    var sign=2**(r.bits-1);
    return unsignedValue>=sign?unsignedValue-r.count:unsignedValue;
  }
  function encodeTwos(value,bits) {
    var s=signedRange(bits);
    if(!integer(value)||value<s.min||value>s.max)throw Error("Podepsaná hodnota je mimo rozsah");
    return value<0?s.count+value:value;
  }
  function bitSet(value,index) {
    if(!integer(value)||value<0||value>255||!integer(index)||index<0||index>7)throw Error("Vyžaduje se bajt a index 0 až 7");
    return value^(2**index);
  }
  function maskTest(value,index) {
    if(!integer(value)||value<0||value>255||!integer(index)||index<0||index>7)throw Error("Vyžaduje se bajt a index 0 až 7");
    var mask=2**index;
    return {mask:mask,active:(value&mask)!==0,masked:value&mask};
  }
  function add8(a,b) {
    if(!integer(a)||!integer(b)||a<0||b<0||a>255||b>255)throw Error("Sčítat lze dva osmibitové unsigned operandy");
    var sum=a+b;
    return {sum:sum,stored:sum%256,carry:sum>=256};
  }
  root.SkolaNumberModel=Object.freeze({
    parseNumber:parseNumber,formatNumber:formatNumber,expansions:expansions,
    unsignedRange:unsignedRange,signedRange:signedRange,asSigned:asSigned,
    encodeTwos:encodeTwos,bitSet:bitSet,maskTest:maskTest,add8:add8
  });
})(window);
