/* Maturitní otázka 02: čisté výukové modely kódů.
 * Pouze celé nezáporné hodnoty v definovaných rozsazích.
 * UI a učitelský klíč jsou oddělené. */
(function(root) {
  "use strict";
  function assertInt(n,min,max,label){
    if (!Number.isSafeInteger(n)||n<min||n>max) throw Error((label||"Hodnota")+" musí být celé číslo v rozsahu "+min+" až "+max);
    return n;
  }
  function bits(n,width){return assertInt(n,0,2**width-1,"Číslo").toString(2).padStart(width,"0");}
  function encodeBCD(raw) {
    var s=String(raw).trim();
    if(!/^\d{1,10}$/.test(s))throw Error("BCD očekává 1 až 10 desítkových číslic 0–9");
    return {digits:s,words:s.split("").map(function(d){return bits(Number(d),4);}),groups:s.split("").map(function(d){return bits(Number(d),4);}).join(" ")};
  }
  function decodeBCD(raw) {
    var s=String(raw).replace(/\s+/g,"");
    if(!/^[01]+$/.test(s)||s.length%4!==0||s.length===0)throw Error("BCD musí tvořit úplné skupiny po čtyřech bitech");
    var digits=[];
    for(var i=0;i<s.length;i+=4){var v=parseInt(s.slice(i,i+4),2);if(v>9)throw Error("Skupina "+s.slice(i,i+4)+" není platná číslice BCD 8421");digits.push(v);}
    return digits.join("");
  }
  function encodeGray(n,width) {width=width||4;assertInt(width,1,12,"Počet bitů");assertInt(n,0,2**width-1,"Binární číslo");return bits(n^ (n>>1),width);}
  function decodeGray(gray) {
    var s=String(gray).trim();
    if(!/^[01]{1,12}$/.test(s))throw Error("Zadej 1 až 12 bitů Grayova kódu");
    var g=parseInt(s,2),b=g;
    while(g>>=1)b^=g;
    return {decimal:b,binary:bits(b,s.length),gray:s};
  }
  function hammingDistance(a,b){if(typeof a!=="string"||typeof b!=="string"||a.length!==b.length||!/^[01]+$/.test(a)||!/^[01]+$/.test(b))throw Error("Oba vzory musí mít stejnou délku a obsahovat jen 0 nebo 1");var diff=0;for(var i=0;i<a.length;i++)if(a[i]!==b[i])diff++;return diff;}
  function asciiCodes(raw) {
    var s=String(raw);
    if(!s||s.length>64)throw Error("Zadej 1 až 64 znaků ASCII");
    var out=[];
    for(var i=0;i<s.length;i++){var code=s.charCodeAt(i);if(code>127)throw Error("Znak „"+s[i]+"“ není v základní sedmibitové ASCII; použij Unicode/UTF-8");out.push({char:s[i],decimal:code,hex:code.toString(16).toUpperCase().padStart(2,"0"),bits:bits(code,8)});}
    return out;
  }
  function parity(raw,type) {
    var s=String(raw).trim().replace(/\s+/g,"");
    if(!/^[01]{1,32}$/.test(s))throw Error("Zadej 1 až 32 datových bitů");
    if(type!=="even"&&type!=="odd")throw Error("Zvol sudou nebo lichou paritu");
    var ones=(s.match(/1/g)||[]).length;
    var bit=(ones%2=== (type==="even"?0:1))?0:1;
    return {data:s,ones:ones,parityBit:bit,codeword:s+bit,kind:type};
  }
  function parityValid(raw,type) {
    var s=String(raw).trim().replace(/\s+/g,"");
    if(!/^[01]{2,33}$/.test(s))throw Error("Zadej datové bity včetně paritního");
    var count=(s.match(/1/g)||[]).length;
    return type==="even"?count%2===0:type==="odd"?count%2===1:false;
  }
  function utf8Bytes(text){
    if(typeof TextEncoder==="undefined")throw Error("Prohlížeč nemá podporu TextEncoder");
    var s=String(text);if(!s||[...s].length>30)throw Error("Zadej 1 až 30 znaků");
    return Array.from(new TextEncoder().encode(s));
  }
  function byteHex(arr){return arr.map(function(v){return v.toString(16).toUpperCase().padStart(2,"0");}).join(" ");}
  function imageRaw(width,height,bitsPerPixel){
    assertInt(width,1,20000,"Šířka");assertInt(height,1,20000,"Výška");assertInt(bitsPerPixel,1,64,"Bitů na pixel");
    return width*height*bitsPerPixel/8;
  }
  function audioPcm(rate,bitsPerSample,channels,seconds){
    assertInt(rate,1,384000,"Vzorkování");assertInt(bitsPerSample,1,64,"Bitová hloubka");assertInt(channels,1,32,"Kanály");
    if(typeof seconds!=="number"||!Number.isFinite(seconds)||seconds<=0||seconds>86400)throw Error("Doba musí být kladná a nejvýše 86400 sekund");
    return rate*bitsPerSample*channels*seconds/8;
  }
  function videoRaw(width,height,bitsPerPixel,fps,seconds){
    assertInt(fps,1,240,"Snímků za sekundu");
    if(typeof seconds!=="number"||!Number.isFinite(seconds)||seconds<=0||seconds>86400)throw Error("Doba musí být kladná");
    return imageRaw(width,height,bitsPerPixel)*fps*seconds;
  }
  root.SkolaCodeModel=Object.freeze({bits:bits,encodeBCD:encodeBCD,decodeBCD:decodeBCD,encodeGray:encodeGray,decodeGray:decodeGray,hammingDistance:hammingDistance,asciiCodes:asciiCodes,parity:parity,parityValid:parityValid,utf8Bytes:utf8Bytes,byteHex:byteHex,imageRaw:imageRaw,audioPcm:audioPcm,videoRaw:videoRaw});
})(window);
