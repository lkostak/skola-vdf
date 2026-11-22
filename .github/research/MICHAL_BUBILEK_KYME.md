# Inspirace z výukových materiálů Michala Bubílka (KYME)

**Datum rešerše:** 2026-11-22  
**Stav:** interní analýza a doporučení, nikoli automaticky schválená změna standardu  
**Zdroj:** https://github.com/bubilem/sps-vyukove-materialy  
**Veřejný rozcestník KYME:** https://bubilem.github.io/sps-vyukove-materialy/KYME/index.html

## Rozsah prověrky a omezení

Přečteny zdrojové soubory devíti výukových modulů KYME (010, 020, 030, 040, 041, 042, 043, 050, 060), dokumentace `AGENTS.md`, `docs/presentation-framework-guide.md`, `.agents/rules/presentation-guidelines.md`, prezentační JavaScript a část CSS. Analýza vychází především ze statického čtení HTML/JS a zdrojových didaktických textů. **Nejde o plný průchod webu v grafickém prohlížeči ani o nezávislé didaktické testování se studenty.** Převzaté postřehy před implementací ověřit.

## Co je dobře a co se vyplatí převzít jako princip

1. **Motivující reálné problémy:** modul 030 střídá vysvětlení s velmi konkrétními situacemi: ABS na suchu/mokru/náledí, CNC osa s odměřováním, potlačení třesu u robotické chirurgie, bionická ruka, stabilizace mobilní kamery. Pedagogický vzor: problém → předpověď → ukázka → vysvětlení → transfer.
2. **Názornost bohatých modelů:** modul 020 předvádí typy kinematiky, šest stupňů volnosti a bezpečnostní buňku; modul 043 křivky příslušnosti, fuzzy operátory, defuzzifikaci a regulátor.
3. **Věrně technické ukázky místo dekorativních obrázků:** logická hradla (050) se stavovými přepínači; Karnaughovy mapy (041) přímo přepočítávají logický výraz.
4. **Jednotný prezentační systém:** navigace po snímcích, klávesy, osnova, fullscreen, dark/light motiv, přímé URL na konkrétní snímek; společné CSS/JS.
5. **Dobrá autorská disciplína:** vlastní `AGENTS.md` a manuál explicitně vymezují cílovou skupinu, odbornou přiměřenost, offline provoz, konzistentní grafiku, pojmenování a umístění sdíleného kódu.

## Kde se chceme pedagogicky posunout

### 1. Ze simulátoru se má stát trenažér

Karnaughův applet 041 automaticky dopočítá minimalizovaný výraz při změně mapy. To velmi dobře vizualizuje výsledek, ale samo o sobě to ještě neověřuje dovednost **minimalizovat**. Pro naši verzi navrhnout tři režimy, které používají stejný matematický model:
- **Pozoruj:** měním vstupy a sleduji výstup;
- **Vyřeš:** skupinuji jedničky / navrhuji řešení sám;
- **Zkontroluj:** vysvětlující vyhodnocení, krokování a cílená nápověda.

Stejné pravidlo platí pro časové diagramy, klopné obvody, PLC, regulaci a robotiku. **Neprezentovat automaticky finální výsledek dříve, než student dostal příležitost ho odvodit.** Výjimkou je ukázkový řešený příklad.

### 2. Zpětná vazba vysvětluje chybný model studenta

Kvíz modulu 030 nabízí pět otázek a zpětnou vazbu. U některých možností však jsou chybné odpovědi záměrně velmi vzdálené oblasti problému (u CNC pravítka např. siréna nebo čas). Při tvorbě našich testů používat **věrohodné odborné distraktory** odpovídající skutečným chybným představám. Zapojit i otázky s nákresem, měřením, vyhodnocením tabulky, rozborem závady a písemným zdůvodněním.

### 3. Hloubku garantuje pokrytí výstupů, ne počet slidů

Moduly mají různé rozsahy: například 030 = 16 slidů, 020 = 12, 043 = 15, 060 = 6 (včetně úvodu a závěru). Modul 060 ve zdroji neobsahuje vlastní interaktivní ovládání; části D/JK/čítače/registry jsou vysvětlené stručně. Není to chyba oproti jeho cíli, ale pro naše maturitní otázky 05/06 **nesmí být jediným podkladem**. Každý oficiální podbod ŠVP a maturitního zadání musí mít odpovídající obsah i ověření.

### 4. Technická přesnost a normy

- U zjednodušených příkladů výslovně uvádět předpoklady modelu a nepředávat intuitivní analogii jako přesný fyzikální zákon.
- U bezpečnostních norem aktualizovat verze a formulovat podmíněnost požadované úrovně: např. ISO 13849-1 sama **obecně nenařizuje** všude PL d/e a kategorii 3/4; požadovaný PLr závisí na posouzení rizika a konkrétní funkci.
- Při přebírání ukázek bezpečnostních buněk vyžadovat odbornou kontrolu a zohlednit aktualizace ISO 10218.

### 5. Přesun od prezentačního archivu k samostatně použitelné učebnici

Silnou prezentační formu doplnit samostatně čitelným výkladem, cíli, mapou pokrytí ŠVP, řešenými i samostatnými úlohami, pracovními listy a maturitní osnovou. Rozlišovat projekční režim a samostudium, ale udržovat jediný zdroj pravdy.

## Technické doporučení

- Převzít **princip** sdíleného prezentačního frameworku a offline použitelnosti, nikoli nekriticky celé soubory.
- Oddělit obsah lekce, vzhled, simulační model a vykreslovací komponentu. Jedna JS implementace musí být použitelná uvnitř výkladu i v katalogu Laboratoř / Úlohy a projekty.
- Kontrolovat mobil, projektor, ovládání klávesnicí, reset, textový stav, tisk a scénáře hraničních hodnot.
- Vyhnout se mnohočetným neprůhledným inline skriptům a nezávislým variantám téhož odborného modelu.
- Nezávisle testovat přesnost: referenční výsledky, hraniční hodnoty, časové chování, neplatné kombinace a bezpečnost.

## Doporučení pro náš standard (k promítnutí při první revizi)

| Návrh pravidla | Uplatnit v |
|---|---|
| V technických demonstracích student nejprve předpovídá, potom testuje a vysvětluje | výuka, maturita, úlohy |
| Režimy Pozoruj / Vyřeš / Zkontroluj dle povahy simulace | úlohy a sdílené simulace |
| Distraktory odpovídají pravděpodobným odborným omylům, nikoli komickým možnostem | maturita, úlohy |
| Odborné idealizace a aktuálnost technických norem se kontrolují explicitně | všechny oblasti |
| Žádná kapitola není hotová bez mapy ŠVP / oficiálního maturitního zadání | výuka, maturita |
| Grafická prezentace musí mít plnohodnotnou studijní alternativu | výuka, maturita |

## Licence a přenos

Zdrojový repozitář uvádí licenci MIT. Ta neznamená automatické povolení převzít všechny externí fotografie a vložené materiály třetích stran. U převzatého kódu dodržet licenci a zachovat požadované oznámení o autorských právech; u dalších prvků ověřit samostatně práva. Pro náš web je lepší nejprve vlastní architektura a inspirace metodou.

## Relevantní zdroje

- https://github.com/bubilem/sps-vyukove-materialy/blob/main/AGENTS.md
- https://github.com/bubilem/sps-vyukove-materialy/blob/main/docs/presentation-framework-guide.md
- https://github.com/bubilem/sps-vyukove-materialy/blob/main/KYME/030-Uziti-mechatroniky/index.html
- https://github.com/bubilem/sps-vyukove-materialy/blob/main/KYME/020-Robotika/index.html
- https://github.com/bubilem/sps-vyukove-materialy/blob/main/KYME/041-Karnaughovy-mapy/index.html
- https://github.com/bubilem/sps-vyukove-materialy/blob/main/KYME/043-Fuzzy-logika/index.html
- https://github.com/bubilem/sps-vyukove-materialy/blob/main/KYME/060-Obvody/index.html

**Stav akce:** doporučení zdokumentována; studentský web a existující výukové moduly zatím beze změn.
