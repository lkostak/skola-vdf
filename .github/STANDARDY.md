# Redakční a pedagogické standardy · Mechatronika a robotika

**Verze:** 0.1 · **Datum:** 2026-11-22  
**Účel:** Jediné interní rozcestí pro vytváření a kontrolu obsahu výukového portálu. Dokumenty jsou veřejné v GitHub repozitáři, ale mimo studentskou navigaci.

| Oblast | Standard | Šablona | Kontrola kvality |
|---|---|---|---|
| **Výuka 3. a 4. ročníku** | [README](vyuka/README.md) | [TEMPLATE](vyuka/TEMPLATE.md) | [REVIEW](vyuka/REVIEW.md) |
| **Maturitní otázky** | [README](maturita/README.md) | [TEMPLATE](maturita/TEMPLATE.md) | [REVIEW](maturita/REVIEW.md) |
| **Úlohy a projekty** | [README](ulohy/README.md) | [TEMPLATE](ulohy/TEMPLATE.md) | [REVIEW](ulohy/REVIEW.md) |

## Závazné podklady a rešerše

- **ŠVP – primární obsahový zdroj:** [identifikace originálu, platnost a stránky](kurikulum/README.md); [pracovní mapa pokrytí ŠVP 3. a 4. ročníku](kurikulum/MAPA_POKRYTI.md). Před označením HOTOVO ověřit vazby na konkrétní ŠVP výstupy.
- **Pedagogická inspirace:** [interní analýza materiálů Michala Bubílka (KYME)](research/MICHAL_BUBILEK_KYME.md). Doporučení se nepovažují automaticky za schválené standardy; ověřit je na vzorové otázce a lekci.

## Vztahy a odpovědnosti

- **Výuka:** postupný rozvoj znalostí a praktických schopností v čase, návaznost na ŠVP a skutečné hodiny, scénář pro učitele i samostudium pro žáka.
- **Maturita:** kompletní pokrytí oficiálního maturitního zadání, kvalitní vysvětlení, souhrnný studijní materiál a ověření schopnosti samostatné ústní odpovědi.
- **Úlohy a projekty:** znovupoužitelné problémy, příklady, cvičení, laboratoře a komplexní projekty s měřitelným výsledkem, testy a rubrikou hodnocení.

**Integrované praktické ukázky:** Není rozdíl „výklad = teorie“ a „laboratoř = praxe“. Ve výkladu jsou praktické ukázky, krátká cvičení a simulace na správném místě. Katalog úloh je navíc zpřístupňuje samostatně. Jednu odbornou simulaci i jedno zadání používáme opakovaně prostřednictvím odkazů nebo společných komponent.

## Povinný postup při tvorbě nové položky

1. Urči typ: výuková lekce / maturitní otázka / úloha či projekt.
2. Zvol příslušný `TEMPLATE.md`; ověř ŠVP nebo **doslovné oficiální maturitní zadání**.
3. Stanov ověřitelné cíle, plán obsahu a vazby na již existující zdroje.
4. Vytvoř interaktivní a textový výklad, zadání a odpovídající testy; použij existující součásti namísto kopírování.
5. Projdi `REVIEW.md` s odborným a pedagogickým revizorem.
6. Označ stav `HOTOVO` až po splnění blokujících kritérií, uveď datum a revizora.
7. Po použití ve výuce eviduj zpětnou vazbu a plán oprav.

## Společné principy

- **Odborná správnost nad efektem:** animace slouží vysvětlení, ne ozdobě.
- **Souvislé učení:** problém → vysvětlení → pokus/příklad → studentova činnost → ověření.
- **Jedna verze pravdy:** sdílené modely, komponenty, pojmy, odkazy a metadata.
- **Přístupnost:** projektor + mobil, čitelný text, klávesnice, textové stavy, tisknutelná alternativa.
- **Bezpečnost a realita:** skutečný hardware vyžaduje provozní a bezpečnostní instrukce, virtuální model má vysvětlená omezení.
- **Pedagogická ověřitelnost:** student dovede ukázat, že danému jevu rozumí, ne jen přečíst definici.
- **Ochrana informací:** neveřejné hodnoticí klíče, data studentů a hesla nepatří do veřejného repozitáře.

## Rozhodnutí ponechaná otevřená

- Název veřejné kategorie „Úlohy a projekty“ a zda bude v hlavní navigaci, nebo jako katalog dostupný ze všech lekcí.
- Konkrétní technické schéma sdílených JS komponent a obsahu; nejprve vyzkoušet na otázce 05 a 06 a na jedné vyučovací hodině.
- Podoba učitelských metodických poznámek, které nemají být zveřejněné jako součást studentských materiálů.

**Poznámka:** `.github/` se při běžném nasazení GitHub Pages pomocí Jekyllu nezveřejňuje jako webový obsah. V soukromí však není: obsah veřejného GitHub repozitáře je veřejně dostupný.
