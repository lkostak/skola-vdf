# Mechatronika a robotika · 3. ročník · 32 témat pro školní rok 2026/27

**Status:** nové pedagogické rozvržení k revizi, nevydává se za schválený tematický plán ani již odučené učivo.

**Závazné obsahové vodítko:** [ŠVP Elektrotechnika – Mechatronika 2024](https://www.skolavdf.cz/file/1942y5b91jst1qyxttb3iglh5n47w2by/svp-ele-2024.pdf?v=251017013451), předmět Mechatronika a robotika, 3. ročník, s. 475–479; [doslovný registr 47 výstupů a 14 bloků učiva](../kurikulum/VYSTUPY_3_ROCNIK.md).

**Inspirace a kontrolní podklad:** tematický plán Radka Boháče 2025/26 (`TP-MER4.pdf`, uvnitř 3. ročník, 15 tematických okruhů, 96 hodin); doslovný starší [převod 15 okruhů do 32 tříhodinovek](ARCHIV_TP_3_2025_26_PREVOD.md) zůstává zachovaný. **Nepřebíráme jeho dílčí hodinové kvóty jako závaznou organizaci hodin:** letos máme 32 nově formulovaných, jednoznačných témat po 3 hodinách. Neměníme celkovou hodinovou dotaci 96 hodin.

**Studentský web:** [Přehled 32 témat](../../mechatronika/vyuka/3-rocnik/index.html). Na studentské stránce se **nesmí zobrazovat** metodické komentáře, původní čísla výstupů ŠVP, poznámky o revizích, pedagogické polemiky ani nečitelná tabulka původních hodin. Student vidí jen 5 skupin, 32 témat a stručný popis.

## 1. Přehled pěti celků

| Celek | Název | Témata | Tříhodinovek | Hodin |
|---|---|---|---:|---:|
| A | Automatizace a technické základy | 01–05 | 5 | 15 |
| B | Číslicová technika a mikropočítače | 06–13 | 8 | 24 |
| C | Programování řídicích systémů | 14–21 | 8 | 24 |
| D | Akční členy a praktické řízení | 22–24 | 3 | 9 |
| E | Regulace a číslicové řízení | 25–32 | 8 | 24 |
| **Celkem** | | **01–32** | **32** | **96** |

## 2. Přehled všech 32 témat

| Téma | Skupina | Název | Stručný obsah | ŠVP učivo (pracovní) | ŠVP výstupy (pracovní) |
|---:|:---:|---|---|---|---|
| 01 | A | Co je automatizace? | Proč automatizujeme, co znamená ovládání a regulace a kdy má automatizace smysl. | `MER3-U01` | `MER3-V001`, `MER3-V002`, `MER3-V003`, `MER3-V004` |
| 02 | A | Elektrické, pneumatické a hydraulické systémy | Prostředky automatizace, používaná média a základní schematické značky. | `MER3-U02` | `MER3-V005` |
| 03 | A | Snímače a měření veličin | Jak měříme teplotu, tlak, polohu, otáčky a další fyzikální veličiny. | `MER3-U02` | `MER3-V006` |
| 04 | A | Signály, zesilovače a napájení | Cesta informace ze snímače do řídicí jednotky a zdroje energie pro systém. | `MER3-U02` | `MER3-V007` |
| 05 | A | Kontaktní a logická schémata | Kontakty, cívky, integrovaná logika a schémata ovládacích obvodů. | `MER3-U03` | `MER3-V008`, `MER3-V009`, `MER3-V010` |
| 06 | B | Dvojková soustava a logické úrovně | Bity, nuly a jedničky, dvojková soustava a zobrazení informace v počítači. | `MER3-U04` | `MER3-V011` |
| 07 | B | Booleova algebra a logická hradla | Operace AND, OR, NOT, další hradla a pravdivostní tabulky. | `MER3-U04` | `MER3-V011`, `MER3-V012` |
| 08 | B | Kombinační logické obvody | Obvody, jejichž výstup závisí na aktuálních vstupech; sčítačka a dekodér. | `MER3-U04` | `MER3-V012` |
| 09 | B | Sekvenční logické obvody | Obvody, které si pamatují stav; zpětná vazba, RS a hodinový signál. | `MER3-U04` | `MER3-V012` |
| 10 | B | Paměti, registry a čítače | Uložení informací v RAM/ROM, registr jako skupina bitů a počítání impulsů. | `MER3-U04`, `MER3-U06` | `MER3-V013`, `MER3-V018` |
| 11 | B | Mikroprocesory a mikrořadiče | Vývoj a typy procesorových systémů, základní rozdíly a použití. | `MER3-U04`, `MER3-U05` | `MER3-V014`, `MER3-V015`, `MER3-V016` |
| 12 | B | Architektura mikropočítače | Procesor, paměť, sběrnice, programovatelné pole a podpůrné obvody. | `MER3-U04`, `MER3-U06` | `MER3-V014`, `MER3-V017`, `MER3-V018` |
| 13 | B | Hodiny, vstupy a výstupy | Synchronizace, registry a vstupně-výstupní obvody mikrořadiče. | `MER3-U06` | `MER3-V018`, `MER3-V019`, `MER3-V020` |
| 14 | C | Algoritmy a vývojová prostředí | Postup programování, jednoduché algoritmy a symbolické adresy. | `MER3-U07` | `MER3-V021`, `MER3-V023`, `MER3-V024`, `MER3-V025` |
| 15 | C | Programování mikrořadiče | Řízení digitálních vstupů a výstupů například na Arduinu. | `MER3-U07` | `MER3-V021`, `MER3-V024`, `MER3-V025`, `MER3-V026` |
| 16 | C | PLC a žebříčkové diagramy | Jak se programuje řídicí systém pomocí kontaktů a cívek. | `MER3-U07` | `MER3-V023`, `MER3-V025`, `MER3-V026` |
| 17 | C | Programování funkčních bloků | Grafické programování řídicích systémů a propojení funkčních bloků. | `MER3-U07` | `MER3-V025`, `MER3-V026` |
| 18 | C | Stavové řízení zařízení | Postupné kroky automatického zařízení a práce se stavy. | `MER3-U07` | `MER3-V023`, `MER3-V026`, `MER3-V029` |
| 19 | C | Sériová komunikace a periferie | Jak si zařízení předávají informace a jak fungují stykové obvody. | `MER3-U06`, `MER3-U07`, `MER3-U08` | `MER3-V020`, `MER3-V022`, `MER3-V030` |
| 20 | C | Přerušení a časování programu | Interní a externí přerušení, časovače, zpožďovací smyčky a jejich obsluha. | `MER3-U07`, `MER3-U09`, `MER3-U10`, `MER3-U11` | `MER3-V027`, `MER3-V028`, `MER3-V031`, `MER3-V032`, `MER3-V033`, `MER3-V034`, `MER3-V035`, `MER3-V036`, `MER3-V037`, `MER3-V038` |
| 21 | C | Ladění, testování a bezpečnost | Jak najít chybu, ověřit spolehlivost a bezpečně navrhnout program. | `MER3-U07` | `MER3-V026`, `MER3-V028`, `MER3-V029` |
| 22 | D | Relé, spínací prvky a elektromotory | Způsoby elektrického spínání a řízení pohybů. | `MER3-U12` | `MER3-V039` |
| 23 | D | Pneumatické a hydraulické pohony | Válce, rozváděče a pohony využívající stlačený vzduch nebo kapalinu. | `MER3-U12` | `MER3-V039` |
| 24 | D | Praktický projekt řízení zařízení | Propojení snímače, programu a akčního členu do funkčního systému. | `MER3-U07`, `MER3-U12` | `MER3-V026`, `MER3-V029`, `MER3-V039` |
| 25 | E | Regulace a zpětná vazba | Regulační smyčka, snímač, požadovaná hodnota a regulační odchylka. | `MER3-U11`, `MER3-U13` | `MER3-V037`, `MER3-V038`, `MER3-V040`, `MER3-V041` |
| 26 | E | Bloková schémata regulačních obvodů | Regulátor, regulovaná soustava a veličiny ve schématu. | `MER3-U13` | `MER3-V040`, `MER3-V041` |
| 27 | E | Přenosy a skládání bloků | Co vyjadřuje přenos a jak se propojují jednotlivé části obvodu. | `MER3-U13` | `MER3-V041` |
| 28 | E | Přechodové a frekvenční charakteristiky | Jak zařízení reaguje na změnu vstupu nebo na různé frekvence. | `MER3-U13` | `MER3-V042`, `MER3-V043` |
| 29 | E | Regulátory P, I, D, PI a PID | Jak se regulátor rozhoduje a proč mají jeho jednotlivé složky různé účinky. | `MER3-U13` | `MER3-V040`, `MER3-V043` |
| 30 | E | Regulované soustavy a stabilita | Statické a astatické soustavy, přeregulování a kvalita regulace. | `MER3-U13` | `MER3-V042`, `MER3-V043` |
| 31 | E | Analogová a číslicová regulace | Spojitý a diskrétní čas, analogové a číslicové hodnoty, jejich výhody a omezení. | `MER3-U11`, `MER3-U14` | `MER3-V037`, `MER3-V038`, `MER3-V044`, `MER3-V045`, `MER3-V046`, `MER3-V047` |
| 32 | E | Vzorkování, kvantování a číslicový regulátor | Jak převádíme měřené signály na čísla a používáme je v programu regulátoru. | `MER3-U14` | `MER3-V044`, `MER3-V045`, `MER3-V046`, `MER3-V047` |

## 3. Pravidla tvorby lekcí

- **Jen několik podstatných myšlenek na tříhodinovku.** Srozumitelný výklad, názorný příklad a praktická práce, ne encyklopedie.
- Každá lekce má 3 × 45 minut, ale scénář nemusí být rozdělen na tři izolované prezentace.
- K jednotlivým tématům budeme postupně doplňovat vlastní výukové stránky, simulace a praktické úlohy podle [standardu výuky](README.md).
- **Názvy na rozcestníku jsou pro studenty.** Původní 15okruhový plán zůstává jako interní kontrolní zdroj, nikoli jako studentský navigační systém.
- **Pokrytí ŠVP není ještě ověřeno:** tabulka pouze předběžně přiřazuje všech 47 výstupů a 14 skupin učiva. U každého tématu je potřeba při tvorbě konkrétního materiálu doložit výklad → činnost studenta → ověření.
- ŠVP požaduje také odborně náročné přechodové děje vyšších řádů a frekvenční charakteristiky; v tématu 28 je nutné přidat konkrétní řešený příklad, ne pouze pohled na graf.
- Formulaci `MER3-V037` a `MER3-V038` o „rychlosti běhu programu“ **neinterpretovat svévolně jako regulaci otáček motoru**. K přesnému zadání lekcí 20/31 vyžádat odborné upřesnění.
- V laboratoři mikroprocesorové a automatizační techniky platí limit počtu studentů na pedagoga dle ŠVP; fyzické pokusy musí být bezpečné.

## 4. Pedagogické ověření

Plánové pokrytí ŠVP je 47 z 47 výstupů a 14 ze 14 skupin učiva. **Jde o kontrolu přítomnosti, nikoliv o výsledek odborné revize nebo ověření při výuce.** Stav všech 32 témat zatím `OSNOVA`.

Následuje zpracování tématu 01 „Co je automatizace?“ nejprve jako jednoduché vizuální lekce, a potom další témata.
