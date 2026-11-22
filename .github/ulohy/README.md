# Standard „Úlohy a projekty“ · Mechatronika a robotika

**Verze:** 0.1 · **Stav:** pracovní návrh · **Datum:** 2026-11-22  
**Rozsah:** řešené příklady, samostatná cvičení, laboratorní úlohy a projekty pro 3. a 4. ročník a maturitní přípravu.  
**Související:** [Šablona úlohy](TEMPLATE.md) · [Kontrola kvality](REVIEW.md) · [Standard výuky](../vyuka/README.md) · [Standard maturity](../maturita/README.md)

> **Hlavní pravidlo:** Každá úloha vede k pozorovatelnému výsledku. Student musí rozumět tomu, **co** má zjistit nebo sestavit, **proč** to dělá, **jak** pozná správný výsledek a **jak** svůj postup vysvětlí.

## 1. Název a zařazení

**Doporučený zastřešující název ve výukovém systému: „Úlohy a projekty“.** Jde o pracovní návrh označení; studentskou navigaci upravovat až po odsouhlasení.

Úlohy **nejsou od výuky oddělené**. Výklad může přímo uvnitř kapitoly používat konkrétní úlohu; katalog poskytuje ještě možnost ji najít samostatně. Stejná úloha slouží více ročníkům a v maturitní přípravě, pokud její obtížnost odpovídá cíli.

## 2. Čtyři druhy a jejich rozdíly

| Typ | Účel | Typické použití | Co musí obsahovat navíc |
|---|---|---|---|
| **Řešený příklad** | Předvést správný způsob uvažování a pracovní postup | demonstrace, úvod do učiva | rozfázované řešení, vysvětlení proč každý krok platí, kontrola výsledku |
| **Cvičení** | Procvičit konkrétní dovednost samostatně | v hodině, domácí příprava, maturita | zadání, vstupní data, očekávaný výstup, možnost kontroly či nápovědy |
| **Laboratorní úloha** | Pozorovat, změřit či sestavit skutečné/virtuální zařízení | experiment, měření, simulátor | pomůcky, zapojení, bezpečnost, postup, záznam výsledků, interpretace, reset |
| **Projekt** | Vyřešit komplexnější otevřený problém s návrhem a ověřením | více hodin, týmová práce, mechatronická sestava | požadavky a omezení, milníky, role, výstupy, dokumentace, testování a rubrika hodnocení |

Rozhoduje povaha činnosti, ne délka stránky. Jeden projekt může obsahovat několik cvičení a laboratorních úloh. Řešený příklad může být součástí výkladu a později sloužit samostatně k opakování.

## 3. Jednotná identita a propojení

Každá položka dostane stabilní ID, například `U-LOG-001`, `U-PLC-004`, `P-ROB-002`. Systém ID stanovíme jednou a při přejmenování ho neměníme.

Povinná metadata:
- název, ID, typ, verze/stav a autor/odborný revizor;
- cílový ročník, oblast a předpoklady;
- konkrétní naučená/ověřovaná dovednost, přiřazení k ŠVP a případně maturitní otázce;
- obtížnost **Z = základ**, **A = aplikace**, **R = rozšíření**;
- orientační čas a režim (individuálně, dvojice, tým);
- potřebné vybavení, software, alternativy a bezpečnost;
- URL stránky, související lekce, simulační komponenty, odkaz na zadání, způsob kontroly.

Nesmí se předpokládat, že existuje hardware či software jen proto, že se objevil ve starším návrhu. Před použitím ve třídě inventář ověřit.

## 4. Společná didaktická stavba úlohy

**A. Kontext a cíl:** co řešíme, co se student naučí, k čemu je řešení užitečné.  
**B. Vstupy a podmínky:** schéma, součástky, parametry, omezení, bezpečnost a předpoklady.  
**C. Jasné zadání:** co přesně vytvořit, vypočíst, pozorovat, předvést nebo zdokumentovat.  
**D. Postup / míra podpory:** úplně řešený krokový příklad, nápovědy nebo otevřené zadání podle typu.  
**E. Výstup a důkaz:** výpočet, pravdivostní tabulka, funkční zapojení, graf, data z měření, kód či protokol.  
**F. Ověření:** jak zjistit správnost, včetně hraničního či chybového scénáře.  
**G. Reflexe:** proč řešení funguje, co by se stalo při změně vstupu nebo poruše, co je slabé místo.  
**H. Rozšíření:** dobrovolná náročnější varianta, případně odkaz na další téma.

Výsledné řešení nemá nahrazovat přemýšlení studenta. V řešeném příkladu ukazujeme celý postup; u cvičení nabízíme nápovědy a vysvětlující zpětnou vazbu; u projektu ponecháváme prostor pro rozhodování a obhajobu.

## 5. Přínos interaktivity a znovupoužití

- Ovládací simulátor má jasně označené vstupy, výstupy a stav, ovládání krok/zpět/reset, pokud to princip umožňuje.
- Dříve než student uvidí výsledek, má dostat příležitost **předvídat, co nastane**.
- Stejný odborný model se opakovaně vkládá do výkladu, laboratorní stránky a maturity. Nevytváříme tři JS verze.
- Pro tisk / výpadek JavaScriptu existuje alespoň statický popis zadání, schéma a tabulka očekávaných stavů.
- Simulace nesmí předstírat vlastnosti skutečných zařízení, které nemodeluje. Výslovně uveďme idealizace, například zanedbané časové zpoždění.

## 6. Zásady pro práci s reálným hardwarem

**Bezpečnost je povinná, nikoliv rozšiřující kapitola.** U zařízení napájených elektricky, pneumaticky, mechanicky pohybujících se a u robotů uvádíme konkrétní rizika a opatření včetně nouzového zastavení, dohledu, odpojování napájení a bezpečných mezí.

- Nikdy neodvozovat bezpečné postupy pouze z virtuálního simulátoru.
- Před spuštěním zkontrolovat zapojení, napájení, polohu pohyblivých částí a připravenost bezpečnostních prvků.
- Měření musí definovat jednotky, rozsahy, nejistotu či toleranci tam, kde je podstatná.
- Jestliže hardware není k dispozici, připravit smysluplnou náhradní virtuální nebo analytickou aktivitu, aniž bychom ji vydávali za skutečné měření.

## 7. Hodnocení podle druhu

**Řešený příklad:** má ukázat konzistentní postup, nikoli sloužit jako samostatně známkovaný výkon.

**Cvičení:** ověřit nejen odpověď, ale také správný postup a schopnost vysvětlit příčinu. U automatického hodnocení testovat více než jeden šťastný vstup.

**Laboratorní úloha:** hodnotit správnost montáže či nastavení, pozorování/naměřená data, vysvětlení výsledků, bezpečné zacházení a protokol.

**Projekt:** předem sdělená rubrika: funkčnost, správnost návrhu, provedení testů, dokumentace, spolupráce/role při týmové práci a obhajoba rozhodnutí. Hodnotit dosažení zadání, nikoli nákladnost použitých součástek.

U všech typů navrhovat zpětnou vazbu „co se podařilo / co opravit / proč“. Řešení pro učitele a případně neveřejné testovací sady držet mimo veřejný web a veřejné repozitáře.

## 8. Minimální úplnost podle typu

### Řešený příklad
- Kontext, přesné zadání, kompletní komentovaný postup, kontrola výsledku a jeden podobný úkol pro samostatné ověření.

### Cvičení
- Jednoznačné zadání, vstupy, očekávaný výstup a kritéria, nápověda tam, kde pomůže, vysvětlení po vyřešení, kontrola hraničního případu.

### Laboratorní úloha
- Pomůcky, bezpečnost, schéma, postup, záznam měření/pozorování, vyhodnocení, opakovatelnost a reset, případně samostatný pracovní list.

### Projekt
- Reálný problém, požadavky, kritéria přijetí, omezení a bezpečnost, milníky, dokumentace, testovací scénáře, prezentace/obhajoba a transparentní rubrika.

Jednotlivé položky mohou být stručné či rozsáhlé podle účelu. **Nerozhoduje počet stránek, ale úplnost zadání a ověřitelnost výsledku.**

## 9. Stav a testování před zveřejněním

Stejné stavy jako jinde: `ROZPRACOVÁNO` → `OBSAHOVĚ HOTOVO` → `K REVIZI` → `HOTOVO`, případně `K AKTUALIZACI`.

**HOTOVO** znamená, že nezávislý řešitel je schopen postup pochopit, úlohu provést, odevzdat požadovaný výstup a výsledek spravedlivě ověřit. K tomu je nutná odborná kontrola dle [REVIEW.md](REVIEW.md).

U konkrétního řešení každé úlohy testovat alespoň nominální, chybový a hraniční scénář, pokud mají pro úlohu smysl.

## 10. Umístění a veřejnost

Metodické podklady jsou uloženy v `.github/ulohy/`, nikoli v navigaci studentského webu. Jejich obsah je **ve veřejném repozitáři veřejně čitelný**. Skryté odkazy nejsou ochranou tajných klíčů ani neveřejného hodnocení.

Budoucí studentská sekce „Úlohy a projekty“ může nabízet filtrování podle ročníku, tématu, typu, obtížnosti a vybavení. O tom, zda bude vlastní hlavní položkou navigace nebo kontextovým katalogem, rozhodneme až po prvních použitelných úlohách. Současný veřejný web tento standard **nemění**.
