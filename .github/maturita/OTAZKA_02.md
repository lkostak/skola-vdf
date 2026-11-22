# Maturitní otázka 02 · Kódy a kódování dat

**Pracovní produkční záznam v0.1 · 2026-11-22**  
**Stav:** INTERAKTIVNÍ VÝKLAD A TISKOVÉ PODKLADY PŘIPRAVENY · ČEKÁ NA ODBORNOU A PEDAGOGICKOU REVIZI  
**Výuková koncepce:** jedna souvislá interaktivní stránka, nikoli povinné rozdělení na A/B.

> **Oficiální zadání:** v pracovní mapě a starších skriptech je doložen název otázky „Kódy a kódování dat“. Přesný schválený školní seznam případných podbodů není nezávisle doložen; texty se proto nesmí označovat za kompletní oficiální maturitní zadání nebo „HOTOVO“.

## 1. Zdroje a vymezení rozsahu

1. **Pracovní mapa osmi otázek** `Mechatronika_maturitni_otazky_1-8_editovatelna_tabulka.docx` (01.10.2026). Pro otázku 2 uvádí: ASCII a Unicode/UTF-8, číselné kódy jako BCD, Grayův kód, text, obraz jako pixely a barvy, zvuk (vzorkování a bitová hloubka), základní princip videa a detekci chyb (parita). Student má rozlišit číslo a kód, převést znak, vysvětlit Grayův kód, princip obrazu/zvuku a odhad velikosti dat.
2. **Mapa maturitních témat** `Mapa_maturitnich_temat_Mechatronika_a_robotika.docx` (09/2026). Jádro: hodnota × kód, BCD 8421, Gray, ASCII/Unicode, parita, význam použití v mechatronice. Jednotlivé kódy **nejsou explicitně rozepsány ve ŠVP**; vyžadují pedagogické vymezení.
3. **Dřívější, dosud nejnovější nalezená vysázená skripta** `Maturitni_otazka_02_Kody_a_kodovani_dat_skripta(1).docx` (08.09.2026). Mají 31 stran a 18 tematických kapitol včetně 48 procvičovacích úloh a komentovaných řešení, pokrývají kódy, datové formáty, zabezpečení, řídicí a průmyslové aplikace. V listopadu byla převedena do PDF; **nejde o nově vypracovaný text od nuly**.
4. **Dvoustránkový dodatek k tištěným skriptům** (22.11.2026): princip pixelů/RGB, PCM audio a FPS/video, výpočty velikosti nekomprimovaných dat. Důvod: pracovní mapa z října má širší rozsah než zářijová skripta. Po spojení vzniklo **33stránkové pracovní studijní PDF**. Obě části jsou rozlišeny; dodatek není vydáván za původní zářijový text.
5. **ŠVP Elektrotechnika – Mechatronika 2024, validita od 01.09.2022**, oddíl 6.22: v `MER3-U04` (str. PDF 477) stojí „zobrazení informace v počítači“, Booleova algebra, soustavy, logické obvody, paměti a mikroprocesorové systémy. Tematická vazba na pozdější snímače a digitální přenosy je rozšířením, nikoli doslovným přepisem jednoho ŠVP výstupu. Neprohlašovat všech 10 kapitál za přímé samostatné výstupy ŠVP.

## 2. Výukové cíle

Po prostudování student dokáže:

- Vysvětlit pojmy informace, data, symbol, kód, kódové slovo, kódování/dekódování a odlišit číslo od jeho reprezentace.
- Zakódovat a dekódovat desítkové číslice v **BCD 8421**, rozpoznat neplatnou čtveřici `1010` až `1111`.
- Odvodit sousední hodnoty ve čtyřbitovém reflektovaném **Grayově kódu**, srovnat přechod 7→8 s binárním zápisem a uvést absolutní enkodér jako aplikaci.
- Interpretovat **ASCII** kódy, odlišit textovou číslici od numerické hodnoty, popsat CR a LF.
- Vysvětlit vztah znak ↔ kódový bod **Unicode** ↔ bajty v **UTF-8**, např. Č = U+010C = C4 8C v UTF-8.
- Doplnit sudou a lichou **paritu** a předvést, jak může dvoubitová chyba projít kontrolou; odlišit checksum/CRC od opravného kódu.
- Popsat základní datový rámec a význam formátu; diagnostikovat různé významy bajtu 42₁₆.
- Vypočítat velikost nekomprimovaného RGB obrázku a PCM zvuku, vysvětlit FPS a odlišit od skutečné velikosti komprimovaných médií.

**Maturitní jádro (pracovní minimum):** kód × číselná soustava, BCD, Gray, ASCII, Unicode/UTF-8, parita a jedna mechatronická aplikace.

**Doplnění podle širší pracovní mapy:** obraz, zvuk, video a odhad velikosti dat, datový rámec a CRC.

**Rozšíření nad rámec jádra:** Hammingovy kódy, Aiken 2421, Excess-3, podrobná konstrukce CRC, linkové kódování, podrobnosti multimediálních kodeků. Tyto oblasti nepředstírat jako povinné bez potvrzení školou.

## 3. Propojené výstupy

| Součást | Umístění | Obsah | Stav |
|---|---|---|---|
| **Jedna společná stránka** | `mechatronika/maturita/02-kody-a-kodovani-dat/index.html` | Úvod se 3 odstavci, 10 rozbalovacích souvislých ústních odpovědí, 9 kapitál souvislého výkladu | Implementováno |
| Interaktivní ukázky | `mechatronika/maturita/02-kody-a-kodovani-dat/app.js` | BCD, Gray + 16sektorový enkodér, ASCII, UTF-8, parita + 1/2 změněné bity, obraz a PCM, test | Implementováno |
| Sdílené modely | `assets/js/code-core.js` | Přesná logika BCD, Gray, ASCII, UTF-8, parity, Hammingovy vzdálenosti a velikosti médií | Implementováno |
| Styly | `mechatronika/maturita/02-kody-a-kodovani-dat/lesson.css` | Responzivní Raleway, navazuje na otázku 05, mobil a tisk | Implementováno |
| Portál | `mechatronika/maturita/index.html` | Otázka 02 přesměrována z neaktivní karty na veřejnou lekci | Implementováno |
| Automatické testy | `tests/code-core.test.js`, `.github/workflows/mer02-tests.yml` | BCD, Gray, UTF8, parita, media, syntax a konzistence stránky | Implementováno, výsledek CI sledovat |
| **Tiskový studijní text** | Mimo public GitHub | 31 původních stran + 2 nové strany médií = **33stránkový PDF** | Připraveno k učitelské revizi, nezveřejněno |
| **Studentský pracovní list** | Mimo public GitHub | **7 stran A4**, 14 úloh, 100 bodů; samostatné kreslení a výpočty | Připraveno k učitelské revizi, nezveřejněno |
| **Učitelský klíč** | Mimo public GitHub | **4 strany A4** se správnými výsledky a orientačním bodováním | Neveřejné, určené učiteli |

V PDF studijních skript jsou navíc starší procvičovací úlohy s komentovanými výsledky. Nejde o soukromý klíč k novému samostatnému pracovnímu listu.

## 4. Didaktická struktura jediné webové lekce

01. **Od informace ke kódu:** 45 jako přirozené binární číslo, BCD a ASCII.
02. **BCD 8421:** samostatné čtveřice, validita skupin, převodník, výhody pro displej.
03. **Gray:** 16sektorový výukový enkodér, krokování, počet změněných bitů, přechod 7→8.
04. **ASCII:** znaky, číselné kódy, CR/LF, interaktivní tabulka hex a bitových reprezentací.
05. **Unicode/UTF-8:** znak versus kódový bod versus bajty, příklad Č = C4 8C.
06. **Parita:** sudá/lichá, jednobitová a dvoubitová chyba, vysvětlení omezení.
07. **Rámec a CRC:** checksum versus CRC, diagnostika hodnoty 42₁₆ a model rámce.
08. **Obraz, zvuk a video:** pixel/RGB, vzorkování/PCM, FPS, komprese; interaktivní výpočty.
09. **Opakování:** 4 vysvětlené kvízové otázky a model maturitní odpovědi.

Vzor **„úvod → souvislý výklad → aktivní krok → zpětná vazba → ústní vysvětlení“** převzat z otázek 01 a 05, nikoliv mechanicky rozdělen do částí A/B.

## 5. Odborná přesnost a hranice modelu

- BCD 8421: desítkové číslice kódovány zvlášť; neplatné čtveřice A–F.
- Gray: pravidlo jednoho změněného bitu platí pro **sousední sektory** zvoleného čtyřbitového cyklického reflektovaného kódu, nikoli pro libovolný velký skok.
- ASCII: základní 7bitový rozsah. Znak mimo ASCII není svévolně převeden na jiné číslo.
- UTF-8: používá `TextEncoder`; výstup jsou skutečné bajty, ne záměna s Unicode code point.
- Parita: detekuje lichý počet změněných bitů; dvoubitové poškození může projít. V řešeních a testech je správný příklad `10101100 → 01101100` (změněny první dva bity).
- CRC: výklad je principiální, **nevypočítává konkrétní protokolové CRC** bez určení polynomu, iniciální hodnoty apod.
- Velikost RGB a PCM: pouze nekomprimovaná data bez hlaviček, zarovnání, synchronizace a metadat.
- Video: snímky v čase, přesná komprimovaná velikost není odvozena bez bitrate/kodeku.
- Bez fyzikální simulace elektrických úrovní nebo skutečného šumu snímačů. Výklad se vztahuje k ideálnímu didaktickému modelu.

## 6. Použité referenční zdroje k ověření

- Unicode Consortium, [UTF-8/UTF-16/UTF-32 FAQ](https://www.unicode.org/faq/utf_bom.html): význam UTF-8 a kompatibilita ASCII.
- Unicode Consortium, [Technical Introduction](https://www.unicode.org/standard/principles.html): kódové body a kódovací formy.
- ETH Zürich, [Position and Velocity Measurements – Absolute Encoders with Gray Code](https://ethz.ch/content/dam/ethz/special-interest/mavt/dynamic-systems-n-control/idsc-dam/Lectures/Embedded-Control-Systems/LectureNotes/Position_and_Velocity_Measurements.pdf): sousední sektory a jeden měnící se bit.
- Původní pracovní školní skripta a ŠVP výše. Externí zdroje doplňují ověření, **nejsou** zdrojem školního schválení.

## 7. Kontroly a další kroky

- [x] Založen souvislý webový výklad, ústní osnova, interaktivní modely.
- [x] Připojeno na hlavní maturitní rozcestník.
- [x] Připravena tisková 33stránková studijní verze ze starších skript a samostatného 2stránkového dodatku.
- [x] Vytvořen studentský pracovní list (7 stran / 14 úloh / 100 bodů) a neveřejný učitelský klíč (4 strany).
- [x] Všechny PDF strany vykresleny a vizuálně zkontrolováno rozložení a použitelnost.
- [ ] Nejnovější CI pro `code-core.js` a navazující skripty má stav PASS.
- [ ] Výklad ručně vyzkoušen na mobilu a projektoru, interakce podle scénáře „předpověz → ověř“.
- [ ] Učitel projde text všech 33 stran včetně původu dodatku a případných starších nepřesností.
- [ ] Učitel projde zadání i výsledky 14 pracovních úloh.
- [ ] Přesné školou schválené maturitní zadání nezávisle doloženo a pokrytí ověřeno.
- [ ] Příslušné stránky vyplněny v `.github/maturita/REVIEW.md` a schvalující osoba + datum uvedeny.
- [ ] Po schválení se zveřejní **pouze studentské materiály**. Učitelský klíč zůstává v neveřejném úložišti.

**Závěr:** Etapa tvorby je hotová jako **pracovní podklad k revizi**, nikoli jako oficiálně uzavřená otázka. Nezavádět stav „HOTOVO“ bez výše uvedené kontroly.
