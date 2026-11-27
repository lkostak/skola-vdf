# Maturitní otázka 06 · Sekvenční obvody, registry a čítače

**Produkční evidence v0.1 | 2026-11-22**  
**Stav:** obsahový a technický první návrh připraven **k odborné a pedagogické revizi**, nikoli oficiálně HOTOVO.  
**Výukový formát:** jedna souvislá stránka s 10 kapitolami a 10 rozbalovacími ústními odpověďmi, bez povinného dělení A/B.

## 1. Podklady, přesný rozsah a metodická hranice

### Interní školní a pracovní zdroje

1. Pracovní tabulka `Mechatronika_maturitni_otazky_1-8_editovatelna_tabulka.docx`, otázka „6. Sekvenční logické obvody, složitější celky, registry, čítače“:
   - **registry**: paměťový a posuvný; sériový/paralelní vstup a výstup; SHL, SHR, ROL, ROR;
   - **čítače**: binární/dekadický, nahoru/dolů, synchronní/asynchronní, počet stavů 2ⁿ, dělení frekvence, RESET, LOAD, přenos a zkrácený čítací cyklus (např. 0–4);
   - požadované aktivní výkony: číst a kreslit časový diagram, vysvětlit registry, posuvy a čítače, určit stav po impulzech, navrhnout zkrácený cyklus.
2. `Mapa_maturitnich_temat_Mechatronika_a_robotika.docx`: těžiště ve 3. a 4. ročníku, návaznost na mikroprocesor/PLC, základní model registru, počítání impulzů, význam modulo, aplikace v komunikaci a automatizaci.
3. `Mechatronika_robotika_maturitni_okruhy_SVP.docx`: 3. ročník (tištěná str. 477) registr, čítač a jednoduchý sekvenční řídicí obvod; 4. ročník (str. 480–481) systémové a uživatelské registry a čítače PLC.
4. `Mechatronika a robotika: Maturitní přehled 1–8.png`: jako pracovní vizuální přehled uvádí i starší obvody 7490 (dekadický) a 7493 (binární), čtyřbitový posuvný registr a dělení frekvence.
5. ŠVP `Elektrotechnika – Mechatronika 2024`, platnost od **01.09.2022**. V registrovaných výstupech jsou pro tuto otázku relevantní zejména:
   - `MER3-U04`, `MER3-V012`: jednoduché kombinační a sekvenční řídicí obvody;
   - `MER3-U06`, `MER3-V018`: užití obecných registrových sad;
   - `MER4-U05`, `MER4-V018`, dále související `MER4-V024`, `MER4-V034`: práce s pamětmi a registry;
   - `MER4-U11`, `MER4-V027`: interní čítače PLC.
   **Přidání vazby na ŠVP není dokladem, že konkrétní výstup už byl ve výuce prokazatelně splněn.**

**Omezení:** úplné oficiální schválené znění otázky 06 nebylo nezávisle doloženo. Výčet vychází z uvedených pracovních podkladů a musí být před konečným uzavřením porovnán s platným školním zadáním.

### Odborné zdroje pro kontrolu technických principů

- [Texas Instruments: SN7490A/SN74LS90 a SN7493A/SN74LS93 datasheet](https://www.ti.com/lit/ds/symlink/sn74ls90.pdf): rozlišení dekadického a čtyřbitového binárního ripple čítače, sekce ÷2/÷5/÷8, reset a konkrétní polarita/časování.
- [Texas Instruments: SN74LS293 (součástky funkčně kompatibilní s 7493 rodinou)](https://www.ti.com/product/SN74LS293): funkční charakteristika čtyřbitového čítače.
- [OpenSTEM: Registers, shift-register modes and counters](https://openstemlibrary.com/digital-electronics-chapter-5): SISO/SIPO/PISO/PIPO, čítací architektury a zpoždění.

Odkazy jsou odborné referenční podklady, nikoli zdroj školního schválení maturity.

## 2. Maturitní minimum a prohloubení

**Jádro:**
- registr jako vícebitová paměť složená z klopných obvodů;
- paralelní načtení, uchování a posuv;
- SISO, SIPO, PISO, PIPO; SHL, SHR, ROL, ROR;
- čtení časových diagramů s hodinovými hranami, starým a novým stavem;
- binární/dekadický čítač, UP/DOWN, modulo M, 2ⁿ kombinací, maximální číselná hodnota;
- synchronní × asynchronní čítač, význam ripple zpoždění;
- dělení frekvence u plného binárního čítače;
- RESET, LOAD, ENABLE, přenos/podtečení; zkrácený cyklus 0…4;
- jednoduché průmyslové použití.

**Rozšíření / odborné doplnění:**
- úplná tabulka následného stavu pro tříbitový synchronní čítač a odvození `D0=¬Q0`, `D1=Q1⊕Q0`, `D2=Q2⊕(Q1·Q0)`;
- návrh nepoužívaných stavů u modulo 5;
- problematika glitch/hazard u ripple přechodu;
- odlišnost frekvenčního chování modulo 10 a plného binárního cyklu;
- historické komponenty 7490/7493 a model PLC CTU, včetně ošetření zákmitu.

**Hranice témat:** samostatné RS/D/JK a bistabilita patří k otázce 05. Obecné paměti RAM/ROM/Flash a detailní časovače patří do příslušné širší maturity (8 nebo další otázky), nikoli primárně sem.

## Pedagogická revize výukového průvodce (27. 11. 2026)

**Počet kroků nevzniká z číselné šablony.** Závisí na tom, kolik samostatných předpokladů je nutné vysvětlit, než student bez hádání odpoví na další otázku. První verze měla mechanických 10 kroků a nepřirozené pořadí: SIPO až za čítači, chybějící samostatné ověření CLK/LOAD/HOLD, časového diagramu, modulo 5 a řídicích povelů.

**Nová pedagogická struktura:**
- **I. Registry a přenos dat (6 kroků)**: (1) čtyřbitová paměť z klopných obvodů, (2) okamžik načtení CLK a režimy LOAD/HOLD, (3) SHL/SHR, (4) ROL/ROR, (5) sériový/paralelní přenos a SIPO, (6) čtení časového diagramu s jedním krokem po hraně.
- **II. Čítače a časování (7 kroků)**: (7) čítač versus registr; (8) přetečení a 2ⁿ stavů; (9) binární a dekadické modulo 16 a 10; (10) modulo 5 a minimální počet bitů; (11) UP/DOWN, ENABLE, RESET, LOAD; (12) synchronní a ripple čítače; (13) dělení frekvence na plném binárním cyklu.
- **III. Použití v praxi (1 krok)**: (14) PLC CTU, počet výrobků a význam náběžné hrany.

Výklad je základní a vstřícný, ale netvrdí, že 14 odpovědí s výběrem možností nahrazuje ústní maturitu. Každý krok má krátký didaktický text, interaktivní ukázku, otázku s kontrolovanou odpovědí a vysvětlení. Po průchodu má student ještě samostatně umět slovně popsat obvod, časový diagram a schéma. Studijní materiály a původní odborná osnova včetně simulací zůstávají v rozbalené/rozbalitelné části.

**Technický zásah při revizi:** opravena chybně vložená struktura HTML z předchozího průchodu rekonstruováním původního `index.html` a vložením průvodce až před původní navigaci; zachováno přesné znění deseti odborných kapitol a původní JS simulace. `guide.js` odvozuje celkový počet kroků ze zdrojového pole a neobsahuje pevně zakódovanou hodnotu deset. Starý lokální pokrok používá odlišný klíč `v1`, nově `v2`, aby nepomíchal správné odpovědi v odlišném pořadí. `tests/mer06-guided-course.test.js` ověřuje novou návaznost, všech 14 kontrolních otázek a strukturu stránky.

**K revizi:** pro konečné maturitní minimum ještě porovnat přesné schválené znění otázky a ověřit, že student umí samostatně nakreslit jednoduché schéma, číst diagram a vysvětlit příčinu změny bitů, nikoli jen vybrat správnou odpověď.

## 3. Obsah výukového webu

| Součást | Umístění v repozitáři | Účel | Stav |
|---|---|---|---|
| Souvislý výklad | `mechatronika/maturita/06-registry-citace/index.html` | Tři úvodní odstavce, 10 rozbalovacích ústních odpovědí a 10 odborných kapitol | IMPLEMENTOVÁNO |
| Interaktivní aplikace | `mechatronika/maturita/06-registry-citace/app.js` | 4bitový registr s LOAD/HOLD/SHL/SHR/ROL/ROR, SIPO krokování, modulo čítač, ripple mezistavy, frekvenční dělení, PLC CTU, pětiotázkový kvíz | IMPLEMENTOVÁNO |
| Sdílené výpočtové jádro | `assets/js/sequential-blocks-core.js` | Čisté modely se vstupy/rozsahy, registr, čítače, časové stavy, výstupní bity, CTU s detekcí náběžných hran | IMPLEMENTOVÁNO |
| Vzhled | `mechatronika/maturita/06-registry-citace/lesson.css` | Raleway, školní paleta, responzivní tabulky, registr, bitový a čítací displej | IMPLEMENTOVÁNO |
| Navigace | `mechatronika/maturita/index.html` | Aktivní karta otázky 06 | IMPLEMENTOVÁNO |
| Automatické testy | `tests/sequential-blocks-core.test.js`, `.github/workflows/mer06-tests.yml` | 4bitové posuvy/rotace, SIPO 1,0,1,1, modulo 5/10/16, ripple přechod 0111→1000, PLC CTU, syntaxe a obsah stránky | [PASS](https://github.com/lkostak/skola-vdf/actions/runs/45070173132) |
| Nasazení | GitHub Pages | Publikovaná studentská HTML stránka | [Úspěšné nasazení](https://github.com/lkostak/skola-vdf/actions/runs/45070189788) |

### Přehled kapitol

1. D klopný obvod → 4bitový registr a čítač.
2. Paralelní a posuvný registr, SISO/SIPO/PISO/PIPO.
3. SHL/SHR/ROL/ROR na čtyřbitovém vzoru 1011.
4. Čtení časové tabulky a SIPO 1,0,1,1.
5. Binární, dekadické a zkrácené modulo cykly.
6. Synchronní a asynchronní ripple čítač.
7. Dělení frekvence f/2, f/4, f/8, f/16.
8. RESET, LOAD, ENABLE a návrh modulo 5.
9. 7490/7493 a PLC CTU s předvolbou.
10. Maturitní ověření a model ústní odpovědi.

## 4. Tisková sada pro revizi

| Materiál | Rozsah | Popis | Stav |
|---|---|---|---|
| Studijní text | **26 stran A4** | Nově autorsky vypracovaný souvislý výklad v češtině, schémata, tabulky, deset dodatečných řešených technických laboratoří A–J, model ústní odpovědi, 20 kontrolních otázek | PŘIPRAVENO K REVIZI, NEZVEŘEJNĚNO |
| Studentský pracovní list | **8 stran A4**, 14 úloh, **100 bodů** | Volné plochy pro schémata, časové tabulky, posuvy, stavové cykly, dělení frekvence, CTU a ústní miniobhajobu | PŘIPRAVENO K REVIZI, NEZVEŘEJNĚNO |
| Neveřejný učitelský klíč | **4 strany A4** | Všech 14 komentovaných řešení, dílčí maxima, metodické poznámky | **NEPUBLIKOVAT DO PUBLIC REPO** |

PDF jsou vytvořena v konverzačním pracovním kontejneru `/mnt/data/mer06/output/` (nejsou součástí repozitáře ani veřejného webu). Propojení studentských PDF až po pedagogickém schválení; učitelský klíč ponechat mimo veřejné úložiště.

## 5. Omezení simulací a fyzikální přesnost

- Model používá **ideální digitální stavy**, nikoli fyzikální simulaci skutečných tranzistorových či TTL napětí.
- Registr: v každé akci simuluje jednu rozhodnou hranu. SHL a SHR mají definovaný sériový vstup SI; ROL/ROR vracejí odcházející bit na druhý konec. Grafické bity jsou v pořadí **b3,b2,b1,b0**.
- SIPO: sériový vstup vstupuje do **Q0** a posouvá k vyšším vahám, proto `1,0,1,1` způsobí `0001,0010,0101,1011` po čtyřech hranách.
- Binární/decimální čítač: následující stav podle modulo a UP/DOWN; `LOAD` a `RESET` jsou explicitní povely modelu. Skutečnou synchronnost či asynchronnost těchto vstupů musí vždy určit konkrétní výrobce/typ.
- Ripple přechod: `0111→0110→0100→0000→1000` je **didaktická možná posloupnost** pro zvolený postupný model, nikoli univerzální časový diagram 7493. Skutečná zpoždění a polaritu určuje zapojení.
- Dělení frekvence Q0…Q3 výrazem f/2…f/16 předpokládá **plný neomezený binární čítač**, nikoli modulo 10 nebo 5.
- PLC CTU: přičítá při **nové náběžné hraně CU**; vyhodnocuje `Q=CV≥PV`, `R` nulování, kapacita didaktického čítače maximálně 999. Nejde o úplný emulátor konkrétního výrobce ani o řešení bezpečnosti stroje.
- 7490/7493: historické obvody, žádná tvrzení o univerzálním přednastavení LOAD bez datasheetu.

## 6. Kontrolní a schvalovací seznam

- [x] Projít pracovní školní zdroje a ŠVP.
- [x] Vypracovat jeden souvislý webový výklad s 10 ústními body a 10 kapitolami.
- [x] Připravit interaktivní registrové/čítačové funkce se sdíleným výpočtovým jádrem.
- [x] Ověřit syntax a řadu modelových sekvencí: [CI PASS](https://github.com/lkostak/skola-vdf/actions/runs/45070173132).
- [x] Propojit do maturitního rozcestníku.
- [x] Vytvořit tiskovou sadu 26 + 8 + 4 strany a otestovat všechny stránky na prázdný text, klip a ořez.
- [ ] Učitel přečte a odborně reviduje všechny kapitoly, deset laboratoří a modelové řešení.
- [ ] Učitel ověří vhodnost zadání, délku pracovní činnosti a bodování.
- [ ] Ověřit interakce na konkrétním telefonu a projektoru.
- [ ] Přiložit a důsledně porovnat úplné **schválené znění maturitní otázky 06**.
- [ ] Po schválení publikovat jen studentské PDF.
- [ ] Zaznamenat revizi v `.github/maturita/REVIEW.md` a teprve pak změnit stav na HOTOVO.

**Závěr:** tvorba byla provedena, ale schvalovací krok zůstává výslovně otevřený.
