# Kontrola kvality maturitní otázky (release checklist)

Tento seznam použij **pro každou otázku před označením HOTOVO**. Přijímací kritérium: všechny položky označené **BLOKER** splněny; ostatní také splněny nebo výslovně zdůvodněna výjimka. Nestačí kontrolovat pouze funkčnost stránky.

**Otázka:** [NN a přesný název]  
**Revize:** [datum, autor, odborný revizor, pedagogický revizor]  
**Výsledek:** K REVIZI / HOTOVO / K AKTUALIZACI  
**Otevřené chyby:** [...]

## A. Úplnost a odborná správnost

- [ ] **BLOKER** Přesné oficiální zadání bylo porovnáno se schváleným seznamem, nikoli odhadnuto z názvu.
- [ ] **BLOKER** Každý oficiální podbod má obsah ve výkladu, ve studijním materiálu a odpovídající úlohu v ověření (viz mapa pokrytí).
- [ ] **BLOKER** Žádná definice, rovnice, tabulka, schéma či simulace není odborně nesprávná.
- [ ] Značky, jednotky, názvosloví a aktivní úrovně jsou konzistentní v celém tématu.
- [ ] Vysvětlené předpoklady, mezní a nepovolené stavy i omezení zjednodušených modelů.
- [ ] Objasněno napojení na skutečnou mechatronickou praxi a případná bezpečnostní rizika.
- [ ] Označeno, co je maturitní minimum, co praktické prohloubení a co rozšíření.

## B. Pedagogická kvalita a hloubka

- [ ] **BLOKER** Každý hlavní oddíl má konkrétní ověřitelný vzdělávací výstup.
- [ ] Výklad začíná srozumitelným problémem, nikoli pouze definicemi.
- [ ] Kapitoly na sebe logicky navazují a neopakují se zbytečně.
- [ ] Každý klíčový princip má čitelné vizuální vysvětlení.
- [ ] **BLOKER** Interaktivní či jiná praktická ukázka je integrována přímo do výkladu, nebo je výjimka pedagogicky zdůvodněná.
- [ ] Student musí něco předpovědět, popsat, změnit, vypočítat či zakreslit; nejde jen o pasivní sledování.
- [ ] Zpětná vazba vysvětluje **proč** je výsledek správný nebo nesprávný.
- [ ] Jsou uvedeny aspoň dva komentované příklady či případové studie vhodné pro dané téma.
- [ ] Student s materiálem dokáže připravit souvislou ústní maturitní odpověď a zvládne typické doplňující otázky.

## C. Interaktivita a kvalita simulace

- [ ] **BLOKER** Model se chová správně v nominálních, hraničních a chybných stavech.
- [ ] Stejnou simulaci používá výklad a Laboratoř; neexistují dvě nesynchronizované implementace.
- [ ] Jsou jasně označeny vstupy, výstupy a návod „co zkusit“.
- [ ] Simulaci lze resetovat; při vhodném typu i krokovat nebo pozastavit.
- [ ] Student dostává textovou zpětnou vazbu o stavu, ne pouze barvu.
- [ ] Ověřeny aspoň tři typické scénáře; jejich očekávané výsledky jsou součástí záznamu revize.
- [ ] Zjednodušený model je tak označen a neslibuje věrnost skutečnému hardwaru.

**Záznam ověřených scénářů simulace:**

| Scénář | Vstup / postup | Očekávaný výstup | Zjištěno | PASS/FAIL |
|---|---|---|---|---|
| Nominální | [...] | [...] | [...] | [...] |
| Hraniční | [...] | [...] | [...] | [...] |
| Chybný / reset | [...] | [...] | [...] | [...] |

## D. Studijní materiál a zkoušení

- [ ] **BLOKER** Studijní text funguje jako úplná samostatná učební opora bez JavaScriptu.
- [ ] Obsahuje podrobné vysvětlení všech podbodů, popisky obrázků a řešené příklady.
- [ ] Tisk do PDF je čitelný; nic důležitého nezmizí při tisku.
- [ ] **BLOKER** Test nebo soubor úloh pokrývá celé zadání, nejen snadno automaticky hodnotitelné detaily.
- [ ] Zahrnuje porozumění, aplikaci a vysvětlení / odůvodnění.
- [ ] Pracovní list má jasné zadání a dost místa na postup či nákres.
- [ ] Existuje ověřený klíč nebo rubrika hodnocení pro učitele.
- [ ] Připravená osnova 10–15minutové odpovědi (upravit podle konkrétní školní maturity).

## E. Web, přístupnost a provoz

- [ ] **BLOKER** Stránka se načte, nezobrazuje chyby a funguje po přímém otevření URL.
- [ ] Vyzkoušeno na mobilním displeji, desktopu a při projekci.
- [ ] Ovládání a stavové informace jsou dostupné i bez myši, včetně smysluplného označení tlačítek.
- [ ] Čitelný kontrast, adekvátní velikost písma, přehledná struktura nadpisů.
- [ ] Důležité učivo existuje i bez spuštění animace.
- [ ] Navazující odkazy, cesta zpět na rozcestník a stávající URL fungují.
- [ ] Sdílené komponenty a data nejsou kopírovány do více nezávislých verzí.
- [ ] Citace a licence externího obsahu ověřeny; používání AI nezastupuje odbornou revizi.
- [ ] Citlivé klíče, neveřejné testy ani osobní údaje studentů nejsou ve veřejném repozitáři.

## F. Závěrečný verdikt

**Kritické chyby (BLOKER):** [0 / počet a odkazy]  
**Drobné připomínky:** [...]  
**Odůvodněné výjimky:** [...]  
**Odborně schválil(a):** [jméno, datum]  
**Pedagogicky schválil(a):** [jméno, datum]  
**Rozhodnutí o publikaci:** [HOTOVO / VRÁTIT K REVIZI]

### Referenční ověření na otázce 05

Při prvním použití standardu ověřit zejména:
- rozdíl mezi kombinační a sekvenční logikou;
- stav, paměť a zpětnou vazbu;
- přechodovou tabulku základního **NOR-RS** vs aktivně nízké **NAND-RS**;
- použití RS v START/STOP, včetně priority bezpečného STOP v reálném řízení;
- D a JK, hodinové signály a časové diagramy;
- shodu chování a popisků interaktivní 5A se studijním textem.

*Poznámka: tento referenční seznam vychází z dosavadního výukového prototypu. Úplnost otázky 05 musí být samostatně potvrzena podle schváleného oficiálního znění.*

---

Související: [Standard](README.md) · [Šablona otázky](TEMPLATE.md)
