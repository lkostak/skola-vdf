# Maturitní otázka 05 · Produkční osnova a stav realizace

**Název podle stávajícího portálu:** Základní sekvenční logické obvody, klopné obvody  
**Stav:** ROZPRACOVÁNO; **část 5A implementována jako revidovatelný prototyp** (v0.2, 2026-11-22). Celá otázka 05 stále není hotová.  
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
| 05-04 | Typy monostabilní/bistabilní/astabilní | M | Rozpozná průběhy a přiřadí aplikace | Grafy průběhů | připravit |
| 05-05 | RS: vstupy, stavy a zakázaná kombinace | M | Přepíná S/R, vyplňuje tabulku, interpretuje hazard | Sdílený model NOR-RS | 5A: model a tabulka fungují; aktivní vyplňování tabulky ještě doplnit |
| 05-06 | Paměť v řízení START/STOP | M/P | Testuje impuls, uvolnění, STOP prioritu | Model motoru + rovnice | 5A: implementováno, čeká na pedagogickou revizi |
| 05-07 | Synchronní/asynchronní a CLK | M | Vysvětlí rozdíl úrovně/hran, předpoví změnu Q | Clock krokovač | 5B: připravit |
| 05-08 | D, časové diagramy | M | Navrhne a vyhodnotí průběh D/CLK/Q | Model D + diagramový trenažér | 5B: připravit |
| 05-09 | JK, toggle | M | Vyplní tabulku a vyzkouší J=K=1 | Model JK | 5B: připravit |
| 05-10 | Porovnání, praxe, ústní maturita | M/P | Odůvodní volbu obvodu, kreslí tabulky | Porovnání + test + příklady | připravit |

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

**Etapa II:** synchronní logika 5B, D a JK, krokování hodin, řešené časové diagramy.  
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
- 5B: zatím neexistuje.
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

**Před přijetím učitelem stále zbývá:** projít lekci vizuálně na iPhonu a projektoru, provést ručně všechny interaktivní scénáře, vylepšit interaktivní zadání pro samostatné sestavování pravdivostní tabulky, doplnit schéma konkrétní realizace RS pomocí hradel, potvrdit terminologii podle oficiálního zadání a odbornou/pedagogickou revizi. **Testy logického jádra neznamenají kompletní otestování prohlížeče.**

