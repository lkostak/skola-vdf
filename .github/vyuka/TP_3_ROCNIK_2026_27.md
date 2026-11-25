# Mechatronika a robotika · 3. ročník · 32 tříhodinovek

**Verze:** 25. listopadu 2026 · schválené rozvržení pro tvorbu výukových materiálů. **Obsah lekcí je stále převážně pouze osnova; nejde o potvrzení jejich odučení nebo úředně schválený školní tematický plán.**

## Princip

Pět logicky uspořádaných oblastí vytváří cestu: **mechatronický systém jako celek → snímače a pohony → logika → mikroprocesor a program → regulace.**

- **Obsahové východisko:** školní [ŠVP Elektrotechnika – Mechatronika 2024](https://www.skolavdf.cz/file/1942y5b91jst1qyxttb3iglh5n47w2by/svp-ele-2024.pdf?v=251017013451), Mechatronika a robotika, 3. ročník, 96 hodin, PDF s. 475–479.
- **Kontrolní vodítko:** tematický plán Radka Boháče 2025/26, `TP-MER4.pdf` (uvnitř 3. ročník), 15 okruhů, 96 hodin. Zachován [archiv staršího doslovného převodu](ARCHIV_TP_3_2025_26_PREVOD.md). **Dílčí hodinové kvóty loňského plánu nejsou pro nové členění závazné.**
- **Pedagogická inspirace:** [KYME Michala Bubílka](https://bubilem.github.io/sps-vyukove-materialy/KYME/index.html). Skutečné mechatronické aplikace, robotika, názorný výklad a navazující technické principy. Jeho jiné předmětové zaměření nepřebíráme mechanicky.
- **Studentský rozcestník:** [32 témat na školním webu](../../mechatronika/vyuka/3-rocnik/index.html). Zobrazuje **pouze názvy a stručný obsah**, bez metodických komentářů a čísel ŠVP.

## Tematické oblasti

| Oblast | Tříhodinovky | Rozsah |
|---|---|---:|
| **A. Mechatronika a robotika v praxi** | 01–02 | 6 h |
| **B. Snímače, pohony a řídicí obvody** | 03–06 | 12 h |
| **C. Číslicová technika a logické řízení** | 07–10 | 12 h |
| **D. Mikroprocesory a programování** | 11–23 | 39 h |
| **E. Regulace a inteligentní řízení** | 24–32 | 27 h |
| **Celkem** | **01–32** | **96 h** |

## Všech 32 témat

*Vazby na ŠVP jsou orientační přiřazení pro přípravu lekcí, nikoli důkaz splnění výstupu.*

| Č. | Oblast | Téma | Obsah | Vazby na ŠVP (předběžné) |
|---:|:---:|---|---|---|
| 01 | A | **Co je mechatronický systém?** | Jak spolupracují mechanika, elektronika, snímače a řízení. Automatizace, ovládání a regulace. | U01, U04; V001, V002, V003, V004, V015 |
| 02 | A | **Mechatronika a robotika kolem nás** | Průmyslové roboty, manipulátory, CNC stroje, ABS a další praktické aplikace. | U01, U02, U12; V004, V005, V015, V039 |
| 03 | B | **Elektrické, pneumatické a hydraulické systémy** | Principy, rozdíly, základní prvky a jejich schematické značky. | U02; V005 |
| 04 | B | **Snímače a měření veličin** | Snímače teploty, tlaku, polohy, otáček a dalších fyzikálních veličin. | U02; V006 |
| 05 | B | **Signály, zesilovače a napájení** | Jak se informace dostává ze snímače do řídicí jednotky. | U02; V007 |
| 06 | B | **Akční členy a ovládací obvody** | Motory, relé, ventily, spínací prvky a základní kontaktní schémata. | U03, U12; V008, V009, V010, V039 |
| 07 | C | **Jak počítač pracuje s informacemi** | Bity, dvojková soustava, logické hodnoty a základy Booleovy algebry. | U04; V011 |
| 08 | C | **Logická hradla a obvody** | AND, OR, NOT a další funkce, pravdivostní tabulky a jednoduchá schémata. | U03, U04; V009, V011, V012 |
| 09 | C | **Kombinační logické obvody** | Jak z více vstupů vzniká rozhodnutí. Sčítačka, dekodér a praktické příklady. | U04; V012 |
| 10 | C | **Sekvenční obvody a paměť** | Jak si obvod pamatuje stav. Klopné obvody, registry a čítače. | U04; V012, V013 |
| 11 | D | **Mikroprocesory a mikrořadiče** | Typy, vývoj, vlastnosti a použití v řídicích systémech. | U04, U05; V014, V015, V016 |
| 12 | D | **Jak funguje mikropočítač** | Procesor, paměti, registry, sběrnice a základní architektura. | U04, U06; V014, V017, V018 |
| 13 | D | **Hodiny, vstupy a výstupy** | Synchronizace, registry a vstupně-výstupní obvody mikrořadiče. | U06; V018, V019, V020 |
| 14 | D | **Algoritmy a vývojová prostředí** | Od technického zadání k algoritmu, symbolické adresy a programovací prostředí. | U07; V021, V023, V024, V025 |
| 15 | D | **Programujeme první zařízení** | Jednoduché programování mikrořadiče, například Arduino. | U07; V021, V023, V025, V026 |
| 16 | D | **Časování programu** | Zpožďovací smyčky, časovače, generování impulsů a časové cykly. | U07, U10; V028, V032, V033, V034, V035, V036 |
| 17 | D | **PLC a žebříčkové diagramy** | Základy programování PLC pomocí kontaktů a cívek. | U07; V024, V025, V026 |
| 18 | D | **Programování funkčních bloků** | Grafické programování FBD a sestavování řídicí logiky. | U07; V024, V025, V026 |
| 19 | D | **Řízení postupných činností** | Stavové automaty a programování jednoduchých technologických procesů. | U07; V023, V026, V029 |
| 20 | D | **Komunikace a periferie** | Sériová komunikace, stykové a podpůrné obvody. | U06, U07, U08; V020, V021, V022, V030 |
| 21 | D | **Přerušení a reakce na události** | Externí a interní přerušení, rozdíl oproti průběžnému dotazování. | U07, U09; V027, V031 |
| 22 | D | **Obsluha přerušení** | Obslužné rutiny, řadiče přerušení a praktické programování. | U07, U09; V027, V031 |
| 23 | D | **Vlastní řídicí projekt** | Návrh, programování, ladění, testování a bezpečnost zařízení. | U07, U08; V026, V028, V029, V030 |
| 24 | E | **Proč potřebujeme zpětnou vazbu?** | Jak systém pozná rozdíl mezi požadovaným a skutečným stavem. | U11, U13; V037, V038, V040 |
| 25 | E | **Regulační smyčka a její schéma** | Regulátor, snímač, akční člen, regulovaná soustava a regulační veličiny. | U13; V040, V041 |
| 26 | E | **Přenosy a bloková algebra** | Co vyjadřuje přenos a jak se propojují funkční bloky. | U13; V041 |
| 27 | E | **Jak se chová regulovaná soustava** | Vlastnosti soustav, statické a astatické chování. | U13; V040, V042 |
| 28 | E | **Přechodové a frekvenční charakteristiky** | Jak systémy reagují na změny; grafy, příklady a základní řešení přechodných dějů. | U13; V042, V043 |
| 29 | E | **Regulátory P, I, D a PID** | Jak regulátory pracují a jak ovlivňují chování systému. | U13; V040, V043 |
| 30 | E | **Stabilita a kvalita regulace** | Překmit, rychlost odezvy, ustálení a stabilita. | U13; V042, V043 |
| 31 | E | **Spojitá a číslicová regulace** | Rozdíly mezi analogovým a číslicovým řízením, spojitým a diskrétním časem. | U11, U14; V037, V038, V044, V045, V046, V047 |
| 32 | E | **Vzorkování a číslicový regulátor** | Kvantování, vzorkování a jednoduchý programově řízený regulační systém. | U11, U14; V037, V038, V044, V045, V046, V047 |

## Metodika zpracování jednotlivé tříhodinovky

Student má nejprve vidět **skutečný problém a fungující systém**, následně jeho princip a vlastní praktickou činnost. Každá tříhodinovka má 3 × 45 minut a měla by obsahovat přiměřený počet hlavních myšlenek, dobré vysvětlení, jednu či více užitečných názorných ukázek, samostatný úkol a jednoduché ověření porozumění. Nepřetěžovat výklad podrobnostmi z maturitní přípravy. Přehled a struktura lekce nejsou vydávány za hotový obsah.

## Kontrola ŠVP a otevřené odborné body

- Předběžná matice přiděluje všech **47 jednotlivých výstupů** a všech **14 bloků učiva** alespoň jedné tříhodinovce. Samotné přiřazení **nezaručuje dostatečnou časovou dotaci, hloubku výkladu ani splnění ŠVP**.
- **Robotika a reálné aplikace v úvodu** tvoří didaktickou motivaci inspirovanou KYME. V ŠVP 3. ročníku nejde o samostatně vyhrazený blok robotiky, nesmí vytlačit jiné povinné učivo.
- **Přerušení (21–22)** a **časování (16)** mají nyní oddělené tříhodinovky a navazující praktické programování. Ověřit, že obsah obsluhy přerušení a časovačů skutečně odpovídá požadovaným výstupům.
- **V028 a V036:** testování programů se zpožďovacími smyčkami jsou dvě položky ŠVP, které lze prokázat společným cvičením, pokud jde o skutečné testování.
- **V037 a V038:** ŠVP doslova uvádí změnu a regulátor *rychlosti běhu programu*. Nezaměňovat bez odborného upřesnění s regulací otáček motoru. Před zpracováním témat 24/31/32 upřesnit požadovaný výklad.
- **V042:** ŠVP vyžaduje řešit *přechodné děje vyšších řádů*. Téma 28 nemůže zůstat pouze u prohlížení grafů; připravit řešený příklad přiměřený cílové třídě.
- **Obsluha HW, bezpečnost:** návrh nízkonapěťových cvičení a dohled podle školních pravidel. Pro laboratoř mikroprocesorové a automatizační techniky uvádí ŠVP nejvýše deset studentů na pedagoga.
- **Hotovost obsahu:** každé téma teprve dostane svoji výukovou stránku a vlastní aktivity. `outline` = osnova, ne dokončená hodina. Učitel musí před odučením ověřit cíle a vybavení.

## Historie rozhodnutí

Dřívější pracovní plán podle 15 okruhů z roku 2025/26 a meziverze 5 oblastí s pořadím „automatizace → číslicová technika → programování → akční členy → regulace“ byly nahrazeny touto osnovou. Důvodem je pedagogická návaznost na *mechatronický systém a reálné aplikace*, nikoli pouhé rozřezání položek ŠVP na osamocené názvy.

**Záznam o schválení samotné struktury v konverzaci neznamená potvrzení, že jsou výukové materiály dokončené, oficiálně platné nebo skutečně odučené.**
