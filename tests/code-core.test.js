/* node --test tests/code-core.test.js */
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm"),path=require("node:path");
const context={window:{},TextEncoder};vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname,"../assets/js/code-core.js"),"utf8"),context);
const m=context.window.SkolaCodeModel;

test("BCD uchovává jednotlivé desítkové číslice, ne binární hodnotu jako celek",()=>{
 assert.equal(m.encodeBCD("59").groups,"0101 1001");
 assert.equal(m.encodeBCD("472").groups,"0100 0111 0010");
 assert.equal(m.encodeBCD("007").groups,"0000 0000 0111");
 assert.equal(m.decodeBCD("0100 0010"),"42");
 assert.equal(m.decodeBCD("0000 0000 0111"),"007");
 assert.throws(()=>m.decodeBCD("1011"),/platná číslice/);
 assert.throws(()=>m.decodeBCD("1010"),/platná číslice/);
 assert.throws(()=>m.encodeBCD("1A"),/desítkových/);
 assert.throws(()=>m.decodeBCD("001"),/čtyřech/);
});
test("Grayův kód 4 bity: všechny sousední stavy včetně hranice se liší právě jedním bitem",()=>{
 assert.equal(m.encodeGray(7,4),"0100");
 assert.equal(m.encodeGray(8,4),"1100");
 assert.equal(m.hammingDistance(m.bits(7,4),m.bits(8,4)),4);
 for(let i=0;i<16;i++){
  let a=m.encodeGray(i,4),b=m.encodeGray((i+1)%16,4);
  assert.equal(m.hammingDistance(a,b),1,"Gray "+i+" -> "+((i+1)%16));
  assert.equal(m.decodeGray(a).decimal,i);
 }
});
test("ASCII: základní text a ne-ASCII znak se správně odmítnou",()=>{
 const codes=m.asciiCodes("A0");
 assert.equal(codes[0].hex,"41");
 assert.equal(codes[1].hex,"30");
 assert.equal(m.asciiCodes("59").map(x=>x.hex).join(" "),"35 39");
 assert.throws(()=>m.asciiCodes("Č"),/není v základní/);
});
test("Unicode/UTF-8: česká Č zabírá dvě UTF-8 bajty",()=>{
 assert.equal(m.byteHex(m.utf8Bytes("Č")),"C4 8C");
 assert.equal(m.byteHex(m.utf8Bytes("Čaj")),"C4 8C 61 6A");
 assert.equal(m.utf8Bytes("A").length,1);
});
test("Sudá a lichá parita pro 1010110",()=>{
 assert.equal(m.parity("1010110","even").parityBit,0);
 assert.equal(m.parity("1010110","odd").parityBit,1);
 assert.equal(m.parityValid("10101100","even"),true);
 assert.equal(m.parityValid("00101100","even"),false); // Jednobitová chyba.
 assert.equal(m.parityValid("01001100","even"),true);  // Dvoubitová změna může uniknout.
 assert.throws(()=>m.parity("10101X0","even"),/datových/);
});
test("Nezkomprimovaný obraz, PCM a video",()=>{
 assert.equal(m.imageRaw(640,480,24),921600);
 assert.equal(m.audioPcm(44100,16,2,10),1764000);
 assert.equal(m.videoRaw(320,240,24,25,2),11520000);
});
test("Výuková stránka obsahuje souvislý výklad, ústní osnovu, popsané simulace a JS",()=>{
 const page=fs.readFileSync(path.join(__dirname,"../mechatronika/maturita/02-kody-a-kodovani-dat/index.html"),"utf8");
 const script=fs.readFileSync(path.join(__dirname,"../mechatronika/maturita/02-kody-a-kodovani-dat/app.js"),"utf8");
 assert.equal((page.match(/class="section chapter"/g)||[]).length,9);
 assert.equal((page.match(/class="topic topic-accordion"/g)||[]).length,10);
 for(const section of ["vyznam","bcd","gray","ascii","utf8","parita","ramec","media","opakovani"])assert.match(page,new RegExp('id="'+section+'"'));
 for(const id of ["bcdInput","bcdResult","graySlider","wheelSectors","asciiInput","asciiRows","utfInput","utfHex","parityInput","parityFeedback","imageW","audioSeconds","finalQuiz"])assert.match(page,new RegExp('id="'+id+'"'));
 assert.match(page,/assets\/js\/code-core\.js/);assert.match(page,/src="app\.js"/);
 assert.match(script,/SkolaCodeModel/);
});
