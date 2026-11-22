# Maturitní otázka 04 · Kombinační logické obvody

**Pracovní produkční záznam v0.1 · 2026-11-22**  
**Stav:** KOMPLETNÍ PRVNÍ VÝUKOVÝ A TISKOVÝ NÁVRH K REVIZI. Neoznačovat jako HOTOVO bez pedagogické a odborné přejímky.  
**Struktura:** jedna souvislá stránka, bez nuceného rozdělení na A/B.

> **Oficiální zadání:** názvy a rozsahy níže pocházejí z pracovních školních map maturitních témat. Není doloženo úplné, schválené a závazné zadání otázky 04. Konečná kontrola podle schváleného zadání školy je otevřený blokující krok.

## 1. Podklady a přímá vazba na ŠVP

1. `Mechatronika_maturitni_otazky_1-8_editovatelna_tabulka.docx` (01.10.2026) výslovně požaduje:
   - návrhový proces **slovní zadání → proměnné → pravdivostní tabulka → kanonický SOP/POS → zjednodušení Booleovou algebrou a Karnaughovou mapou → realizace**;
   - hradla, kontaktní schémata a případně integrované obvody;
   - dekodér, kodér, komparátor a multiplexer, praktický příklad **Majority**;
   - student má umět kompletní návrh, minimalizaci i obhajobu schématu.
2. `Mapa_maturitnich_temat_A3.docx` (09/2026) zdůrazňuje poloviční/úplnou sčítačku, adresový dekodér, kodér, MUX/DEMUX, komparátor, rozdíl proti sekvenčním obvodům a samostatný návrh. Obsahová vazba na ŠVP, ne doslovný seznam předepsaných podotázek.
3. `Mechatronika_robotika_maturitni_okruhy_SVP.docx`: v oddílu ŠVP pro 3. ročník (tištěná str. 477) se uvádí **„navrhne jednoduché kombinační a sekvenční řídicí obvody“**, v učivu **„logická hradla“, „sčítačka, registr, dekodér adres, čítač“**. Pro otázku 04 se přímo vztahuje zejména sčítačka a dekodér adres. Registr a čítač jsou otázkou 06. Ve 4. ročníku se logické operace používají v PLC.
4. GitHub [`VYSTUPY_3_ROCNIK.md`](../kurikulum/VYSTUPY_3_ROCNIK.md): `MER3-U04` a výstup `MER3-V012` (s. 477). **Napojení tématu na výstup není důkaz jeho skutečného splnění**. ŠVP s názvem „Elektrotechnika – Mechatronika 2024“ má platnost od **01.09.2022**.
5. Ve zpřístupněných pracovních souborech **nenalezena kompletní dřívější vysázená skripta otázky 04** obdobná starším skriptům otázek 01–03. Proto je studijní PDF otázky 04 **nově autorsky připravený text**, nikoli konverze staršího souboru.

### Odborná kontrola a referenční zdroje

- [All About Circuits: Karnaugh maps](https://www.allaboutcircuits.com/textbook/digital/chpt-8/venn-diagram-karnaugh-map/) pro 3proměnnou K-map a Grayovo pořadí 00/01/11/10.
- [Cornell CS3410: Logic Gates](https://www.cs.cornell.edu/courses/cs3410/2025sp/notes/logic.html) a [ANU: ALU lab](https://comp.anu.edu.au/courses/comp3710-uarch/labs/02-alu/) pro poloviční a úplnou sčítačku.
- Odborné kontroly neznamenají školní schválení podoby maturity.

## 2. Výukové cíle a hranice tématu

Po přípravě má student umět:

1. Vysvětlit `Y=f(aktuální vstupy)` a rozdíl kombinační × sekvenční.
2. Ze slovního zadání určit signály a sepsat **všech osm řádků třívstupové funkce**.
3. Z jedničkových řádků odvodit úplný **SOP**, z nulových **POS**; správně používat mintermy a maxtermy.
4. Zjednodušit jednoduchý výraz Booleovou algebrou a **Karnaughovou mapou**; rozpoznat Grayovo pořadí, seskupování a sousednost přes okraje.
5. Nakreslit a vysvětlit **opravdové IEC hradlové schéma Majority** ze tří AND a jednoho OR, včetně vodičů a vstupů.
6. Sestavit tabulku poloviční a úplné sčítačky, vysvětlit `S=A⊕B`, `C=A·B`, `Cout=AB+A·Cin+B·Cin`.
7. Popsat dekodér 2:4 s enable, ne-prioritní kodér 4:2 se stavem valid, multiplexor 4:1 a demultiplexer 1:4.
8. Vysvětlit základ dvoubitového komparátoru a vztah rovnosti k XNOR.
9. Odlišit logický návrh od fyzické realizace, napěťových úrovní, zpoždění, hazardů, zákmitu a bezpečnostní architektury.

**Jádro:** kombinační charakter; návrhový postup; tabulka → SOP/POS → minimalizace → schéma; Majority; sčítačka a dekodér.

**Doplnění podle širších pracovních map:** K-mapa 3 proměnných, kodér, MUX/DEMUX, komparátor, kontaktní realizace.

**Prohloubení, nikoli obligatorní detail bez školního potvrzení:** dvoubitové porovnávací rovnice, univerzální realizace XOR z MUX, sousednost skupin přes okraj mapy, hazardy, konkrétní časování obvodů.

**Hranice:** samostatná funkce NOT/AND/OR/NAND/NOR/XOR/XNOR a obecné zákony patří primárně do otázky 03. Klopné obvody, registry, čítače a paměť jsou otázky 05/06.

## 3. Web a source of truth

| Součást | Umístění | Obsah | Stav |
|---|---|---|---|
| Jedna hlavní stránka | `mechatronika/maturita/04-kombinacni-logicke-obvody/index.html` | Úvodní tři odstavce, 10 rozbalovacích ústních odpovědí, 10 tematických kapitol, Majority schéma | IMPLEMENTOVÁNO |
| Interaktivní stránka | `mechatronika/maturita/04-kombinacni-logicke-obvody/app.js` | Editovatelná tabulka všech 8 výstupů → K-mapa, skupiny, SOP/POS + sčítačky, dekodér, kodér, MUX, DEMUX, komparátor, závěrečný test | IMPLEMENTOVÁNO |
| Sdílená logika | `assets/js/combinational-core.js` | Přesný kanonický SOP/POS, minimalizace tří proměnných úplným pokrytím prime implicants, úplná K-mapa v Grayově pořadí, modely funkčních bloků | IMPLEMENTOVÁNO |
| Vzhled | `mechatronika/maturita/04-kombinacni-logicke-obvody/lesson.css` | Responzivní Raleway, barvy školy, karty, tabulky, obdélníkové IEC schéma | IMPLEMENTOVÁNO |
| Hlavní rozcestník | `mechatronika/maturita/index.html` | Otázka 04 aktivní | IMPLEMENTOVÁNO |
| Testy | `tests/combinational-core.test.js`, `.github/workflows/mer04-tests.yml` | Exhaustivní kontrola **všech 256 třívstupových funkcí** proti minimálním SOP/POS, testy sčítaček, dekodéru, MUX/DEMUX, kodéru a komparátoru | [PASS](https://github.com/lkostak/skola-vdf/actions/runs/45053896012) |

### Didaktická posloupnost 10 kapitol

01. Kombinační obvod a absence paměti.
02. Sedmistupňový návrhový postup.
03. Pravdivostní tabulka a kanonický SOP/POS.
04. Minimalizace Booleovou algebrou.
05. **Živá Karnaughova mapa**: editace libovolného výstupu a překreslení přesného minimalizovaného SOP/POS včetně skupin.
06. Skutečné logické schéma Majority pomocí obdélníkových IEC značek, tři AND → OR a kontaktní ekvivalence.
07. Poloviční a úplná sčítačka s plnou pravdivostní tabulkou.
08. Dekodér 2:4 + aktivní enable, kodér 4:2 pouze one-hot.
09. MUX 4:1, DEMUX 1:4, dvoubitový komparátor.
10. Kompletní návrh Majority, 5bodový ověřovací test a ústní maturitní odpověď.

## 4. Tiskové dokumenty: pracovní sada k učitelské revizi

| Materiál | Rozsah a obsah | Přístup |
|---|---|---|
| **Studijní text** | **30 stran A4**, původní autorský výklad: návrhový postup, SOP/POS, Karnaughovy mapy, Majority, IEC schéma, poloviční/úplná sčítačka, kodér/dekodér, MUX/DEMUX, komparátor, kontakty, modelová ústní odpověď, 24 kontrolních otázek, vybrané odpovědi a další řešené příklady | Pracovní PDF v konverzaci. Zatím nepublikovat veřejně |
| **Studentský pracovní list** | **8 stran A4**, **14 úloh / 100 bodů**, místa na kompletní tabulky, mintermy, maxtermy, K-mapu, kreslení IEC schématu, sčítačky, bloky, komparátor | Pracovní PDF v konverzaci. Zatím nepublikovat veřejně |
| **Učitelské řešení** | **6 stran A4**, hodnoticí klíč, tabulky, kompletní modelové odpovědi a schéma Majority | **NEVEŘEJNÉ. Neumisťovat do veřejného GitHubu** |

**Autorské vymezení:** U otázky 04 jde o novou prvotní sazbu všech tří PDF, ne o automatický export interaktivní stránky nebo jinak neuvedeného dřívějšího DOCX. PDF mají samostatně čitelný výklad a ukázky.

PDF byla vytvořena v pracovním kontejneru a graficky prověřena stránku po stránce. Všechna jsou v tomto stavu **určená pro učitelskou revizi**, bez automatického veřejného zveřejnění. Skript vytvářející také učitelský klíč záměrně není součástí veřejného repozitáře.

## 5. Odborné předpoklady modelu a otevřené kontroly

- Návrhová laboratoř pracuje s přesně **3 proměnnými a osmi úplně definovanými řádky**; **don’t care** hodnoty nejsou zadatelné.
- Každý výsledek minimizéru je ověřen proti **256** možným třívstupovým funkcím v CI.
- Karnaughova mapa používá BC=00,01,11,10; skupiny 1/2/4/8, včetně sousednosti přes okraj. Program zobrazuje jedno optimální pokrytí; mohou existovat další ekvivalentní minimální varianty.
- Pro 4→2 kodér bez priority je platný **právě jeden aktivní vstup**, ostatní jsou explicitně neplatné.
- Dekodér a MUX/DEMUX používají kladnou logiku a explicitní adresu, nikoli fyzický pinout konkrétní součástky.
- Majority není sama o sobě bezpečnostní funkce. Kontaktní ukázky nepoužívat jako projekt nouzového zastavení.
- Interaktivní laboratoř počítá **ideální ustálenou Booleovu funkci**, nikoli šíření analogového signálu, zpoždění, zákmit nebo hazard.
- Schéma zobrazuje skutečnou kombinaci AND a OR s vodiči, ale bez napájení, balení a pinů konkrétních integrovaných obvodů.

## 6. Kontrolní seznam před označením HOTOVO

- [x] Založen souvislý webový výklad a 10 ústních odpovědí.
- [x] Implementován výpočtově podložený editor tabulky a K-mapy.
- [x] Sčítačky, dekodér, kodér, MUX/DEMUX a komparátor jsou samostatně interaktivní.
- [x] Připojena otázka 04 na veřejný maturitní rozcestník.
- [x] Automatická odborná logická kontrola 256 funkcí a běžných bloků: CI PASS.
- [x] Připraveny a vizuálně zkontrolovány tiskové PDF (30 + 8 + 6 stran).
- [ ] Ověřit mobilní použití a projekční režim přímo na zařízeních.
- [ ] Provést učitelskou odbornou revizi celého výkladu i modelových výsledků.
- [ ] Provést učitelskou pedagogickou revizi textů, délky výkladu a vhodnosti pracovního listu.
- [ ] **Doložit přesné schválené školní maturitní zadání otázky 04 a pokrýt každý jeho podbod.**
- [ ] Po schválení zveřejnit studentská PDF na webu, učitelský klíč zachovat neveřejný.
- [ ] Zapsat dokončenou odbornou přejímku do `.github/maturita/REVIEW.md` a stav aktualizovat na HOTOVO.

**Závěr:** Máme dokončený **pracovní obsahový a technický balíček otázky 04**, ale nikoli oficiálně schválený maturitní materiál.
