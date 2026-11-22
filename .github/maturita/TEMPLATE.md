# Šablona jedné maturitní otázky

Tento soubor je **autorský vzor**, nikoli studentská stránka. Pro každou novou otázku jej zkopíruj do interního pracovního souboru daného tématu a vyplň. Řiď se `README.md`.

## 0. Identita a kontrola verze

| Položka | Hodnota |
|---|---|
| Číslo otázky | NN |
| **Přesný oficiální název** | [vložit doslovné znění] |
| Úplné oficiální zadání a podbody | [vložit doslovně; uvést zdroj/datum] |
| Vazba na ŠVP · jednotlivé výstupy | [`MER3-Vxxx` / `MER4-Vxxx`, ověřit přes `.github/kurikulum/`; neuvádět pouze volný název tématu] |\n| Učivo ŠVP · tematické bloky | [`MER3-Uxx` / `MER4-Uxx`, ověřit všechny relevantní položky] |\n| Strany a verze zdrojového ŠVP | [číslo strany PDF a identifikace vydání] |
| Stav | ROZPRACOVÁNO / OBSAHOVĚ HOTOVO / K REVIZI / HOTOVO / K AKTUALIZACI |
| Zpracoval(a) | [jméno] |
| Odborně ověřil(a) | [jméno + datum] |
| Pedagogicky ověřil(a) | [jméno + datum] |
| Poslední aktualizace | [RRRR-MM-DD] |
| URL studentské lekce | [doplnit] |
| Verze podkladů | [doplnit] |

> Podklady, které ještě nebyly porovnány s úplným oficiálním zadáním, nesmějí nést označení HOTOVO.

## 1. Mapa pokrytí zadání

Každý oficiální podbod musí mít **vlastní řádek** a vazbu na konkrétní obsah, ověřování a studijní text.

| Oficiální podbod (doslovně) | Úroveň M/P/R | Výklad: kapitola | Laboratoř / ukázka | Studijní text | Ověření | Stav pokrytí |
|---|---|---|---|---|---|---|
| [podbod 1] | M | [oddíl] | [model] | [oddíl] | [úloha] | chybí / částečně / úplně |
| [podbod 2] | M | [oddíl] | [model / nepoužito] | [oddíl] | [úloha] | ... |

Zvlášť uvést hraniční nebo interpretačně nejednoznačné oblasti a kdo je potvrdil.

## 2. Cíle: co student na konci dokáže?

Sepsat 4–8 měřitelných formulací:
- Student **vysvětlí** …
- Student **nakreslí a popíše** …
- Student **předpoví výstup / chování** …
- Student **řeší** …
- Student **srovná a zdůvodní** …
- Student **použije v praxi** …

**Maturitní minimum** (bez kterého nelze otázku považovat za zvládnutou): [doplnit].

**Rozšíření pro rychlejší studenty** (neplést s minimem): [doplnit].

## 3. Dramaturgie interaktivního výkladu

Úvodní otázka z praxe: **[Proč / jak / co by se stalo, kdyby…?]**  
Motivační reálné zařízení / situace: [doplnit].

Každou kapitolu popsat podle tohoto mikroformátu. Počet kapitol odpovídá tématu, ne pevné kvótě.

### Kapitola [01]: [otázka, na niž odpovíme]

- **Úroveň:** M / P / R
- **Navazuje na:** [předchozí znalost]
- **Cíl:** student umí [konkrétní dovednost]
- **Slide / vizuál:** [jediný hlavní princip, schéma, legenda, popisek]
- **Text:** [souvislé vysvětlení + přesná terminologie]
- **Ukázka:** [simulace / animace / skutečný pokus / komentovaný příklad]
- **Vstupy a výstupy:** [co student ovládá a sleduje]
- **Zadání pro studenta:** [předpověz → změň → pozoruj → vysvětli]
- **Výsledek a zpětná vazba:** [co se má stát a proč, včetně chybného řešení]
- **Poznámky k přesnosti:** [aktivní úrovně, mezní stavy, předpoklady, omezení]
- **Přechod na další kapitolu:** [jedna logická otázka]

*(Kopírovat pro každou kapitolu.)*

## 4. Katalog demonstrací a simulací

| ID | Název | Co vysvětluje | Vstupy / parametry | Výstup | Použití ve výkladu | Samostatná Laboratoř | Limity modelu |
|---|---|---|---|---|---|---|---|
| LAB-01 | [název] | [princip] | [...] | [...] | [kapitola] | ano | [...] |

Požadavky: shodný zdroj komponenty pro oba pohledy, reset, krokování kde dává smysl, textový stav, klávesnice, použití na telefonu i projektoru, automaticky ověřené základní stavy. Pokud simulace nemá didaktický přínos, nahradit ji jinou vhodnou názornou formou a stručně zdůvodnit.

## 5. Ucelený studijní materiál

U každé otázky připravit samostatně čitelný materiál s těmito oddíly:

1. Oficiální zadání a stručná orientace v tématu
2. Vysvětlení všech pojmů a podbodů v logickém sledu
3. Schémata, rovnice, tabulky, legenda a význam symbolů
4. Aplikace v mechatronice / průmyslu
5. Nejméně dva **řešené** příklady nebo případové studie přiměřené tématu
6. Časté chyby, záměny a důležité výjimky
7. Maturitní minimum v přehledu „Co musím umět vysvětlit a nakreslit“
8. Odkazy na odborné zdroje, popisky a licence použitých podkladů

**Tisk:** při tisku zůstávají čitelné rovnice, schémata a příklady; interaktivní stav je nahrazen obrázkem či tabulkou.

## 6. Ověření a pracovní list

Připravit **matici úloh**, aby se opravdu testovalo celé zadání:

| ID úlohy | Oficiální podbod | Typ | Obtížnost | Co se ověřuje | Správný výsledek / kritérium |
|---|---|---|---|---|---|
| T01 | [...] | porozumění pojmu | M | [...] | [...] |
| T02 | [...] | tabulka / výpočet / schéma | M | [...] | [...] |
| T03 | [...] | vysvětli proč / oprav chybu | P | [...] | [...] |

Typy střídat: krátká odpověď, doplňování, schéma, časový diagram, simulace s predikcí, rozbor chyby, praktický scénář. Výsledky doplňovat vysvětlením, ne pouze „správně/špatně“.

**Pracovní list:** zadání, prostor na postup, jednoznačné instrukce, rozumná délka pro vyučovací hodinu.  
**Řešení:** vypracovat a odborně ověřit; důvěrná řešení a neveřejné testy **neukládat do veřejného repozitáře**.

## 7. Ústní maturita nanečisto

- **Osnova odpovědi:** [logická struktura 10–15 minut, dle školních podmínek]
- **Povinné kresby / schémata / výpočty:** [...]
- **Praktické použití:** [...]
- **Typické doplňující otázky komise:** [...]
- **Co znamená zvládnuto:** [konkrétní vědomosti a dovednosti]
- **Co znamená zásadní mezera:** [...]
- **Časté chyby a doporučení učiteli:** [...]

## 8. Zdroje a odborná revize

| Tvrzení / schéma / komponenta | Zdroj | Licence / povolení | Kontrola |
|---|---|---|---|
| [...] | [...] | [...] | [datum / kdo] |

Záznam rozporů, nejistot či nepodložených tvrzení: [...]

## 9. Převzetí do webu a předání k revizi

- [ ] Obsah je úplný vůči schválenému zadání
- [ ] Výklad je samostatně pochopitelný, ale stále odborně přesný
- [ ] Experimenty jsou vložené **přímo do výkladu**
- [ ] Laboratoř používá tytéž modely
- [ ] Existuje ucelený tisknutelný studijní text
- [ ] Existují kontrolní otázky, úlohy, pracovní list a maturitní osnova
- [ ] Simulace i běžný text fungují na mobilu, počítači a projektoru
- [ ] Vyplněno `REVIEW.md`
- [ ] Uvedeno jméno schvalujícího a datum

### Poznámka k cestám

Ve stávajícím portálu používat `mechatronika/maturita/` jako hlavní rozcestník. Nové otázky přidávat pod stabilní URL `mechatronika/maturita/NN-nazev/`. Už fungující adresy, zejména u otázky 05 a 05A, **zachovat**. Interní autorské soubory zůstávají pod `.github/maturita/` nebo v jiné explicitně z publikace vyloučené cestě.
