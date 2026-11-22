# Úplný registr výstupů ŠVP · Mechatronika a robotika · 4. ročník

**Zdroj:** ŠVP Elektrotechnika – Mechatronika 2024, verze 2, PDF strany **479–482**. [Oficiální PDF](https://www.skolavdf.cz/file/1942y5b91jst1qyxttb3iglh5n47w2by/svp-ele-2024.pdf?v=251017013451). 
**Rozsah:** **42 samostatně uvedených výstupů** a **18 tematických bloků učiva**; včetně opakovaných formulací a tematického bloku přecházejícího mezi dvěma stránkami. **128 vyučovacích hodin podle ŠVP.**

> **Status: extrakce výstupů dokončena; mapování na vyučování a důkazy splnění zatím nikoli.** Doslovné formulace byly přepsány z prostředního sloupce tabulky „ŠVP výstupy“; spojena jen typografická zalomení řádků a vypuštěny úvodní grafické pomlčky. Označení `MER4-Vxxx` a `MER4-Uxx` jsou **naše interní ID, nikoli číslování původního dokumentu**.

## 1. Kontrolní matice jednotlivých ŠVP výstupů

**Stav `ZATÍM NEOVĚŘENO`** znamená, že v našem repozitáři zatím není zdokumentována úplná vazba výstup → lekce → činnost studenta → ověření; neznamená to prohlášení o tom, zda hodiny ve škole proběhly. Zároveň **žádný webový soubor není automaticky důkazem zvládnutí výstupu**.

| Interní ID | Doslovný výstup ŠVP | PDF str. | Učivo (blok) | Odkaz na výklad / úlohu | Důkaz splnění | Stav |
|---|---|---:|---|---|---|---|
| `MER4-V001` | užívá akčních členů | 479 | [U01](#mer4-u01) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V002` | zná vlastnosti kontaktních a bezkontaktních spínacích prvků, omezí vliv přechodných dějů spínaných obvodů na brány procesoru | 479 | [U01](#mer4-u01) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V003` | řídí procesorem různé druhy elektrických pohonů | 479 | [U01](#mer4-u01) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V004` | užívá pojmy z oblasti regulace, blokové schéma regulačního procesu | 479 | [U01](#mer4-u01) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V005` | navrhne parametry regulátorů, regulovaných soustav | 480 | [U01](#mer4-u01) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V006` | signalizuje různé provozní stavy technologických procesů | 480 | [U01](#mer4-u01) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V007` | užívá vyšší řady mikroprocesorů | 480 | [U02](#mer4-u02) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V008` | používá vývojová prostředí | 480 | [U02](#mer4-u02) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V009` | provádí výběr vhodného typu mikroprocesoru | 480 | [U02](#mer4-u02) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V010` | navrhne SW a HW mikropočítačů s ohledem na bezpečnost práce | 480 | [U03](#mer4-u03) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V011` | popíše principy snímačů neelektrických veličin | 480 | [U04](#mer4-u04) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V012` | vysvětlí principy snímačů elektrických veličin | 480 | [U04](#mer4-u04) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V013` | vybere vhodný typ snímače pro konkrétní aplikace | 480 | [U04](#mer4-u04) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V014` | používá inteligentní snímače | 480 | [U04](#mer4-u04) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V015` | popíše architekturu programovatelného automatu | 480 | [U05](#mer4-u05) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V016` | pracuje s provozními režimy programovatelného automatu | 480 | [U05](#mer4-u05) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V017` | pracuje se vstupně-výstupními jednotkami | 480 | [U05](#mer4-u05) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V018` | pracuje s pamětmi a registry | 480 | [U05](#mer4-u05) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V019` | používá základní instrukce realizující logické funkce | 480 | [U06](#mer4-u06) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V020` | algoritmizuje jednodušší úlohy | 480 | [U07](#mer4-u07) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V021` | pracuje s vývojovým prostředím | 480 | [U07](#mer4-u07) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V022` | naprogramuje středně složité programy | 480 | [U07](#mer4-u07) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V023` | používá časově závislé procesy při řízení pomocí PLC | 481 | [U08](#mer4-u08) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V024` | pracuje s pamětmi a registry | 481 | [U09](#mer4-u09) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V025` | pracuje s vícerozměrovými signálovými prostory | 481 | [U09](#mer4-u09) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V026` | pracuje s převody signálů mezi analogovými a digitálními | 481 | [U10](#mer4-u10) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V027` | nastavuje interní čítače PLC | 481 | [U11](#mer4-u11) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V028` | používá uživatelský vstup (klávesnice, tlačítka) | 481 | [U12](#mer4-u12) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V029` | používá synchronní a asynchronní přenosy | 481 | [U13](#mer4-u13) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V030` | používá pokročilejší zobrazovací prostředky | 481 | [U13](#mer4-u13) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V031` | nastavuje a používá sériové a paralelní porty | 481 | [U14](#mer4-u14) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V032` | naprogramuje řídicí algoritmy pro procesy běžící v reálném čase | 481 | [U15](#mer4-u15) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V033` | pracuje s provozními režimy programovatelného automatu | 481 | [U16](#mer4-u16) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V034` | pracuje s pamětmi a registry | 481 | [U16](#mer4-u16) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V035` | pracuje s vývojovým prostředím | 481 | [U16](#mer4-u16) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V036` | naprogramuje řídicí algoritmy pro procesy běžící v reálném čase | 481 | [U16](#mer4-u16) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V037` | orientuje se v žebříčkových diagramech | 481 | [U16](#mer4-u16) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V038` | navrhne PID regulátor pro konkrétní aplikace | 482 | [U16](#mer4-u16) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V039` | programuje pomocí grafických programovacích nástrojů | 482 | [U17](#mer4-u17) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V040` | užívá základní pojmy robotiky | 482 | [U17](#mer4-u17) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V041` | sestaví jednoduchý autonomní systém | 482 | [U17](#mer4-u17) | — | — | ZATÍM NEOVĚŘENO |
| `MER4-V042` | pracuje se signály v časové a frekvenční oblasti | 482 | [U18](#mer4-u18) | — | — | ZATÍM NEOVĚŘENO |

## 2. Učivo v tematických blocích

Učivo níže odpovídá pravému sloupci tabulky ŠVP. Bloky zachovávají vizuální skupiny původního PDF a nejsou dodatečně posouvány podle námi vymyšlených témat. Výstupy a učivo **nejsou vždy v dokumentu v poměru 1:1**; každý podbod učiva proto musí být v následném auditu zvlášť kontrolován.

<a id="mer4-u01"></a>

### MER4-U01 · Akční členy, pohony a signalizace (str. 479–480; 6 výstupů)

- rozdělení (spínací prvky, pohony)
- struktury rozhraní
- reverzace a řízení otáček různých typů motorů (programově)
- signalizace - řízení zobrazovacích prvků

<a id="mer4-u02"></a>

### MER4-U02 · Vyšší řady mikroprocesorů (str. 480; 3 výstupů)

- struktury mikroprocesorů
- vlastnosti
- použití
- vývojová prostředí

<a id="mer4-u03"></a>

### MER4-U03 · Bezpečnost návrhu řídicích systémů (str. 480; 1 výstupů)

- řešení řídících systémů v souladu s BOZP

<a id="mer4-u04"></a>

### MER4-U04 · Snímače a převodníky (str. 480; 4 výstupů)

- snímač a senzor, základní pojmy
- snímání neelektrických veličin
- digitální snímače
- analogové snímače
- inteligentní snímače
- převodníky
- fyzikální omezení snímačů

<a id="mer4-u05"></a>

### MER4-U05 · PLC architektura a režimy (str. 480; 4 výstupů)

- rozdělení programovatelných automatů
- vstupní a výstupní jednotky
- registry (systémové, uživatelské)
- paměti
- pracovní cykly

<a id="mer4-u06"></a>

### MER4-U06 · Základní logické instrukce PLC (str. 480; 1 výstupů)

- začátek bloku
- základní logické operace: přímý a negovaný logický součin, součet, negace, exclusivní logický součet
- práce s výstupy

<a id="mer4-u07"></a>

### MER4-U07 · Programování PLC (str. 480; 3 výstupů)

- MNEMO kód (jazyk pro programovatelné automaty)
- postup při programování
- vývojová prostředí
- algoritmizace, ladění
- optimalizace programu
- spolehlivost programu

<a id="mer4-u08"></a>

### MER4-U08 · Časově závislé procesy PLC (str. 481; 1 výstupů)

- aplikace
- realizace
- testování

<a id="mer4-u09"></a>

### MER4-U09 · Vektorové operace, registry a signálové prostory (str. 481; 2 výstupů)

- sdružené logické operace s proměnnými vektorového charakteru

<a id="mer4-u10"></a>

### MER4-U10 · AD/DA převody a vzorkování (str. 481; 1 výstupů)

- vzorkování (vzorkovací věty, realizace)
- používané AD převodníky, DA převodníky
- rekonstrukce signálu
- měření napětí

<a id="mer4-u11"></a>

### MER4-U11 · Čítače PLC (str. 481; 1 výstupů)

- funkce čítačů PLC
- aplikace
- realizace

<a id="mer4-u12"></a>

### MER4-U12 · Tlačítka a ošetření zákmitů (str. 481; 1 výstupů)

- snímání tlačítek
- ošetření zákmitů

<a id="mer4-u13"></a>

### MER4-U13 · Přenosové a zobrazovací aplikace (str. 481; 2 výstupů)

- programování aplikací využívajících sériovou komunikaci, AD/DA převody, regulace

<a id="mer4-u14"></a>

### MER4-U14 · Sériové a paralelní porty (str. 481; 1 výstupů)

- RS 232
- RS 422
- RS 485
- I2C (TWI)
- Dallas
- SPI
- UART
- USART

<a id="mer4-u15"></a>

### MER4-U15 · Modely technologických procesů reálného času (str. 481; 1 výstupů)

- aplikace řídicích struktur na modely reálných procesů (výtah, semafory, dopravník, automatická pračka apod.)

<a id="mer4-u16"></a>

### MER4-U16 · Řídicí systém, vývojové prostředí a PID (str. 481–482; 6 výstupů)

- komunikace s řídicím systémem
- vývojové prostředí
- základy algoritmizace
- blokové schémata
- vývojové diagramy
- analogové a digitální I\O

<a id="mer4-u17"></a>

### MER4-U17 · Průmyslová robotika (str. 482; 3 výstupů)

- robotika
- účel, druhy a uplatnění robotů a manipulátorů
- kinematika robotů, základní druhy robotů podle kinematiky
- hlavice a chapadla
- řízení robotů
- vstupy a výstupy
- algoritmus robota
- oživení a odladění robota

<a id="mer4-u18"></a>

### MER4-U18 · Signály v časové a frekvenční oblasti (str. 482; 1 výstupů)

- časové funkce, transformace do frekvenční oblasti
- význam derivace funkce v automatizaci
- význam integrálu funkce v automatizaci
- Laplaceova transformace, Fourierova transformace a jejich použití v automatizaci

## 3. Duplicity a hranice jednotlivých bloků

- `MER4-V016` a `MER4-V033`: práce s režimy PLC se opakuje v obecné i aplikační části.
- `MER4-V018`, `MER4-V024`, `MER4-V034`: práce s pamětmi a registry se opakuje v několika řádcích; **ponecháno odděleně**.
- `MER4-V008`, `MER4-V021`, `MER4-V035`: používání vývojového prostředí se opakuje u různých bloků.
- `MER4-V032` a `MER4-V036`: opakuje se programování algoritmů v reálném čase, ve dvou kontextech.
- `MER4-V038` (PID regulátor) je na straně **482 v prvním řádku jako pokračování předchozího bloku** (řádek bez samostatného nového učiva), nikoli v následujícím bloku robotiky. Zapsáno pod `MER4-U16`.
- Blok `MER4-U01` začíná na straně 479 a pokračuje dvěma výstupy na straně 480.
- Klíčové kompetence a výchovné strategie v tabulce na straně 479 jsou obecnou součástí ŠVP, ale **nepřičítají se k 42 jednotlivým ŠVP výstupům**.

## 4. Co zbývá k prokazatelnému pokrytí

1. U každého `MER4-Vxxx` doplnit cílovou lekci, případně stránku maturity a konkrétní studijní obsah; rozlišit **existující obsah** a **pracovní námět**.
2. Doplnit úlohu, laboratorní práci, projekt či test, který cílový výstup přímo ověřuje. Při práci s reálným hardwarem zahrnout bezpečnost a důkaz správné funkce.
3. Evidovat skutečné odučení zvlášť od připravenosti webu.
4. Prověřit všechny body učiva v `U01–U18`, včetně části regulace PID a frekvenční oblasti.
5. Teprve po splnění vazeb používat označení `OVĚŘENO` dle [mapovací metodiky](MAPA_POKRYTI.md).

**Související:** [3. ročník](VYSTUPY_3_ROCNIK.md) · [Mapování a metodika](MAPA_POKRYTI.md) · [Zdrojový ŠVP](README.md).
