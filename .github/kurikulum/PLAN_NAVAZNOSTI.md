# Pracovní plán návaznosti ŠVP na výuku, úlohy a maturitu

**Verze:** 0.1 · **Datum:** 2026-11-22 · **Stav:** **NÁVRH, nikoli výkaz odučeného či ověřeného obsahu**.

**Zdroj pravdy o výstupech a učivu:** [3. ročník](VYSTUPY_3_ROCNIK.md) a [4. ročník](VYSTUPY_4_ROCNIK.md). **Výchozí inspirace pro maturitní vazby:** naše dřívější pracovní „Mapa maturitních témat“ (20 témat), nikoli zveřejněný originál oficiálních zadání; všechny označené číslice `Mxx` jsou proto **návrhy ke schválení**.

## Jak číst plán

- Jeden řádek = jeden **tematický blok učiva**, který zahrnuje definované jednotlivé výstupy `MER3-Vxxx` nebo `MER4-Vxxx`. Jednotlivé výstupy jsou popsány doslovně v hlavních maticích.
- **Návrh lekce** je název budoucího obsahu, **není** to tvrzení o existenci na webu. Vazba na maturitu je tematická, **není** důkazem kompletního pokrytí oficiální otázky.
- **Ověření** je návrh konkrétní činnosti pro studenta. Po vyrobení úlohy doplnit její ID, URL, správné výsledky a vyhodnocení.
- **Stav** zůstává `PLÁN`, dokud není doložena skutečná studijní stránka a kontrola kvality. Existující materiál 05A je evidován jako **dílčí a neověřený**.

## 3. ročník · 14 bloků / 47 výstupů

| Blok | Výstupy | Návrh lekce / tématu | Praktický důkaz či úloha | Maturita, pracovní vazba | Typ výstupu | Existující důkaz |
|---|---|---|---|---|---|---|
| `MER3-U01` | `MER3-V001–V004` | Automatizace: ovládání, regulace a podmínky zavedení | Analyzuj dva výrobní procesy: kde je ovládání, kde regulace a proč? | M14 (regulace), širší úvod* | nová lekce + případová studie | — |
| `MER3-U02` | `MER3-V005–V007` | Prostředky automatizace: média, snímače, zesilovače | Vyber vhodný snímač a zesílení pro teplotu/průtok/polohu; zdůvodni volbu | M20 (snímače)* | nová lekce + laboratorní měření | — |
| `MER3-U03` | `MER3-V008–V010` | Kontaktní a integrovaná logika, ovládací schémata | Navrhni a překresli START/STOP obvod jako liniové a logické schéma | M3–5, 19* | nová lekce + návrhové cvičení | — |
| `MER3-U04` | `MER3-V011–V015` | Číslicová reprezentace, hradla, sekvenční logika a paměti | Vyplň tabulky, navrhni logiku a vysvětli paměť RS/D v řízení motoru | M1–6, 8, 13* | komplexní výklad + simulace + cvičení | 05A existuje jen jako dílčí výklad; neověřeno vůči celému ŠVP |
| `MER3-U05` | `MER3-V016` | Vývoj a typové řady mikroprocesorových systémů | Porovnej parametry dvou mikrořadičů a vhodnost jejich nasazení | M7* | nová lekce + srovnávací úloha | — |
| `MER3-U06` | `MER3-V017–V020` | Architektura mikropočítače, registry, hodiny, I/O | Nakresli mikrořadič a vysvětli průchod signálu od senzoru po výstup | M6–8* | nová lekce + blokový návrh | — |
| `MER3-U07` | `MER3-V021–V029` | Programování, komunikační režimy, vývoj, testování | Naprogramuj a otestuj jednoduchý řídicí algoritmus; zdokumentuj chyby | M9–11* | série lekcí + projekt | — |
| `MER3-U08` | `MER3-V030` | Podpůrné a stykové obvody, periferie, paměti | Navrhni blokové propojení procesoru se snímačem a akčním členem | M7–8* | nová lekce + zapojovací cvičení | — |
| `MER3-U09` | `MER3-V031` | Externí/interní přerušení a obsluha | Porovnej polling a přerušení při obsluze tlačítka, ukaž chování programu | M8, 10* | lekce + simulace časování | — |
| `MER3-U10` | `MER3-V032–V036` | Zpožďovací smyčky a perioda časování | Porovnej programovou smyčku a časovač; změř nebo vypočítej časovou odchylku | M8, 10* | laboratorní úloha | — |
| `MER3-U11` | `MER3-V037–V038` | Řízení rychlosti běhu programu (přesná interpretace ŠVP) | Model časování programu; vysvětli, co ovlivňuje frekvenci a takt řízení | M10, 14* | téma k odbornému upřesnění + úloha | ŠVP formulace neobvyklá; před zpracováním vyžaduje výklad garanta |
| `MER3-U12` | `MER3-V039` | Akční členy a jejich řízení | Zvol vhodný elektrický/pneumatický/hydraulický pohon pro manipulátor | M18–19* | nová lekce + výběrová úloha | — |
| `MER3-U13` | `MER3-V040–V043` | Zpětná vazba, regulační bloky, dynamika a jakost | Nastav P/PI/PID v modelu a vyhodnoť přeregulování a ustálení | M14–17* | blok lekcí + simulátor regulace | — |
| `MER3-U14` | `MER3-V044–V047` | Spojitá, nespojitá a diskrétní regulace, vzorkování | Porovnej spojitý a diskrétní signál při různých periodách vzorkování | M14, 17, 20* | lekce + simulace vzorkování | — |

## 4. ročník · 18 bloků / 42 výstupů

| Blok | Výstupy | Návrh lekce / tématu | Praktický důkaz či úloha | Maturita, pracovní vazba | Typ výstupu | Existující důkaz |
|---|---|---|---|---|---|---|
| `MER4-U01` | `MER4-V001–V006` | Akční členy, výkonové rozhraní, motory a signalizace | Navrhni řízení a reverzaci motoru s rozhraním a ochranou procesoru | M14, 18–19* | lekce + laboratorní ověření | — |
| `MER4-U02` | `MER4-V007–V009` | Výběr pokročilejšího mikroprocesoru a vývojové prostředí | Vyber vhodný MCU podle I/O, času, paměti a nástrojů; obhaj volbu | M7, 10* | lekce + srovnávací úloha | — |
| `MER4-U03` | `MER4-V010` | Bezpečný návrh řídicího systému | Vypracuj scénáře bezpečného zastavení a oddělení výkonového obvodu | M11, 19* | bezpečnostní případová studie | — |
| `MER4-U04` | `MER4-V011–V014` | Analogové, digitální a inteligentní snímače | Vyber snímač, popiš fyzikální limit a otestuj přepočet jeho signálu | M20* | lekce + měřicí laboratoř | — |
| `MER4-U05` | `MER4-V015–V018` | PLC: architektura, vstupy/výstupy a pracovní cyklus | Sestav blokové schéma PLC a přiřaď vstupy/výstupy jednoduchému stroji | M11* | lekce + praktické zadání | — |
| `MER4-U06` | `MER4-V019` | PLC: logické instrukce | Realizuj vzájemné blokování dvou výstupů; vysvětli pravdivostní tabulku | M3, 11* | lekce + PLC cvičení | — |
| `MER4-U07` | `MER4-V020–V022` | PLC: algoritmizace, vývoj, ladění a testování | Naprogramuj sekvenci dopravníku a ověř správné i chybové stavy | M9–11* | blok lekcí + projekt dopravníku | — |
| `MER4-U08` | `MER4-V023` | PLC: časově závislé procesy | Použij časovače pro sekvenci zařízení, otestuj chování při změně vstupu | M8, 11* | lekce + PLC laboratorní úloha | — |
| `MER4-U09` | `MER4-V024–V025` | Registry a vektorové signálové operace | Zpracuj stavový registr a bitové masky; vysvětli mapování bitů na I/O | M6, 8, 11* | lekce + výpočet a program | — |
| `MER4-U10` | `MER4-V026` | Vzorkování, AD/DA převod a rekonstrukce | Převeď analogové napětí na kód ADC a zpět; ověř chybu kvantování | M20* | lekce + simulace/pokus | — |
| `MER4-U11` | `MER4-V027` | Čítače PLC | Naprogramuj počítání výrobků se resetem a detekcí cílové hodnoty | M6, 8, 11* | lekce + PLC cvičení | — |
| `MER4-U12` | `MER4-V028` | Tlačítka a zákmit kontaktu | Proveď pozorování zákmitů a navrhni softwarové ošetření | M5, 11, 20* | lekce + měřicí cvičení | — |
| `MER4-U13` | `MER4-V029–V030` | Synchronní/asynchronní přenos a zobrazování | Přenes naměřenou hodnotu do zobrazovače a diagnostikuj chyby | M7, 11, 20* | lekce + komunikační cvičení | — |
| `MER4-U14` | `MER4-V031` | Sériové a paralelní porty, UART/I2C/SPI | Srovnej komunikační rozhraní a připoj vybranou periferii | M7, 10, 11* | lekce + HW laboratorní úloha | — |
| `MER4-U15` | `MER4-V032` | Procesy běžící v reálném čase | Navrhni řízení semaforu/dopravníku s časovými a bezpečnostními podmínkami | M9–11* | projekt se scénáři a testy | — |
| `MER4-U16` | `MER4-V033–V038` | Rozšířené PLC řízení, algoritmy a návrh PID | Vytvoř PLC řízení technologického modelu; doplň a nastav PID regulátor | M11, 14–15* | blok lekcí + projekt + simulace PID | — |
| `MER4-U17` | `MER4-V039–V041` | Robotika, kinematika, řízení a autonomní systémy | Sestav a odlaď jednoduchý autonomní robotický systém; obhaj kinematiku | M12* | blok lekcí + robotický projekt | — |
| `MER4-U18` | `MER4-V042` | Časová/frekvenční oblast, derivace, integrál, Laplace a Fourier | Porovnej přechodovou odezvu a frekvenční charakteristiku; vysvětli účel transformací | M16–17* | lekce + vizualizační simulace | — |

*Čísla maturity uvádějí vazbu na dříve analyticky zpracovaný **pracovní seznam 20 témat**, nikoli doslovná oficiální zadání. Zápis `M1–6` nebo `M14–17` = orientační rozsah témat, který bude při převodu na přesné znění nutné specifikovat. Rozsah 20 témat **neimplikuje**, že každé učivo musí být samostatnou maturitní otázkou.*

## Shrnutí skutečné dostupnosti obsahu k 2026-11-22

Proveden audit stromu repozitáře `lkostak/skola-vdf`: stávající studentský web má rozcestník maturitních otázek a konkrétní učivo `05-sekvencni-logika/` a `05a-pamet-rs/`. **Žádná z těchto skutečností sama o sobě neprokazuje úplné pokrytí ani jednoho výstupu ŠVP.** V současném repozitáři nejsou doložené plné lekce 3./4. ročníku, katalog laboratorních úloh, oficiální úplný seznam 20 maturitních zadání ani důkazy jejich zvládnutí studenty. To není tvrzení, že se látka fakticky nevyučovala nebo že učitel nemá materiály jinde.

| Přehled | Hodnota | Co znamená |
|---|---:|---|
| Zapsané řádkové výstupy ŠVP | **89** | 47 + 42 v samostatných maticích |
| Tematické bloky učiva | **32** | 14 + 18 skupin podle původních tabulek |
| Výstupy s doloženým kompletním pokrytím na webu | **0** | **stav auditu**, nikoli závěr o odučené látce |
| Výstupy s dílčí webovou návazností | **nejméně 1 kandidát** | MER3-V012 → výklad 05A o paměti / sekvenční logice, obsahově nutno zkontrolovat |
| Schválená vazba na oficiální maturity | **0 ověřených** | známe pouze pracovní analytickou mapu témat; doslovná oficiální zadání chybí |

## Doporučené kroky k doplnění důkazů

1. **Ověřit správnou verzi ŠVP** a případné dodatky pro aktuální školní rok. Zdroj je evidován v [README](README.md).
2. **Ověřit oficiální maturitní zadání**, doslovně včetně každého podbodu. Pracovní témata výše pak změnit na potvrzené odkazy a mapovat jednotlivé podbody, nejen celé otázky.
3. Vytvořit jednotlivé lekce podle [výukového standardu](../vyuka/README.md) a úlohy podle [standardu úloh](../ulohy/README.md). Z každého vytvořeného materiálu vést zpětný odkaz na relevantní `MERx-Vxxx`.
4. Doplňovat **přímé** odkazy v řádcích hlavních matic a zapisovat, co přesně student dělá a jak se hodnotí správnost.
5. Po výuce evidovat **ODUČENO** a po ověřovací úloze **OVĚŘENO**, vždy odděleně od **MATERIÁL HOTOVO**.
6. Revidovat těžká nebo nejednoznačná místa původního ŠVP, zejména `MER3-U11` (formulace o rychlosti běhu programu) a `MER4-U18` (matematická hloubka časové/frekvenční oblasti). Zaznamenat výklad schválený garantem.

**Poznámka:** Návrh úlohy slouží ke konkretizaci požadované dovednosti. Nenahrazuje závazné znění ŠVP ani oficiální maturitní zadání.
