# Mechatronika a robotika · 3. ročník · tematický plán po tříhodinovkách 2026/27

**Stav:** PRACOVNÍ ROZPIS, obsah lekcí dosud z velké části nezpracován a pedagogicky neschválen.  
**Metoda:** Původních **15 tematických okruhů a 96 vyučovacích hodin** převést v přesném pořadí na **32 bloků po 3 × 45 minutách**, bez ztráty nebo přidání hodin jednotlivým okruhům.  
**Pramen:** Původní PDF uložené v uživatelově knihovně pod názvem **`TP-MER4.pdf`**, ačkoliv uvnitř je „Mechatronika a robotika 3. ročník“, **školní rok 2025/26**, vyučující Radek Boháč, **96 hodin**, 2 strany. Obsahově se shoduje s dřívějším `TP-MER3.pdf` (2022/23). V patičce PDF je tiskové datum 2. 9. 2026, ale hlavička uvádí 2025/26: tento rozpor nepovažujeme za potvrzení aktuální platnosti.  
**Vedlejší kontrola:** [ŠVP Elektrotechnika – Mechatronika 2024](https://www.skolavdf.cz/file/1942y5b91jst1qyxttb3iglh5n47w2by/svp-ele-2024.pdf?v=251017013451) a [47 výstupů ŠVP](../kurikulum/VYSTUPY_3_ROCNIK.md). **ŠVP není totožný s tematickým plánem** a jeho plné pokrytí vyžaduje následné posouzení.  
**Studentský rozcestník:** [Výuka 3. ročníku](../../mechatronika/vyuka/3-rocnik/index.html).

> **Proč revize:** První pracovní návrh měl 4 vlastní celky a 11 témat, změnil některé hodinové dotace i pořadí a vyčlenil například příliš málo prostoru přerušením. Tento dokument jej nahrazuje. Podrobné výklady a experimenty jsou pouze návrhy, nikoli položky převzaté ze starého PDF.

## 1. Zachovaných 15 tematických okruhů původního plánu

| Původní č. | Název v původním plánu | Hodin | Dílčí hodinové dotace |
|---:|---|---:|---|
| 01 | Motivace a podmínky zavedení automatizačních prostředků | **2** | 1.1 (1 h), 1.2 (1 h) |
| 02 | Prostředky automatizace | **7** | 2.1 (2 h), 2.2 (3 h), 2.3 (1 h), 2.4 (1 h) |
| 03 | Schematické zobrazování řídicích struktur | **5** | 3.1 (2 h), 3.2 (2 h), 3.3 (1 h) |
| 04 | Aplikace základů číslicové techniky | **7** | 4.1 (2 h), 4.2 (2 h), 4.3 (1 h), 4.4 (2 h) |
| 05 | Typové řady mikropočítačů | **7** | 5.1 (2 h), 5.2 (5 h) |
| 06 | Architektura mikropočítače | **7** | 6.1 (2 h), 6.2 (2 h), 6.3 (2 h), 6.4 (1 h) |
| 07 | Prostředky pro vývoj SW | **15** | 7.1 (4 h), 7.2 (2 h), 7.3 (2 h), 7.4 (3 h), 7.5 (4 h) |
| 08 | Podpůrné obvody mikropočítačů | **4** | 8.1 (2 h), 8.2 (2 h) |
| 09 | Přerušení | **7** | 9.1 (2 h), 9.2 (2 h), 9.3 (2 h), 9.4 (1 h) |
| 10 | Řízení rychlosti programu | **4** | 10.1 (2 h), 10.2 (2 h) |
| 11 | Regulační systémy analogové a číslicové | **3** | 11.1 (1 h), 11.2 (1 h), 11.3 (1 h) |
| 12 | Akční členy | **4** | 12.1 (3 h), 12.2 (1 h) |
| 13 | Bloková algebra regulačních schémat | **12** | 13.1 (1 h), 13.2 (3 h), 13.3 (4 h), 13.4 (2 h), 13.5 (2 h) |
| 14 | Řízení regulačních procesů | **6** | 14.1 (2 h), 14.2 (2 h), 14.3 (2 h) |
| 15 | Spojité a nespojité struktury regulačních obvodů | **6** | 15.1 (2 h), 15.2 (2 h), 15.3 (2 h) |
| | **Celkem** | **96** | |

### Věcně převzaté položky a dotace původního tematického plánu

*Redakční poznámka:* V původním PDF je překlep „Jazyk symbolických ades“ (7.1), pro čitelnost na webu uvádíme „Jazyk symbolických adres“. Dále upravujeme jen zjevnou diakritiku, například „Ovladání“ na „Ovládání“. Hodiny a věcný rozsah neměníme.

| Č. | Učivo | Hodin |
|---|---|---:|
| 1.1 | Důvody a podmínky pro zavedení automatizace | 1 |
| 1.2 | Ovládání a regulace | 1 |
| 2.1 | Elektrické, pneumatické a hydraulické prostředky a jejich značky | 2 |
| 2.2 | Snímače neelektrických veličin | 3 |
| 2.3 | Zesilovače pro automatizaci | 1 |
| 2.4 | Zdroje signálů, zdroje energie pro řídicí systém | 1 |
| 3.1 | Kontaktní schémata | 2 |
| 3.2 | Schémata na bázi IO | 2 |
| 3.3 | Obvody s vnějším ovládáním | 1 |
| 4.1 | Realizace základních číslicových bloků | 2 |
| 4.2 | Paměti mikroprocesorů | 2 |
| 4.3 | Řídicí systémy s vysokým stupněm integrace | 1 |
| 4.4 | Struktura mikropočítače | 2 |
| 5.1 | Základní typové řady mikropočítačů | 2 |
| 5.2 | Vlastnosti a vývoj pokročilejších řídicích systémů | 5 |
| 6.1 | Registry a paměti | 2 |
| 6.2 | Synchronizace | 2 |
| 6.3 | IN / OUT obvody | 2 |
| 6.4 | Sériová komunikace | 1 |
| 7.1 | Jazyk symbolických adres | 4 |
| 7.2 | Žebříčkové diagramy | 2 |
| 7.3 | Programování s grafickými bloky | 2 |
| 7.4 | Programovací postupy | 3 |
| 7.5 | Vývoj, optimalizace a testování programu | 4 |
| 8.1 | Typy podpůrných obvodů, paměti | 2 |
| 8.2 | Stykové obvody a periferie | 2 |
| 9.1 | Externí přerušení | 2 |
| 9.2 | Interní přerušení | 2 |
| 9.3 | Obsluha přerušení | 2 |
| 9.4 | Řadič přerušení | 1 |
| 10.1 | Zpožďovací smyčky | 2 |
| 10.2 | Programování zpožďovacích smyček | 2 |
| 11.1 | Realizace regulačního obvodu analogovými prostředky | 1 |
| 11.2 | Realizace regulačního obvodu číslicovými prostředky | 1 |
| 11.3 | Regulace rychlosti běhu programu mikroprocesorového systému | 1 |
| 12.1 | Elektrické akční členy (spínací prvky, pohony) a jejich řízení | 3 |
| 12.2 | Hydraulické a pneumatické akční členy (rozváděče, motory) | 1 |
| 13.1 | Přenos funkčního bloku | 1 |
| 13.2 | Řazení funkčních bloků | 3 |
| 13.3 | Blokové schéma regulačního procesu a veličiny pro popis regulačního děje | 4 |
| 13.4 | Popis vlastností bloků pomocí frekvenčních charakteristik | 2 |
| 13.5 | Popis vlastností bloků pomocí přechodových charakteristik | 2 |
| 14.1 | Regulátory | 2 |
| 14.2 | Regulované soustavy | 2 |
| 14.3 | Kriteria stability regulačního procesu | 2 |
| 15.1 | Výhody a nevýhody analogového a číslicového provedení regulačního systému | 2 |
| 15.2 | Digitalizace signálů (vzorkování, kvantování) | 2 |
| 15.3 | Programování číslicových regulátorů | 2 |

**Doslovná výjimka:** V původním PDF je ještě položka **6.5 „Základní stavební moduly“ bez samostatně uvedené hodinové dotace**. Neurčujeme jí svévolně jednu další hodinu. Začleníme ji jako průřezovou součást výuky architektury a jednotlivé hodiny 6. okruhu zůstávají přesně v součtu 7.

## 2. Všech 32 tříhodinovek, přesně po 45minutových hodinách

Každá tříhodinovka obsahuje **přesně tři původní vyučovací hodiny**. Je-li v původním plánu konec tematického okruhu po první či druhé hodině, pokračujeme následujícím okruhem. Jde o jednu školní tříhodinovku, ne o povinnost dělit výuku uměle na nesouvisející výklady. Názvy lekcí, cíle a návrhy praktické práce jsou **novým didaktickým návrhem**, nikoli citací původního dokumentu.

| Lekce | Název | Původní podtémata a přesná dotace | Celkem h | Cíl srozumitelně | Navržená praktická činnost |
|---|---|---|---:|---|---|
| **VY-3-01** | Proč automatizujeme? A jakými prostředky? | `1.1` 1 h + `1.2` 1 h + `2.1` 1 h | **3** | Rozumím, proč automatizovat, poznám ovládání a regulaci a rozliším základní prostředky. | Srovnání tlačítka, časovače a termostatu; poznávání prvků v jednoduché automatizaci. |
| **VY-3-02** | Pohony a snímače kolem nás | `2.1` 1 h + `2.2` 2 h | **3** | Rozliším elektrické, pneumatické a hydraulické prvky a vyberu jednoduchý snímač. | Roztřídění dostupných komponent podle média; výběr snímače pro skutečný stroj. |
| **VY-3-03** | Od snímače k použitelnému signálu | `2.2` 1 h + `2.3` 1 h + `2.4` 1 h | **3** | Ukážu cestu signálu od snímače přes zesílení k řídicí jednotce a zdroji energie. | Praktické schéma: snímač → zesílení → řadič; doplnění napájení. |
| **VY-3-04** | Kontaktní schémata a první logická zapojení | `3.1` 2 h + `3.2` 1 h | **3** | Přečtu základní kontaktní schéma a poznám jeho jednoduché logické vyjádření. | Doplňování kontaktů NO/NC a výstupu; první převod do logických značek. |
| **VY-3-05** | Od schématu k číslicovému bloku | `3.2` 1 h + `3.3` 1 h + `4.1` 1 h | **3** | Dokážu převést jednoduché ovládání na logické schéma a základní číslicový blok. | Jednoduchý příklad START/STOP a jeho blokové či hradlové vyjádření. |
| **VY-3-06** | Číslicové bloky a paměti | `4.1` 1 h + `4.2` 2 h | **3** | Rozliším jednoduchý číslicový obvod a paměťový prvek v řídicím systému. | Základní číslicový blok a demonstrace uchování jednoho bitu. |
| **VY-3-07** | Integrované řídicí systémy a mikropočítač | `4.3` 1 h + `4.4` 2 h | **3** | Vysvětlím, proč se funkce integrují, a ukážu části mikropočítače. | Společné skládání blokového schématu řídicího mikropočítače. |
| **VY-3-08** | Jak se vyvíjely mikropočítače | `5.1` 2 h + `5.2` 1 h | **3** | Porovnám základní typové řady a vysvětlím, proč se mikropočítače vyvíjely. | Krátké srovnání dvou generací mikropočítačů na konkrétním zařízení. |
| **VY-3-09** | Jak vybrat vhodný řídicí systém | `5.2` 3 h | **3** | Zvolím vhodný pokročilejší řídicí systém pro konkrétní úkol. | Výběr řadiče pro několik aplikací a zdůvodnění parametrů. |
| **VY-3-10** | Pokročilé systémy, registry a paměti | `5.2` 1 h + `6.1` 2 h | **3** | Vysvětlím vlastnosti současného systému a účel registrů a pamětí. | Čtení registru a výběr vhodné paměti; přenos hodnoty přes procesor. |
| **VY-3-11** | Synchronizace a vstupy/výstupy | `6.2` 2 h + `6.3` 1 h | **3** | Vysvětlím, proč procesor potřebuje hodinový signál a jak používá vstupy a výstupy. | Model hodinového taktu a jednoduchého vstupního/výstupního signálu. |
| **VY-3-12** | Jak mikropočítač komunikuje a začíná programovat | `6.3` 1 h + `6.4` 1 h + `7.1` 1 h | **3** | Pochopím vstupy/výstupy, základ sériové komunikace a zápisu symbolických adres. | Zaslat údaj sériovou linkou a přečíst krátké symbolické označení. |
| **VY-3-13** | Jazyk symbolických adres v praxi | `7.1` 3 h | **3** | Přečtu a upravím jednoduchou ukázku práce se symbolickými adresami. | Úprava adres a instrukcí v krátké, bezpečné demonstrační ukázce. |
| **VY-3-14** | Žebříčkové diagramy a funkční bloky | `7.2` 2 h + `7.3` 1 h | **3** | Vysvětlím žebříčkový diagram a přenesu část logiky do grafických bloků. | Návrh logiky tlačítko–výstup v LAD a její překreslení do FBD. |
| **VY-3-15** | Grafické bloky a programovací postupy | `7.3` 1 h + `7.4` 2 h | **3** | Postavím jednoduchý program z bloků a pojmenuji jeho kroky. | Sestavení blokového programu a popis algoritmu vlastními slovy. |
| **VY-3-16** | Od algoritmu k otestovanému programu | `7.4` 1 h + `7.5` 2 h | **3** | Dokážu program vyzkoušet, popsat chybu a opravit ji. | Hledání chyby v připraveném programu, krátký testovací protokol. |
| **VY-3-17** | Ladění programu a podpůrné obvody | `7.5` 2 h + `8.1` 1 h | **3** | Provedu opakované testy programu a vysvětlím účel podpůrných obvodů. | Opakované testy a návrh vhodného podpůrného obvodu. |
| **VY-3-18** | Paměti, periferie a rozhraní | `8.1` 1 h + `8.2` 2 h | **3** | Rozliším paměťové a stykové obvody a vysvětlím účel periferií. | Rozbor schématu řadiče: paměti, stykové obvody a periferie. |
| **VY-3-19** | Externí a interní přerušení | `9.1` 2 h + `9.2` 1 h | **3** | Na příkladu vysvětlím rozdíl mezi externí a interní událostí přerušení. | Pozorování rozdílu mezi vyvoláním přerušení tlačítkem a časovačem. |
| **VY-3-20** | Vnitřní přerušení a jejich obsluha | `9.2` 1 h + `9.3` 2 h | **3** | Popíšu obsluhu přerušení a předvedu jednoduchou reakci programu na událost. | Sledování jednoduché obslužné rutiny a změny stavu po přerušení. |
| **VY-3-21** | Řadič přerušení a časové smyčky | `9.4` 1 h + `10.1` 2 h | **3** | Vysvětlím účel řadiče přerušení a proč program někdy používá čekací smyčku. | Časovač versus blokující čekání; vysvětlení, co vykonává procesor. |
| **VY-3-22** | Programování zpoždění a první analogová regulace | `10.2` 2 h + `11.1` 1 h | **3** | Napíšu jednoduché zpoždění a porovnám je s analogovým regulačním principem. | Naplánovat měřitelné časové zpoždění a ukázat jednoduché analogové řízení. |
| **VY-3-23** | Číslicová regulace a elektrické pohony | `11.2` 1 h + `11.3` 1 h + `12.1` 1 h | **3** | Porovnám analogovou a číslicovou regulaci a vyberu způsob řízení motoru. | Schéma číslicového regulačního zásahu a bezpečného ovládání elektrického motoru. |
| **VY-3-24** | Řízení elektrických, pneumatických a hydraulických pohonů | `12.1` 2 h + `12.2` 1 h | **3** | Vysvětlím bezpečný princip řízení elektrického, pneumatického či hydraulického pohonu. | Vybrat způsob pohonu pro malý mechanismus a nakreslit blokové zapojení. |
| **VY-3-25** | Přenosy a řazení bloků | `13.1` 1 h + `13.2` 2 h | **3** | Umím zakreslit základní blokový přenos a složit dva bloky dohromady. | Přenos zadaného bloku a dvě jednoduchá řazení se společnou kontrolou. |
| **VY-3-26** | Od bloků k regulačnímu schématu | `13.2` 1 h + `13.3` 2 h | **3** | Poskládám jednoduché bloky a přečtu schéma regulačního okruhu. | Řazení bloků a kreslení šipek regulační smyčky se snímačem. |
| **VY-3-27** | Regulační smyčka a frekvenční charakteristiky | `13.3` 2 h + `13.4` 1 h | **3** | Pojmenuji veličiny regulačního procesu a rozpoznám frekvenční charakteristiku. | Čtení schématu regulace a první interpretace frekvenční odezvy. |
| **VY-3-28** | Frekvenční a přechodové charakteristiky | `13.4` 1 h + `13.5` 2 h | **3** | Vysvětlím, co lze vyčíst z frekvenční a přechodové odezvy. | Interaktivní srovnání grafů frekvenční a časové odezvy. |
| **VY-3-29** | Regulátory a řízené soustavy | `14.1` 2 h + `14.2` 1 h | **3** | Rozliším základní typy regulátorů a vysvětlím, na co působí. | Porovnání P/PI/PID na jednoduché simulaci s komentářem. |
| **VY-3-30** | Vlastnosti soustav a stabilita | `14.2` 1 h + `14.3` 2 h | **3** | Popíšu vlastnosti soustavy a posoudím jednoduchý případ stability. | Pozorovat ustálení, překmit a stabilitu na zjednodušeném modelu. |
| **VY-3-31** | Analogové a číslicové řízení, první vzorkování | `15.1` 2 h + `15.2` 1 h | **3** | Porovnám analogový a číslicový přístup a vysvětlím myšlenku vzorkování. | Porovnání analogového a číslicového měření; odebrání jednotlivých vzorků. |
| **VY-3-32** | Vzorkování, kvantování a číslicový regulátor | `15.2` 1 h + `15.3` 2 h | **3** | Vysvětlím vzorkování a kvantování a navrhnu základ jednoduchého číslicového regulátoru. | Vyzkoušet frekvenci vzorkování a kvantování, sestavit základní algoritmus regulátoru. |

## 3. Kontrola zachování původních okruhů a hodinových dotací

| Původní okruh | Hodin v PDF | Lekce, v nichž se objevuje | Návaznost na ŠVP (pracovní) |
|---:|---:|---|---|
| 01 | 2 | VY-3-01 | MER3-U01 |
| 02 | 7 | VY-3-01, VY-3-02, VY-3-03 | MER3-U02 |
| 03 | 5 | VY-3-04, VY-3-05 | MER3-U03 |
| 04 | 7 | VY-3-05, VY-3-06, VY-3-07 | MER3-U04 |
| 05 | 7 | VY-3-08, VY-3-09, VY-3-10 | MER3-U05 |
| 06 | 7 | VY-3-10, VY-3-11, VY-3-12 | MER3-U06 |
| 07 | 15 | VY-3-12, VY-3-13, VY-3-14, VY-3-15, VY-3-16, VY-3-17 | MER3-U07 |
| 08 | 4 | VY-3-17, VY-3-18 | MER3-U08 |
| 09 | 7 | VY-3-19, VY-3-20, VY-3-21 | MER3-U09 |
| 10 | 4 | VY-3-21, VY-3-22 | MER3-U10 |
| 11 | 3 | VY-3-22, VY-3-23 | MER3-U11 |
| 12 | 4 | VY-3-23, VY-3-24 | MER3-U12 |
| 13 | 12 | VY-3-25, VY-3-26, VY-3-27, VY-3-28 | MER3-U13 |
| 14 | 6 | VY-3-29, VY-3-30 | MER3-U13 |
| 15 | 6 | VY-3-31, VY-3-32 | MER3-U14 |
| **Celkem** | **96** | **32 tříhodinovek × 3 hodiny** | |

**Kontrola provedena programově:** 15/15 tematických okruhů, všech **48 podtémat s výslovnou dotací**, všech **96 hodin**, včetně hodin rozložených přes sousední tříhodinovky; každá podtématická dotace je zachována přesně. Neurčená 6.5 nemá nově vymyšlenou kvótu.

## 4. Pedagogický standard při zpracování každé tříhodinovky

Rámec z [README](README.md), [TEMPLATE](TEMPLATE.md) a [REVIEW](REVIEW.md) zůstává platný, ale u třetího ročníku důsledně upřednostňujeme **srozumitelnost, přehlednost a pochopení před šíří detailů**.

1. **Začni skutečným problémem.** Student má vědět, proč se dané zařízení nebo postup učí.
2. **Jen několik klíčových pojmů.** V případě potřeby věnuj větší čas jednomu principu, místo přehlcení teorií.
3. **Výklad propojený s ukázkou.** Schéma, video, jednoduchá simulace nebo reálné zapojení až tehdy, když konkrétně přispívá k pochopení.
4. **Aktivní práce.** Student něco předpoví, změří, nakreslí, sestaví, zapojí nebo odůvodní.
5. **Krátké ověření.** Vlastními slovy vysvětlí, co dělal a proč. Pokročilé výpočty nebo odborné konstrukce nepatří automaticky do výukového minima.
6. **Časové rozdělení v tabulce je obsahová dotace, nikoliv povinný scénář po 45minutových izolovaných prezentacích.** Projekty mohou propojovat více částí, ale zdrojová hodina nesmí zmizet.
7. **Odborný stav:** PLÁN → VÝKLAD V PŘÍPRAVĚ → K REVIZI → SCHVÁLENO/ODUČENO, vždy oddělit stav dokumentu a skutečné odučení.
8. **Výukové technologie:** dle dostupnosti Arduino, PLC Teco/Mosaic, ROBOTIS; žádný konkrétní hardware nemá nahrazovat předepsané učivo.

## 5. Co jsme opravili proti první struktuře 11 témat

- **Přerušení** získala původních **7 hodin** (okruh 9), nikoli pouze jednu smíšenou tříhodinovku.
- **Typové řady mikropočítačů** mají opět **7 hodin** (okruh 5).
- **Aplikace základů číslicové techniky** mají původních **7 hodin** (okruh 4), nikoli našich dřívějších 12 hodin věnovaných hlavně logice.
- **Bloková algebra regulačních schémat** dostala původních **12 hodin** (okruh 13), zachovány frekvenční a přechodové charakteristiky.
- **Řízení regulačních procesů (6 hodin)** a **spojité/nespojité struktury (6 hodin)** jsou opět oddělené okruhy.
- **Programování** zůstává v původní dotaci **15 hodin** v okruhu 7; časové smyčky, obsluha přerušení a podpůrné obvody mají vlastní okruhy.
- **Pořadí** se opět řídí původním plánem: automatizace → prostředky → schémata → číslicová technika → mikropočítače → programování → přerušení → regulace a pohony → bloková algebra.

## 6. Otevřené odborné otázky, které nesmíme potichu „opravit“

- **Předložený tematický plán je z 2025/26**, nikoli ověřený schválený plán školy pro 2026/27. Potřebujeme pedagogické potvrzení.
- **Kapitola 10 a 11.3:** formulace „řízení rychlosti programu“ a „regulace rychlosti běhu programu“ byly věrně zachovány ze zdroje. Nesmíme je bez rozhodnutí garanta zaměnit s regulací otáček motoru.
- **Základní stavební moduly 6.5** jsou bez vlastní dotace a budou zařazeny do jiných částí okruhu 6 bez přidávání hodin.
- **První komplexní webová lekce z 25. 11. 2026** věnovala příliš času modelu regulovaného dopravníku a nebyla vhodným výkladem všech tří prvních hodin. Je uchována v historii GitHubu, ale její původní URL nyní vede na přepracovanou osnovu tříhodinovky 01. Simulátor může být po úpravě použit až u pozdější regulace.
- **ŠVP versus 15 okruhů:** původní školní PDF i ŠVP mají odlišnou strukturu. Přímé přiřazení řádků ŠVP je jen pracovní; před označením kompletního pokrytí musí být znovu provedena kontrola všech 47 výstupů a 14 bloků učiva.
- **Termíny, délka prázdnin, vybavení, skutečné hodinové ztráty a vyučovaná skupina** nejsou součástí PDF; není správné je doplňovat odhadem.

## 7. Stav webu a další postup

- Studentský rozcestník: `mechatronika/vyuka/3-rocnik/index.html`; řazení podle všech **15 originálních okruhů**.
- Stabilní URL výukových hodin: `mechatronika/vyuka/3-rocnik/01/` až `mechatronika/vyuka/3-rocnik/32/`. URL nepřepisujeme při úpravě názvů; původní dlouhé URL přesměrovávají na odpovídající číslo hodiny.
- Roční seznam učiva: `mechatronika/vyuka/3-rocnik/lessons.js`. Jediný sdílený seznam pro katalog i jednotlivé stránky.
- Všechny tříhodinovky: **stav PLÁNOVÁNO**. Detail každé obsahuje přesné dílčí hodinové dotace, cíl a navržené cvičení.
- Nejbližší obsahová práce: znovu vystavět VY-3-01 jako **1 h automatizace + 1 h ovládání/regulace + 1 h prostředky**, bez předčasné matematiky PI regulace.
- Ke každé lekci nejprve vytvořit krátký srozumitelný výklad, jednu skutečně užitečnou ukázku a ověření porozumění. Nepřidávat encyklopedii.

**Poznámka:** Rozpis není dokument odučených hodin, nepředstírá splněné výstupy a nemění původní předmětovou dokumentaci.
