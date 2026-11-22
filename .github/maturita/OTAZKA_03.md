# Maturitní otázka 03 · Základní logické funkce

**Produkční záznam v0.1 · 2026-11-22**  
**Stav:** PRACOVNÍ VÝUKOVÝ PROTOTYP A TISKOVÉ MATERIÁLY PŘIPRAVENY K REVIZI · NIKOLIV HOTOVO  
**Podoba studentské stránky:** jedna souvislá interaktivní lekce. Dělení na části A/B **není povinný vzor**.

> **Školní schválení:** z interní pracovní mapy známe název „Základní logické funkce“ a podrobný doporučený rozsah. Přesné schválené oficiální zadání maturity včetně případných podotázek nebylo nezávisle doloženo. Celou otázku je tedy nutné nejprve odborně, pedagogicky a podle schváleného zadání revidovat.

## 1. Prameny, školní rozsah a odborná kontrola

1. `Mechatronika_maturitni_otazky_1-8_editovatelna_tabulka.docx` (pracovní zdroj, 2026): k otázce 3 uvádí logické proměnné/úrovně, NOT/AND/OR/NAND/NOR/XOR/XNOR, pravdivostní tabulky, základní zákony Booleovy algebry, jejich úpravy a **obdélníkové značky podle IEC**. Student má poznat funkci, odvodit tabulku, zapsat výraz, použít zákony a číst/kreslit IEC značky.
2. `Maturitni_otazka_03_Zakladni_logicke_funkce_skripta.docx` (14.09.2026, předchozí rozsáhlá autorská práce), **30 stran**: devatenáct sekcí včetně 48 procvičovacích úloh, řešení, laboratorních cvičení, diagnostiky, PLC, fyzikálních úrovní a maturitní odpovědi. Nové **30stránkové PDF** je konverzí tohoto dřívějšího DOCX, nikoli nově napsanou publikací.
3. `Maturitni_otazka_03_Zakladni_logicke_funkce_skripta(1).docx` (14.09.2026, kratší 23stránková alternativa): doplňující perspektiva, zejména slovní výklad a aplikace. Není přímým zdrojem tiskového PDF.
4. `Mapa_maturitnich_temat_A3.docx`: v maturitním jádru uvádí NOT, AND, OR, NAND, NOR, XOR a případně XNOR, značku, výraz, slovní význam a tabulky; PLC a univerzální hradla jsou návaznosti.
5. ŠVP `ŠVP Elektrotechnika – Mechatronika 2024` (platnost od **01.09.2022**): `MER3-U04` (PDF str. 477) uvádí „Booleova algebra“ a „logická hradla“, `MER3-V012` uvádí „navrhne jednoduché kombinační a sekvenční řídicí obvody“. Přiřazení této jedné otázky není samo o sobě důkazem splnění všech výstupů ŠVP.
6. Odborné zdroje k významu značek a hradel:
   - IEC, [IEC 60617 graphical symbols, snapshot](https://library.iec.ch/grasymb/grasymb.nsf/5FDC3327D03AD13DC125846A00501C93/%24FILE/IEC60617_Snapshot_2019-03-05.pdf): obdélníkové značky, zejména `≥1` pro OR;
   - TU Dresden, [Digital Systems, lecture](https://tu-dresden.de/ing/elektrotechnik/iee/hpsn/ressourcen/dateien/vorlesungen/sse_2019/Lecture_ICE_Digital_Systems.pdf?lang=de): výklad IEC značení;
   - TU Ilmenau, [Automation Engineering lecture notes](https://www.tu-ilmenau.de/fileadmin/Bereiche/IA/at/AT.215/AT.215.EN.Lecture_Notes_hidden.pdf): obdélníkové značky, invertující bublina;
   - Texas Instruments, [Logic Guide](https://www.ti.com/lit/sg/sdyu001ac/sdyu001ac.pdf): běžné logické funkce a součástky (pro kontrolu principů, nikoli konkrétní schémata tohoto pilotu).

## 2. Maturitní minimum a hranice otázky 03

**Maturitní jádro (M):**
- Význam logické proměnné a logické funkce, převod mezi fyzickým signálem a abstrakcí `0/1`.
- Úplná pravdivostní tabulka: pro `n` vstupů `2ⁿ` řádků.
- NOT, AND, OR, NAND, NOR, XOR, XNOR: slovní význam, tabulka, rovnice, názorný příklad.
- **Schématické obdélníkové značky IEC:** `1` pro NOT s negací výstupu, `&` AND, `≥1` OR, `=1` pro dvouvstupové XOR; malé negovací kolečko na výstupu pro NAND/NOR/XNOR.
- Základní Booleovy zákony: identita, dominance, idempotence, komplementarita, absorpce, distributivita; priorita závorek a operací.
- Oba De Morganovy zákony s ověřením pravdivostní tabulkou.
- Použití AND/OR v jednoduchém slovním a kontaktovém příkladu.

**Prohloubení (P):** realizace NOT, AND, OR pouze z NAND nebo NOR, série/paralela spínacích kontaktů, kontaktní logika PLC, aktivní nízká úroveň a fyzická logická napětí.

**Rozšíření (R):** zpoždění šíření, zákmit, plovoucí vstup, hazard, detailnější diagnostika. **Karnaughovy mapy, SOP/POS návrh, dekodéry a multiplexery patří otázce 04.** Paměť, klopné obvody a synchronizace patří otázkám 05/06.

## 3. Webová lekce a demonstrace

| Součást | Umístění | Účel | Stav |
|---|---|---|---|
| Jedna kompletní stránka | `mechatronika/maturita/03-zakladni-logicke-funkce/index.html` | Úvodní tři odstavce, **10 rozbalovacích ústních bodů**, **10 podrobných kapitol**, příklady, stavové tabulky, IEC značení | IMPLEMENTOVÁNO |
| Interaktivní UI | `mechatronika/maturita/03-zakladni-logicke-funkce/app.js` | Volba funkce, předpověď Y, odhalení vybraného řádku, De Morgan, NAND/NOR, PLC kontakty, závěrečný test | IMPLEMENTOVÁNO |
| Sdílený matematický model | `assets/js/logic-core.js` | Sedm hradel, dva a tři vstupy, De Morgan, univerzální realizace, kontaktový model, aktivní nula | IMPLEMENTOVÁNO |
| Vzhled | `mechatronika/maturita/03-zakladni-logicke-funkce/lesson.css` | Raleway, obdélníky IEC, mobilní a tisková podoba | IMPLEMENTOVÁNO |
| Hlavní maturitní rozcestník | `mechatronika/maturita/index.html` | Aktivní odkaz na otázku 03 | IMPLEMENTOVÁNO |
| Testy a CI | `tests/logic-core.test.js`, `.github/workflows/mer03-tests.yml` | 7 pravdivostních tabulek, De Morgan, univerzální NAND/NOR, kontaktová logika, syntaxe skriptů a obsah stránky | [CI PASS](https://github.com/lkostak/skola-vdf/actions/runs/45052794480) |

### Pořadí 10 výukových kapitol

1. Logická proměnná, 0/1 a skutečné úrovně.
2. Úplná pravdivostní tabulka pro dva a tři vstupy.
3. NOT, AND, OR, NAND, NOR, XOR, XNOR s aktivní předpovědí a tabulkou.
4. Sedm obdélníkových značek IEC: `1`, `&`, `≥1`, `=1`, invertující kroužky.
5. Rozlišení OR, XOR, XNOR.
6. Booleova algebra a základní zákony.
7. De Morgan s interaktivním porovnáním tabulky.
8. Univerzálnost NAND a NOR.
9. Kontakty v sérii/paralelně, PLC a fyzikální omezení.
10. Maturitní ověření se čtyřmi vysvětlenými otázkami a osnovou ústní odpovědi.

### Technické předpoklady výukových simulací

- Modelem je **ideální kombinační logika 0/1**; skutečné napěťové úrovně, zpoždění, hazard a zákmit nejsou fyzikálně modelovány.
- `XOR` a `XNOR` jsou v základních tabulkách a značkách **dvouvstupové**; `=1` zde odpovídá přesně jednomu aktivnímu vstupu.
- Předpověď výsledku hradla se vyhodnotí až po výběru očekávané hodnoty `Y`.
- `De Morgan` a realizace přes `NAND/NOR` používají stejné čisté modely jako základní sedm funkcí.
- PLC série/paralela je **didaktický příklad spínacích kontaktů**, nikoli bezpečnostní obvod, nouzové zastavení ani návrh skutečné bezpečnostní funkce.

## 4. Tiskové materiály pro revizi

| Materiál | Stav a obsah | Přístup |
|---|---|---|
| **Studijní PDF, 32 stran A4** | 30 stran originálních zářijových skript + **nový 2stránkový dodatek** se sedmi obdélníkovými značkami IEC, souhrnnou tabulkou, De Morgan a praktickými varováními | Zatím pouze v pracovním předání, NEVEŘEJNÉ |
| **Pracovní list studenta, 7 stran A4** | **14 úloh, celkem 100 bodů**. Části: proměnné, řádky tabulky, 7 funkcí, kreslení značek, převody slovních úloh, zákony, De Morgan, univerzální hradla, kontakty, ústní odpověď | Zatím pouze v pracovním předání, NEVEŘEJNÉ |
| **Řešení pro učitele, 4 strany A4** | Vysvětlené hodnoty, pravdivostní tabulky, vzorové rovnice, univerzální realizace, bodování 100 bodů | **UČITELSKÉ, NEZVEŘEJŇOVAT DO PUBLIC REPO** |

PDF jsou vytvořena v rámci konverzace a uložena v pracovním kontejneru. Záměrně nejsou kopírována do GitHubu, dokud je učitel nezkontroluje. První třicetistránková část studijního textu je převodem starého DOCX, **není nově napsaná**. Dvě stránky dodatku jsou nové. Všechny stránky byly vykresleny a prověřeny proti ořezu/klipu.

## 5. Otevřené otázky a schvalovací postup

- [x] Připravit úplnou jednotnou webovou stránku, deset ústních odpovědí, deset kapitol.
- [x] Implementovat interaktivní funkce s jediným logickým jádrem.
- [x] Publikovat odkaz v hlavním maturitním rozcestníku.
- [x] Připravit studijní PDF, studentský pracovní list a oddělený učitelský klíč.
- [x] Ověřit PDF render: studie **32 stran**, list **7**, klíč **4**; text uvnitř stránek, žádné přetékající bloky.
- [x] Zkontrolovat matematické logické modely automatickými testy: [PASS](https://github.com/lkostak/skola-vdf/actions/runs/45052794480).
- [ ] Nezávisle doložit přesné schválené školní zadání otázky 03 a ověřit úplnost materiálů.
- [ ] Učitel posoudí odborný výklad, web a 32stránkové PDF.
- [ ] Vlastní kontrola na mobilu a projektoru včetně klávesnice, formulářů a symbolů IEC.
- [ ] Učitel schválí pracovní list, bodování a oddělený klíč.
- [ ] Po schválení připojit na web pouze studentské PDF.
- [ ] Zapsat jméno revidující osoby, datum, vazby na ŠVP a závěrečný stav do `.github/maturita/REVIEW.md`.

**Otázka 03 je připravená k revizi, nikoli označená HOTOVO.**
