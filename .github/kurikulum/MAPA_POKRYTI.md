# Mapa pokrytí ŠVP · Mechatronika a robotika

**Verze:** 0.2 · **Datum:** 2026-11-22  
**Stav:** **ÚPLNÝ INVENTÁŘ JEDNOTLIVÝCH VÝSTUPŮ ŠVP; OBSAHOVÉ POKRYTÍ A JEHO ODUČENÍ DOSUD NEPROKÁZÁNO**  
**Zdroj:** [ŠVP Elektrotechnika – Mechatronika 2024](README.md), oddíl 6.22, včetně tabulek na stranách **476–482**.

## 1. Hlavní dokumenty a pořadí kontroly

| Dokument | Co skutečně obsahuje | Stav |
|---|---|---|
| [3. ročník: 47 jednotlivých výstupů](VYSTUPY_3_ROCNIK.md) | 47 doslovných formulací ŠVP, stránka, interní ID, **14 původních bloků učiva** | **Inventář dokončen**; vazby na konkrétní lekce a důkazy otevřené |
| [4. ročník: 42 jednotlivých výstupů](VYSTUPY_4_ROCNIK.md) | 42 doslovných formulací ŠVP, stránka, interní ID, **18 původních bloků učiva** | **Inventář dokončen**; vazby na konkrétní lekce a důkazy otevřené |
| [Návrh návaznosti na výuku, úlohy a maturitu](PLAN_NAVAZNOSTI.md) | Pro všech **32 tematických bloků** návrh lekce, aktivní činnosti a tematická návaznost na pracovní 20otázek | **Pracovní návrh**, není doklad o existenci obsahu |
| [Oficiální zdroj a pravidla](README.md) | Identifikace verze ŠVP, původní PDF, kontrola platnosti, pravidla dokladování | Evidováno; prověřit případné dodatky pro 2026/27 |

**Tento soubor je rozcestník a stavový přehled; zdrojem pravdy pro doslovné znění jsou dvě příslušné matice.**

## 2. Co jsme ověřili a co ne

| Ukazatel | 3. ročník | 4. ročník | Celkem |
|---|---:|---:|---:|
| Jednotlivě zaevidované výstupy ŠVP | **47** | **42** | **89** |
| Bloky učiva podle původní tabulky | **14** | **18** | **32** |
| Ověřený úplný řetězec „výstup → webový výklad → aktivní úloha → kontrola“ | **0** | **0** | **0** |
| Výstupy se známou **dílčí kandidátní** webovou vazbou | **1** | **0** | **1** |
| Výstupy potvrzeně **odučené** podle evidence v tomto repozitáři | **nedoloženo** | **nedoloženo** | **nedoloženo** |
| Výstupy potvrzeně **zvládnuté** studenty podle zde dostupné evidence | **nedoloženo** | **nedoloženo** | **nedoloženo** |

**Důležitá interpretace:** Nula ve sloupci „úplný řetězec“ neznamená, že se látka nevyučuje nebo že studenti nic neumějí. Znamená jen, že dosud neexistuje **auditovatelná kompletní evidence v tomto projektu**. Na webu máme rozpracovanou maturitní otázku 05 a část 05A, což může částečně souviset s `MER3-V012`; dokud neověříme všechny její požadované souvislosti, není to úplné pokrytí.

## 3. Interní identifikátory

Nově vytvářené materiály používají:

- `MER3-V001` až `MER3-V047`: jednotlivé výstupy 3. ročníku;
- `MER4-V001` až `MER4-V042`: jednotlivé výstupy 4. ročníku;
- `MER3-U01` až `MER3-U14`: původní skupiny učiva 3. ročníku;
- `MER4-U01` až `MER4-U18`: původní skupiny učiva 4. ročníku.

**Staré ID** `MER3-01` až `MER3-12` a `MER4-01` až `MER4-14` z verze 0.1 byly pouze **volné tematické oblasti** a jsou nyní **nahrazeny** přesnějšími ID `V` (výstupy) a `U` (učivo). **Nezaměňovat ani neprovádět převod 1:1**. Identifikátory nejsou součástí samotného ŠVP.

## 4. Pět různých stavů, které se nesmějí směšovat

| Stav | Kdy jej použít | Doklad |
|---|---|---|
| `NEPŘIŘAZENO` | Neexistuje ještě konkrétní odkaz na materiál nebo úlohu | Neúplný řádek matice |
| `PLÁNOVÁNO` | Víme, jakou lekci a úlohu vytvořit | Schválené zadání, stále **ne důkaz** |
| `MATERIÁL OVĚŘEN` | Odborně a pedagogicky revidovaný výklad i aktivní úloha pokrývají výstup | URL, ID úlohy, kontrola dle `REVIEW.md` |
| `ODUČENO` | Výstup byl ve skutečnosti probrán v konkrétní třídě | Datum, třída, pedagogická evidence |
| `ZNALOST OVĚŘENA` | Student skutečně předvedl požadovanou dovednost | Typ zkoušky/úlohy a výsledek, **bez osobních údajů ve veřejném repo** |

Předmět může být **materiálově pokrytý** a přitom ještě neodučený. Nebo odučený, ale bez hotové webové učebnice. Proto je nutné vést stavy zvlášť. Položka `ZATÍM NEOVĚŘENO` v hlavních maticích zatím shrnuje nedokončený audit těchto vazeb.

## 5. Povinné pole při každé budoucí revizi lekce a maturitní otázky

```yaml
svp:
  dokument: ELE/2020/02
  predmet: Mechatronika a robotika
  rocnik: 3
  vystupy: [MER3-V012]
  ucivo: [MER3-U04]
  zdrojove_strany: [477]
  rezim: navrh # navrh / material_overen / oduceno / znalost_overena
  konkretni_uloha_id: "doplnit"
  dukaz: "doplnit"
```

**Poznámka:** Zápis je ilustrace zamýšlených metadat, nikoli systém automaticky vyhodnocující splnění ŠVP. Odborná/pedagogická revize je pořád nutná.

## 6. Co je ještě otevřené

1. Ověřit, že pro aktuální třídy 2026/27 stále platí přesně tato verze ŠVP a neexistují změnové listy.
2. Získat **doslovná oficiální maturitní zadání** s podbody; pracovní „Mapa maturitních témat“ je pouze analytický podklad.
3. Vytvořit/odkazovat konkrétní lekce a úlohy, doplnit jejich ID a URL ke **každému výstupu**.
4. Ověřit veškeré položky učiva v tematických blocích `Uxx`, nejen počet výstupů.
5. Odděleně doplňovat evidenci odučení a skutečného ověření dovedností.
6. Po zpracování otázek 05/06 provést vzorový audit a zpřesnit šablony pro další témata.

## 7. Související metodika

[Standard výuky](../vyuka/README.md) · [Standard maturity](../maturita/README.md) · [Standard úloh](../ulohy/README.md) · [Celkový přehled dokumentace](../STANDARDY.md).
