# Maturitní otázka 05 · Produkční osnova a stav realizace

**Název podle stávajícího portálu:** Základní sekvenční logické obvody, klopné obvody  
**Stav:** ROZPRACOVÁNO; **části 5A a 5B implementovány jako revidovatelné výukové prototypy; doplněny tři typy multivibrátorů a konkrétní NOR-RS schéma** (v0.4, 2026-11-22). Celá otázka 05 stále není schválená jako HOTOVO.  
**Oficiální podoba zadání:** ⚠️ Přesné znění schválených podbodů školy **není dosud nezávisle ověřeno**. Osnova níže vychází z existujícího portálu a dřívějšího pracovního dokumentu `Mechatronika_maturitni_otazky_1-8_editovatelna_tabulka.docx` a je nutné ji před schválením porovnat s originálem.

## 1. Výstupy učení

Student:
1. Rozliší kombinační a sekvenční logický obvod a vysvětlí potřebu paměti.
2. Vysvětlí zpětnou vazbu, vnitřní stav a vztah `Qⁿ → Qⁿ⁺¹`.
3. Rozliší monostabilní, bistabilní a astabilní multivibrátor (nejde o totéž rozdělení jako RS/D/JK).
4. Nakreslí a vysvětlí základní RS ze dvou hradel NOR, jeho stavovou tabulku a zakázanou kombinaci.
5. Rozliší aktivní vysoké vstupy NOR-RS a aktivní nízké NAND-RS, vysvětlí obvody s prioritou Set a Reset.
6. Vysvětlí bezpečně interpretované řízení START/STOP, včetně významu priority STOP a rozdílu školního modelu od skutečného bezpečnostního obvodu.
7. Vysvětlí asynchronní versus synchronní chování, úrovňové a hranové řízení a náběžnou/sestupnou hranu taktu.
8. Vysvětlí D klopný obvod a časový diagram `D, CLK, Q`.
9. Vysvětlí JK klopný obvod, jeho tabulku a překlápění při `J=K=1`.
10. Porovná RS, D, JK a uvede použití v praxi; rozumí návaznosti na otázku 06 (registry, čítače).

## 2. Vazba na ŠVP

Primární: `MER3-V012` (navrhne jednoduché kombinační a sekvenční řídicí obvody, ŠVP str. 477), `MER3-U04` (logická hradla, registr a čítač, sekvenční automat), `MER3-V019` (navrhne vhodný zdroj synchronizace, str. 477), `MER3-U06` (synchronizace). Návazné: `MER4-V027` (čítače PLC), `MER4-U11` především až v otázce 06.

**Poznámka:** Vazba na ŠVP označuje výukový kontext, nikoli potvrzení pokrytí, odučení či hodnocení studentů. Oficiální znění ŠVP v [registru](../kurikulum/README.md).

## 3. Dramaturgie výkladu a praktických ukázek

| ID | Kapitola | Úroveň | Co student aktivně dělá | Demonstrace / sdílená komponenta | Stav |
|---|---|---|---|---|---|
| 05-01 | Proč nestačí kombinační logika? | M | Předpoví, co nastane po uvolnění START | Interaktivní úvod s motorem | 5A: implementováno, čeká na pedagogickou revizi |
| 05-02 | Stav, `Qⁿ` a `Qⁿ⁺¹` | M | Mění vstupy, sleduje uchování stavu | Stavový krokovací model | 5A: implementováno, čeká na pedagogickou revizi |
| 05-03 | Jak funguje zpětná vazba? | M | Popíše, proč se informace nevytratí | Principiální blokové schéma zpětné vazby | 5A: implementováno, čeká na pedagogickou revizi |
| 05-04 | Typy monostabilní/bistabilní/astabilní | M | Rozpozná průběhy a přiřadí aplikace | Tři komentované časové průběhy, srovnání, aktivní otázka | 5A: implementováno, čeká na odbornou/pedagogickou revizi |
| 05-05 | RS: vstupy, stavy a zakázaná kombinace | M | Přepíná S/R, vyplňuje tabulku, interpretuje hazard | Skutečné zapojení dvou NOR s oběma zpětnými vazbami + rovnice + živý výpis hradel + model | 5A: schéma a výklad implementovány; aktivní vyplňování tabulky ještě doplnit |
| 05-06 | Paměť v řízení START/STOP | M/P | Testuje impuls, uvolnění, STOP prioritu | Model motoru + rovnice | 5A: implementováno, čeká na pedagogickou revizi |
| 05-07 | Synchronní/asynchronní a CLK | M | Vysvětlí rozdíl úrovně/hran, předpoví změnu Q | Clock krokovač + D latch | 5B: implementováno, čeká na revizi |
| 05-08 | D, časové diagramy | M | Navrhne a vyhodnotí průběh D/CLK/Q | Model D s výběrem hrany + 10krokový diagramový trenažér | 5B: implementováno, čeká na revizi |
| 05-09 | JK, toggle | M | Vyplní tabulku a vyzkouší J=K=1 | Model JK s předpovědí a krokováním CLK | 5B: implementováno, čeká na revizi |
| 05-10 | Porovnání, praxe, ústní maturita | M/P | Odůvodní volbu obvodu, kreslí tabulky | Porovnání a kvíz 5B jsou implementovány; souhrnný pracovní list a plný test zbývají | dílčí implementace |

Do výkladu vložit názornou praktickou činnost **na konkrétním místě**, nikoli až za teorií; samostatná Laboratoř bude používat stejné komponenty.

## 4. Kritéria první etapy: 5A · „Paměť, RS, START/STOP“

- [ ] Prohloubené vysvětlení rozdílu kombinační × sekvenční.
- [ ] Předpověď výsledku **před** demonstrací.
- [ ] Srozumitelné rozlišení `Qⁿ` a `Qⁿ⁺¹`.
- [ ] Vizuální princip zpětné vazby.
- [ ] Model NOR-RS: `S,R ∈ {0,1}`, čtyři kombinace, udržení stavu, vynulování, nastavení a fyzikální omezení zakázané kombinace.
- [ ] Výslovná zmínka o NAND s aktivní nulou, bez nesprávné transpozice tabulky.
- [ ] START/STOP se stop-prioritou a upozorněním, že ukázka není bezpečnostně certifikované řízení motoru.
- [ ] Min. tři promyšlené kontrolní otázky s vysvětlující zpětnou vazbou.
- [ ] Rozumná přístupnost a čitelnost na mobilu i projektoru.
- [ ] Zachování existující veřejné URL `/mechatronika/maturita/05a-pamet-rs/`.
- [ ] Žádné oficiálně „HOTOVO“, dokud nebude potvrzeno celé zadání a zrevidováno 5B, studijní text, úlohy a pracovní list.

## 5. Kritéria následujících etap

**Etapa II:** synchronní logika 5B, D latch, hranově řízené D a JK, krokování hodin, řešené časové diagramy. **Implementováno jako prototyp; čeká na vizuální a pedagogickou revizi.**  
**Etapa III:** samostatná Laboratoř se znovupoužitím simulačního jádra; typy multivibrátorů, porovnání a rozšíření.  
**Etapa IV:** souvislý studijní dokument, pracovní list, robustní interaktivní test, ústní maturita nanečisto.  
**Etapa V:** odborná revize obvodu a simulací, kontrola podle oficiálního zadání, ŠVP, funkční a přístupnostní testy, zveřejnění stavu HOTOVO.

## 6. Odborné korektivy

- **NOR-RS (aktivní jednička):** S=R=0 uchování; 1/0 Set; 0/1 Reset; 1/1 v ideálním ustáleném modelu Q=Q̄=0, zakázaný stav. Při současném uvolnění nelze garantovat, který stav se skutečně ustálí; model má tento případ označit jako neurčený.
- **NAND-RS:** typicky aktivní nula; nevydávat jeho tabulku za NOR.
- **STOP-priorita není vlastnost základního NOR-RS s přímým současným S=R=1.** Jde o předřazenou logiku/PLC funkci s definovanou prioritou.
- **D:** hranově řízený klopný obvod přebírá D pouze v relevantní hraně, v rámci platných časových podmínek; nezaměňovat s transparentním D latch.
- **JK:** J=K=1 na příslušné hodinové události překlápí výstup; vysvětlit dle zvoleného modelu řízení hranou.
- **Časové diagramy** musejí odpovídat modelu a použitým vstupním polaritám.

## 7. Odkazy a stav zveřejnění

- [Otázka 05: rozcestník](../../mechatronika/maturita/05-sekvencni-logika/index.html)
- [5A: paměť a RS](../../mechatronika/maturita/05a-pamet-rs/index.html)
- [5B: hodinový signál, D, JK a časové diagramy](../../mechatronika/maturita/05b-synchronni-logika/index.html) · **implementovaný, dosud neschválený prototyp**.
- [Standard maturity](README.md) · [Kontrola kvality](REVIEW.md).

**Žádná další část kromě výslovně uvedených prototypů se nesmí prezentovat jako dokončená.**

## 9. Redakční revize 5A · podrobnější textový výklad (2026-11-22)

Na základě hodnocení učitele byla část 5A rozšířena o souvislé, samostatně čitelné vysvětlující pasáže **přímo uvnitř šesti existujících kapitol**. Zůstaly zachovány původní interaktivní modely, adresy a pořadí kapitol.

- **01 Problém:** proč stejná kombinace okamžitých vstupů může vést k rozdílnému stavu podle historie; dvě srovnávací situace.
- **02 Stav:** definice uloženého bitu, rozlišení stavu od vstupního povelu a `Qⁿ` proti `Qⁿ⁺¹`; komentovaný postup SET–uchování–RESET.
- **03 Zpětná vazba:** princip křížového propojení, dva stabilní platné stavy a význam komplementárních výstupů.
- **04 NOR-RS:** vysvětlení všech stavů, důležitost polarit a zakázané kombinace, porovnání s NAND-RS.
- **05 START/STOP:** důvod zavedení priority STOP, rozbor rovnice `Qⁿ⁺¹ = ¬STOP ∧ (START ∨ Qⁿ)` na čtyřech situacích, výslovné odlišení od bezpečnostního řízení stroje.
- **06 Ověření:** jak argumentovat při ústní zkoušce, analytický postup a osnova odpovědi.

**Technická realizace:** `mechatronika/maturita/05a-pamet-rs/index.html` a `lesson.css`; nové styly `.study-text`, `.worked-example`, `.study-steps` včetně mobilní a tiskové podoby.

**Pedagogické rozhodnutí:** Výklad není omezen na slidy a animace; student má rozumět textu i samostatně. Při dalších kapitolách 5B udržovat stejnou hloubku a stejné členění text → experiment → interpretace.

**Stav:** implementováno; **ještě neznamená odborně a pedagogicky schválené HOTOVO**. Nutná vizuální kontrola na mobilu/projektoru a revize učitelem.


## 8. Záznam realizace etapy I (2026-11-22)

**Publikovaný zdroj:** `mechatronika/maturita/05a-pamet-rs/index.html`; zachována původní URL.  
**Vzhled:** `mechatronika/maturita/05a-pamet-rs/lesson.css` (lokální, responzivní, tisk, redukce animace).  
**Výuková interaktivita:** `mechatronika/maturita/05a-pamet-rs/app.js` (předpovědi, krokování, NOR-RS, START/STOP, 3 otázky s vysvětlením).  
**Sdílené simulační jádro:** `assets/js/rs-core.js` (bez DOM, připraveno pro znovupoužití v Laboratoři).  
**Automatické testy:** `tests/rs-core.test.js` a CI workflow `.github/workflows/mer05-js-tests.yml`.

**Potvrzená technická kontrola:** všech 6 kapitol a vnitřních navigačních kotev se nachází v HTML, všechny lokální JS/CSS soubory byly v GitHubu ověřeny. Jednotkové testy sdíleného modelu RS/START-STOP prošly úspěšně v [GitHub Actions](https://github.com/lkostak/skola-vdf/actions/runs/45039346229).

**Před přijetím učitelem stále zbývá:** projít lekci vizuálně na iPhonu a projektoru, provést ručně všechny interaktivní scénáře, vylepšit interaktivní zadání pro samostatné sestavování pravdivostní tabulky, potvrdit terminologii podle oficiálního zadání a odbornou/pedagogickou revizi. **Testy logického jádra neznamenají kompletní otestování prohlížeče.**



## 10. Záznam realizace etapy II · 5B (2026-11-22)

### Publikované studentské soubory

- `mechatronika/maturita/05b-synchronni-logika/index.html`: 7 kapitol, každá se samostatně čitelným vysvětlením, praktickou ukázkou, řešeným příkladem či ověřením.
- `mechatronika/maturita/05b-synchronni-logika/app.js`: interaktivní předpověď, krokovač CLK, transparentní D latch, D se změnou polarity aktivní hrany a povinnou předpovědí Q, trenažér časových diagramů s desetistupňovou tabulkou a následně odkrytým průběhem Q, JK s předpovědí a překlápěním při J=K=1, závěrečný čtyřotázkový test.
- `mechatronika/maturita/05b-synchronni-logika/lesson.css`: lokální rozšíření vzhledu 5A; sdílená paleta, typografie, mobilní režim, tisk a ovládání klávesnicí.
- `assets/js/clock-core.js`: **jediné bezstavové vůči UI sdílené simulační jádro**, které obsahuje znovupoužitelné modely D latch, D flip-flop (náběžná/sestupná hrana), JK (náběžná/sestupná) a vyhodnocení časového diagramu.
- `tests/clock-core.test.js`: jednotkové testy modelů latch, D, JK a přechodů v diagramu, spouštěné v CI spolu s RS testy z části 5A.
- Rozcestník `05-sekvencni-logika/index.html` nabízí oba výukové bloky a 5A odkazuje na 5B.

### Didaktický průchod kapitolami

1. **Od paměti k řízené změně:** synchronizace registru; vstup D se může změnit, Q bez aktivní hrany ještě ne.
2. **CLK:** úroveň, náběžná/sestupná hrana, perioda a frekvence; krokování hodin.
3. **D latch a synchronizace:** úrovňová citlivost EN versus hranové řízení CLK; asynchronní ovládání a poznámka o asynchronním resetu.
4. **Hranově řízené D:** model s aktivní náběžnou i sestupnou hranou, student musí před krokem zvolit očekávané Q.
5. **Časové diagramy:** student sám odvodí hodnoty Q po deseti událostech; řešení a výstupní křivka se odkryjí po doplnění všech kroků.
6. **JK:** čtyři vstupní kombinace, překlápění na hraně, návaznost na dělení frekvence a otázku 06.
7. **Maturitní příprava:** srovnávací tabulka RS–D latch–D flip-flop–JK, odborně motivované distraktory a osnova ústní odpovědi.

### Odborné předpoklady modelu

- Simulátory zobrazují **ideální logické stavy**, nikoliv analogové přechody či metastabilitu.
- D/JK reagují na vybranou hranu, ne na každou změnu vstupu nebo trvající vysokou úroveň CLK.
- D latch je transparentní pouze při EN=1.
- JK J=K=1 překlopí Q pouze při aktivní hodinové události.
- Setup/hold čas a zpoždění šíření jsou vysvětleny textově, **nejsou fyzikálně modelovány**.
- Čítače a posuvné registry jako složitější celky patří otázce 06.

### Otevřené položky k profesionálnímu schválení

- [ ] Ručně projít 5B na telefonu a ve třídě na projektoru, včetně všech interakcí.
- [ ] Porovnat grafy s tabulkami modelů a důsledně ověřit každou časovou hranu; kontrolní sada je v `tests/clock-core.test.js`.
- [ ] Potvrdit výklad pojmů s přesným oficiálním maturitním zadáním a ŠVP.
- [x] Doplnit samostatnou kapitolu o monostabilním/bistabilním/astabilním multivibrátoru, základní průběhy, profesní použití a aktivní ověření (implementováno 2026-11-22; odborná revize dosud otevřená).
- [ ] Vytvořit plný studijní materiál, souhrnný pracovní list, samostatnou Laboratoř a ústní maturitní hodnocení.

**Výsledek etapy II:** obsah 5B je připraven k pedagogickému posouzení; neoznačovat ještě celý tematický celek za HOTOVO.


## 11. Rozbalovací ústní osnova v studentském přehledu otázky 05 (2026-11-22)

Na přímý požadavek učitele byla část **KOSTRA OTÁZKY** na studentské stránce `mechatronika/maturita/05-sekvencni-logika/index.html` změněna na **deset nativních HTML prvků `<details><summary>…</summary>…</details>`**.

Každá z deseti původních oblastí obsahuje:
- tři srozumitelné odstavce souvislého mluveného vysvětlení, které může maturant převyprávět vlastními slovy;
- konkrétní poznámku **„Co umět na tabuli“** (schéma, časový diagram, tabulka či zdůvodnění);
- přímý odkaz do příslušné lekce 5A nebo 5B.

Výklad neobsahuje pouze definice: propojuje důvod použití, princip, konkrétní příklad a návaznost na automatizaci. Ve čtvrtém bodě je stručně vysvětleno i rozlišení **monostabilní / bistabilní / astabilní**, které zatím není samostatnou kapitolou 5A/5B a zůstává k rozpracování. Texty jsou **pracovní vzorové formulace, nikoliv závazný přednes k mechanickému memorování**.

**Technické provedení:** zachována hlavní navigace a karty 5A/5B, doplněna pouze lokální šablona `mechatronika/maturita/05-sekvencni-logika/outline.css`. Rozbalování funguje nativně v prohlížeči, bez JavaScriptu. Otevírání jednotlivých bodů navzájem neomezuje ostatní body.

**Kontrola před finálním schválením:** odborně potvrdit ústní formulace podle přesného maturitního zadání; vizuálně ověřit mobil/projektor; pro budoucí otázky zvažovat shodný vzor ústní osnovy v studentských přehledech. Stále platí, že celá otázka 05 **není označena HOTOVO**.


## 12. Odborný obsah doplněn: tři multivibrátory a NOR-RS z hradel (2026-11-22)

**Důvod změny:** Učitel určil jako prioritní zbývající obsahové mezery otázky 05; viz kapitola 5A.

### Kapitola 04 · Rozdělení multivibrátorů

- Sedmá kapitola 5A byla vložena **mezi zpětnou vazbu a konkrétní RS** na kotvu `#multivibratory`; následující kapitoly přečíslovány na 05/06/07, obsah a staré kotvy `#rs`, `#motor`, `#overeni` zůstaly zachovány.
- **Monostabilní:** jeden stabilní stav, spouštěcí impuls, jeden časově omezený výstupní puls a návrat do stabilního stavu.
- **Bistabilní:** dva stabilní stavy; stav se uchovává a mění povelem SET/RESET.
- **Astabilní:** žádný stabilní stav; samovolné periodické změny výstupu.
- Každý typ má příklad reálného použití, textové vysvětlení, samostatný řádek vlastního SVG časového diagramu a společnou otázku k ověření.
- Výslovně rozlišeno třídění multivibrátorů podle **počtu stabilních stavů** od typologie **RS/D/JK** podle funkce paměťových prvků.
- Nejde o model s přesnými RC konstantami ani o konkrétní 555 obvod.

### Kapitola 05 · Skutečné dvouhradlové NOR-RS schéma

- `#schema-rs`: autorské **vektorové IEC schéma** se dvěma NOR (značka ≥1 + výstupní negace), horní hradlo generuje `Q = ¬(R ∨ Q̄)`, dolní generuje `Q̄ = ¬(S ∨ Q)`.
- Zapojena **oboustranná křížová zpětná vazba**, vstupy horního hradla R a Q̄, dolního S a Q, výstupy správně označeny.
- Doplněn komentovaný průchod SET, RESET a zakázaným `S=R=1`; samotná inicializace reálného hardwaru není zaručena.
- Stávající sdílený simulátor `assets/js/rs-core.js` zůstal zdrojem pravdy; `app.js` pouze zobrazuje odpovídající vstupy a výstupy obou hradel, včetně stavu neurčitého po současném uvolnění zakázané kombinace.
- **Statické a logické testy** v `tests/lesson-05-content.test.js` kontrolují existenci třídění, dvě hradla, obě křížové vazby, rovnice hradel, navazující odkazy a chování simulačního modelu.
- Ústní osnova na rozcestníku odkazuje bod 04 přímo na `#multivibratory` a bod 05 na `#schema-rs` včetně připomínky, co nakreslit na tabuli.
- Styl využívá stejné typografické a barevné principy jako dosavadní 5A; diagramy jsou SVG integrované do HTML a použitelné i při tisku. Žádné kopírované schéma ze zdrojové literatury.

### Odborné zdroje použité ke kontrole

- Analog Devices, *ADALM2000 Activity: BJT Multivibrators*: https://ez.analog.com/adiacademy/university-program/a/studentzone-articles/SA1059/adalm2000-activity-bjt-multivibrators (podstata tří typů multivibrátorů).
- *ElectronicsTextbook*, *SR Cross-NOR Latch*, oddíl 7.6.1: https://dthuecks.github.io/ElectronicsTextbook/sec-digital-latch.html (konkrétní zapojení NOR a rovnice Q/Q̄, stavy SET, RESET, hold a forbidden).
- University of Vermont, *Latch and flip flop*: https://www.uvm.edu/~cbcafier/cs2210/content/04_logic_gates/latch_and_flip_flop.html (rozlišení NOR a NAND provedení).

### Stav a otevřené kroky

**Doplnění prioritního odborného obsahu: IMPLEMENTOVÁNO V REPOZITÁŘI.**
Jde stále o výukový prototyp, nikoli úplné HOTOVO. Zbývá osobní vizuální a pedagogická revize, ověření s přesným oficiálním zadáním, aktivní sestavování RS tabulky, pracovní list, ucelený studijní materiál a závěrečné komplexní ověření.
