/* Maturita 03: sdílené bezstavové logické jádro.
 * Funkce modelují ideální kombinační logiku, nikoli časové chování reálných součástek. */
(function(root){
"use strict";
const NAMES=["NOT","AND","OR","NAND","NOR","XOR","XNOR"];
function bit(v){if(v!==0&&v!==1)throw Error("Logická proměnná musí mít hodnotu 0 nebo 1");return v;}
function gate(type,a,b){
 a=bit(a);if(!NAMES.includes(type))throw Error("Neznámá logická funkce: "+type);
 if(type==="NOT")return 1-a;
 b=bit(b);
 switch(type){
 case "AND":return a&b;
 case "OR":return a|b;
 case "NAND":return 1-(a&b);
 case "NOR":return 1-(a|b);
 case "XOR":return a^b;
 case "XNOR":return 1-(a^b);
 }
}
function table(type){
 return type==="NOT"?[{a:0,y:gate(type,0)},{a:1,y:gate(type,1)}]:
 [[0,0],[0,1],[1,0],[1,1]].map(([a,b])=>({a,b,y:gate(type,a,b)}));
}
function expression(id,a,b,c){
 a=bit(a);b=bit(b);c=bit(c);
 switch(id){
 case "AB_OR_C":return ((a&b)|c);
 case "A_AND_BORC":return (a&(b|c));
 case "NOT_AB":return 1-(a&b);
 case "MOTOR":return (a&b&(1-c)); // A povel, B kryt zavřen, C porucha
 case "MAJORITY":return ((a&b)|(a&c)|(b&c)); // jen ukázka, design až otázka 04
 default:throw Error("Neznámý výraz");
 }
}
function table3(id){
 let out=[];for(let a=0;a<=1;a++)for(let b=0;b<=1;b++)for(let c=0;c<=1;c++)out.push({a,b,c,y:expression(id,a,b,c)});
 return out;
}
function deMorgan(a,b){
 a=bit(a);b=bit(b);
 return {
   notAnd:1-(a&b),orOfNegations:(1-a)|(1-b),
   notOr:1-(a|b),andOfNegations:(1-a)&(1-b)
 };
}
function throughUniversal(family,target,a,b){
 if(!["NAND","NOR"].includes(family))throw Error("Pouze NAND a NOR");
 if(!["NOT","AND","OR"].includes(target))throw Error("Demonstrujeme jen NOT, AND, OR");
 a=bit(a);b=target==="NOT"?0:bit(b);
 const n=(x,y)=>gate(family,x,y);
 if(family==="NAND"){
  if(target==="NOT")return n(a,a);
  if(target==="AND"){const x=n(a,b);return n(x,x);}
  return n(n(a,a),n(b,b));
 }
 if(target==="NOT")return n(a,a);
 if(target==="OR"){const x=n(a,b);return n(x,x);}
 return n(n(a,a),n(b,b));
}
function contact(series,a,b){
 a=bit(a);b=bit(b);
 return series==="series"?(a&b):series==="parallel"?(a|b):(()=>{throw Error("Neznámé zapojení kontaktů");})();
}
function activeLow(raw){return 1-bit(raw);}
root.SkolaLogicModel=Object.freeze({gate,table,expression,table3,deMorgan,throughUniversal,contact,activeLow,NAMES});
})(window);
