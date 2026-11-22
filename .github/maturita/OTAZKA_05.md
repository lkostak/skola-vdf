# Maturitní otázka 05 · Produkční osnova a stav realizace

**Název podle stávajícího portálu:** Základní sekvenční logické obvody, klopné obvody  
**Stav:** ROZPRACOVÁNO (pracovní specifikace v0.1, 2026-11-22)  
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
| 05-01 | Proč nestačí kombinační logika? | M | Předpoví, co nastane po uvolnění START | Interaktivní úvod s motorem | prototyp v 5A |
| 05-02 | Stav, `Qⁿ` a `Qⁿ⁺¹` | M | Mění vstupy, sleduje uchování stavu | Stavový krokovací model | prototyp v 5A |
| 05-03 | Jak funguje zpětná vazba? | M | Popíše, proč se informace nevytratí | Principiální blokové schéma zpětné vazby | prototyp v 5A |
| 05-04 | Typy monostabilní/bistabilní/astabilní | M | Rozpozná průběhy a přiřadí aplikace | Grafy průběhů | připravit |
| 05-05 | RS: vstupy, stavy a zakázaná kombinace | M | Přepíná S/R, vyplňuje tabulku, interpretuje hazard | Sdílený model NOR-RS | prototyp 5A rozšířit |
| 05-06 | Paměť v řízení START/STOP | M/P | Testuje impuls, uvolnění, STOP prioritu | Model motoru + rovnice | prototyp 5A rozšířit |
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
