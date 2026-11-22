/* Otázka 01A. Interaktivní převody sdílí model assets/js/number-core.js.
   Veškeré výpočty probíhají lokálně bez ukládání údajů. */
(function() {
  "use strict";
  var core=window.SkolaNumberModel;
  if(!core){ console.error("Chybí number-core.js"); return; }
  function el(id){return document.getElementById(id);}
  function text(id,value){el(id).textContent=String(value);}
  var names={2:"dvojkové",8:"osmičkové",10:"desítkové",16:"šestnáctkové"};
  function show() {
    var base=Number(el("baseSelect").value),raw=el("baseInput").value;
    try {
      var value=core.parseNumber(raw,base);
      text("resultDec",core.formatNumber(value,10));
      text("resultBin",core.formatNumber(value,2));
      text("resultHex",core.formatNumber(value,16));
      text("resultOct",core.formatNumber(value,8));
      text("convertFeedback","Správný rozklad pro "+names[base]+" číslo "+raw.toUpperCase()+" má desítkovou hodnotu "+value+". Zkontroluj váhy jednotlivých pozic.");
      var holder=el("positionBreakdown");
      holder.replaceChildren();
      var sum=0;
      core.expansions(value,base).forEach(function(piece) {
        sum+=piece.contribution;
        var node=document.createElement("div");node.className="breakdown-item";
        var symbol=document.createElement("strong");symbol.textContent=piece.digit;
        var weight=document.createElement("small");weight.textContent=piece.digitValue+" × "+base+"^"+piece.exponent;
        var contribution=document.createElement("span");contribution.textContent="= "+piece.contribution;
        node.append(symbol,weight,contribution);
        holder.appendChild(node);
      });
      var finish=document.createElement("p");finish.className="breakdown-sum";
      finish.textContent="Součet příspěvků = "+sum+"₁₀";
      holder.appendChild(finish);
    }catch(err){
      text("convertFeedback",err.message+". Oprav vstup. Každá soustava má pouze své povolené číslice.");
      el("positionBreakdown").replaceChildren();
      ["resultDec","resultBin","resultHex","resultOct"].forEach(function(id){text(id,"—");});
    }
  }
  el("convertButton").addEventListener("click",show);
  el("baseInput").addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();show();}});
  el("baseSelect").addEventListener("change",function(){
    var base=Number(el("baseSelect").value);
    var vals={10:"173",2:"10101101",16:"AD",8:"255"};
    el("baseInput").value=vals[base];show();
  });
  el("convertReset").addEventListener("click",function(){el("baseSelect").value="10";el("baseInput").value="173";show();});
  show();
})();