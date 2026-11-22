# Maturitní otázka 01 · Číselné soustavy

**Pracovní produkční záznam v0.1 · 2026-11-22**  
**Stav:** VÝUKOVÝ PROTOTYP · K PEDAGOGICKÉ A ODBORNÉ REVIZI  
**Oficiální podoba zadání:** Přesný schválený školní dokument se všemi podbody **nebyl nezávisle ověřen**. Rozsah níže vychází z dříve zpracované pracovní maturity mapy a již vytvořených skript. Nezaměňovat pracovní specifikaci s oficiálním závazným zadáním.

## 1. Zdrojové podklady a rozsah

1. Interní podklad `Mechatronika_maturitni_otazky_1-8_editovatelna_tabulka.docx` (01.10.2026), otázka **1. Číselné soustavy**: „Desítková, dvojková, osmičková a šestnáctková soustava; převody mezi soustavami; poziční zápis; bit, nibble, bajt, slovo; rozsahy čísel; základní početní operace; zápis záporných čísel a dvojkový doplněk.“
2. `Mapa_maturitnich_temat_Mechatronika_a_robotika.docx` (09/2026): maturitní minimum výslovně zdůrazňuje poziční zápis a váhy, dvojkovou/desítkovou/šestnáctkovou soustavu, orientačně osmičkovou, bit/byte, `2ⁿ` stavů, rozsah a praktický význam hex. Je třeba jasně oddělit číslo od jeho kódu (otázka 02).
3. Dříve vytvořený **29stránkový dokument** `Maturitni_otazka_01_Ciselne_soustavy_skripta(1).docx`, který obsahuje ucelený výklad, 48 procvičovacích úloh, komentovaná řešení, tři laboratorní úlohy, ústní osnovu a příklady z PLC / ADC. Studijní kopie byla 2026-11-22 převedena do PDF pro učitelskou revizi. **PDF není zatím publikováno na školním webu ani v GitHubu.**
4. ŠVP `ŠVP Elektrotechnika – Mechatronika 2024`, platnost od 01.09.2022, oddíl 6.22: `MER3-U04` **Číslicová technika a mechatronika**, strana 477, uvádí „zobrazení informace v počítači“ a „Booleova algebra, číselné soustavy, jednotky“. Výstupy `MER3-V011` („používá základní pojmy, případně slangové výrazy“) a `MER3-V012` (návrh řídicích obvodů) mají obecnou návaznost, nikoli výslovný jednotlivý výstup pro každou konverzi. **Obsahová vazba neznamená potvrzené splnění ŠVP.**

## 2. Maturitní minimum, rozšíření a hranice

**M (minimum):**
- Vysvětlit hodnotu čísla versus jeho zápis, význam základu a pozičních vah.
- Rozlišit soustavy 2, 8, 10, 16 a znát jejich povolené číslice.
- Převést celá čísla v obou směrech mezi 2 ↔ 10 a 2 ↔ 16; u jednodušších 10 ↔ 16, orientačně oktal.
- Rozumět bitu, nibblu, bytu, slovu, LSB/MSB a tomu, co znamená bitová šířka.
- Odvodit `2ⁿ` kombinací a unsigned rozsah `0 … 2ⁿ−1`.
- Vysvětlit význam hex zápisu v registrech, adresách, PLC a ADC.
- Provést jednoduché binární sčítání a rozpoznat situaci, kdy výsledek překračuje pevně danou bitovou šířku.

**P (prohloubení podle pracovní otázky 01):**
- Dvojkový doplněk pro záporná čísla, podepsaný rozsah `−2ⁿ⁻¹ … 2ⁿ⁻¹−1`.
- Bitové operace a masky, interpretace stavového slova, kontrola vstupů PLC.
- Praktické použití na 10/12bitové hodnotě ADC, škálování a diagnostika.

**R (rozšíření):** Endianness, bitové posuny v různých jazycích, signed overflow a detailní ADC kvantizační model. U otázky 02 se budou učit **kódy** (BCD, Gray, ASCII), nikoli znovu číselné soustavy.

## 3. Struktura webu

| Část | Umístění | Obsah | Stav |
|---|---|---|---|
| Přehled a ústní osnova | `mechatronika/maturita/01-ciselne-soustavy/index.html` | Úvod + 2 karty + 10 rozbalovacích ústních odpovědí, co umět nakreslit | IMPLEMENTOVÁNO |
| 1A Číslo a zápis | `mechatronika/maturita/01a-ciselne-soustavy/index.html` | 6 kapitol: smysl soustav, poziční princip, binární váhy, převody, hex a oktal, převodník | IMPLEMENTOVÁNO |
| 1B Bity a praxe | `mechatronika/maturita/01b-bity-rozsahy/index.html` | 6 kapitol: bit/byte, `2ⁿ`, přetečení, dvojkový doplněk, masky, PLC/ADC + test | IMPLEMENTOVÁNO |
| Sdílené logické jádro | `assets/js/number-core.js` | Převody, rozklady, rozsahy, dvojkový doplněk, bitové operace a osmibitové přetečení | IMPLEMENTOVÁNO |
| Výuková interaktivita | `01a-ciselne-soustavy/app.js`, `01b-bity-rozsahy/app.js` | Převodník, stav bitového registru, šířka a rozsah, sčítání, signed a kvíz | IMPLEMENTOVÁNO |
| Styling | `01-ciselne-soustavy/number.css` | Vzhled kompatibilní s 5A a souhrnnou osnovou 05 | IMPLEMENTOVÁNO |
| CI testy | `tests/number-core.test.js`, `.github/workflows/mer01-tests.yml` | Jednotkové testy matematických modelů a syntaktická kontrola | IMPLEMENTOVÁNO; CI PASS [běh 45050299523](https://github.com/lkostak/skola-vdf/actions/runs/45050299523) |
| Studijní PDF | Konverze výše uvedených 29stránkových skript | 17 kapitol, modelové odpovědi, 48 procvičovacích úloh a jejich řešení | PŘIPRAVENO K REVIZI, NEZVEŘEJNĚNO |
| Samostatný pracovní list | Mimo GitHub, pracovní PDF | 6 stran A4, 13 úloh, prostor na výpočty a kreslení, celkem 100 bodů | PŘIPRAVENO K REVIZI, NEZVEŘEJNĚNO |
| Neveřejný klíč pro učitele | Mimo GitHub, pracovní PDF | 4 strany A4, komentovaná řešení a rozpis 100 bodů, bez zveřejnění studentům | PŘIPRAVENO K REVIZI, NEZVEŘEJNĚNO |

## 4. Požadavky na kvalitu

- U výkladových kapitol **text → názorný příklad → aktivní krok → interpretace**, stejné pravidlo jako v otázce 05.
- Výpočty vycházejí z jediného zdroje `number-core.js`, nikoli z nezávislých algoritmů napříč lekcemi.
- Převodník je schválně omezen na **celá nezáporná čísla 0 až 65535**. Neinterpretuje znaménko bez explicitní datové šířky. Zlomky a rozsahy nad bezpečnou 16bitovou oblast vyžadují jiný model.
- Třídění „číselná soustava“ versus „kódování“ musí zůstat jasné.
- Výslovně odlišovat počet kombinací `2ⁿ` od maxima `2ⁿ−1`, unsigned přenos od signed overflow a počet kódů ADC od skutečné přesnosti měření.
- Dvojkový doplněk a masky jsou označeny jako prohloubení, nikoli předstíraný oficiální minimální podbod.
- Veřejný web nesmí zveřejnit neveřejný učitelský klíč ani testy s nechtěně odhaleným hodnocením.

## 5. Plán dalších kroků

- [x] Připravit podrobný interaktivní výklad 1A/1B a samostatné rozbalovací ústní odpovědi.
- [x] Připojit otázku 01 k hlavnímu maturitnímu rozcestníku.
- [x] Připravit pracovní PDF export dřívějších skript k revizi učitelem.
- [ ] Učitel projde odborný obsah 1A/1B a 29stránková skripta; opravy se musí zanést do všech podob materiálu.
- [ ] Ručně zkontrolovat matematiku interaktivních příkladů, chybové stavy, klávesnici, mobil a projekci.
- [ ] Nezávisle potvrdit úplné oficiální schválené zadání, podbody, ŠVP a vysvětlit případné rozpory v rozsahu.
- [x] Vytvořit pracovní list student (6 stran / 13 úloh / 100 b) a oddělený klíč učitele (4 strany). **Oba zatím pouze ke kontrole, NEVEŘEJNÉ.**
- [ ] Připojit ke studentskému webu **až schválené** PDF s výkladem a pracovní listem, nikoli učitelský klíč.
- [ ] Vyplnit `REVIEW.md`, potvrdit všechny BLOKER položky a zaznamenat konečné schválení.

**Dosavadní status není HOTOVO.** Přesná maturitní terminologie, rozsah rozšíření i finální PDF čekají na revizi.

## 6. Výsledky průběžné technické kontroly

- [x] 2026-11-22: GitHub Actions `Maturita 01 · převody a bitové operace` [PASS](https://github.com/lkostak/skola-vdf/actions/runs/45050299523). Testy obsahují různá zadání pro 2/8/10/16, chybné číslice, rozklad na váhy, rozsahy 4/8/10/12/16 bitů, signed hodnoty, masky a přetečení, a přítomnost ústní osnovy i obou lekcí.
- [x] 2026-11-22: pracovní PDF převedeno z dřívějších 29stránkových skript, prověřen počet stran a jejich viditelné vykreslení; schéma původního dokumentu zachováno. **Jde o dříve vytvořený text, nikoliv novou autorskou redakci.**
- [x] 2026-11-22: vytvořen samostatný šestistránkový pracovní list (13 úloh, 100 bodů) a čtyřstránkový neveřejný klíč; renderovány všechny strany a vizuálně zkontrolována sazba.
- [ ] Zbývá osobní kontrola na konkrétních mobilních zařízeních a projektoru.
- [ ] Zbývá obsahová revize 29stránkového podkladu, úloh a interpretací ADC před zveřejněním.
- [ ] Zbývá kontrola oproti schválenému oficiálnímu úplnému maturitnímu zadání.

**Učitelský klíč v žádném případě nepublikovat do veřejného repozitáře.**
