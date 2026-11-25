/* 5 oblastí, 32 × 3 hodiny; lekce 01 má didaktický výklad a cvičení, zbývající jsou osnovy. */
window.MER3_COURSE={
  "version": "2026-11-25-mechatronika-svp-practice",
  "hours": 96,
  "groups": [
    {
      "id": "A",
      "title": "Mechatronika a robotika v praxi",
      "subtitle": "Jak spolupracují části strojů a kde je potkáváme",
      "color": "cyan"
    },
    {
      "id": "B",
      "title": "Snímače, pohony a řídicí obvody",
      "subtitle": "Od měření a signálů k motorům a jednoduchým zapojením",
      "color": "blue"
    },
    {
      "id": "C",
      "title": "Číslicová technika a logické řízení",
      "subtitle": "Bity, logika a jednoduché obvody s pamětí",
      "color": "purple"
    },
    {
      "id": "D",
      "title": "Mikroprocesory a programování",
      "subtitle": "Mikrořadiče, Arduino, PLC, komunikace a vlastní projekt",
      "color": "amber"
    },
    {
      "id": "E",
      "title": "Regulace a inteligentní řízení",
      "subtitle": "Zpětná vazba, regulátory a řízení skutečných soustav",
      "color": "green"
    }
  ],
  "lessons": [
    {
      "number": 1,
      "id": "TÉMA 01",
      "group": "A",
      "title": "Co je mechatronický systém?",
      "description": "Jak spolupracují mechanika, elektronika, snímače a řízení. Automatizace, ovládání a regulace.",
      "practice": "Rozpoznat snímač, řídicí jednotku a akční člen na jednoduchém stroji.",
      "hours": 3,
      "slug": "01",
      "svpUnits": [
        1,
        4
      ],
      "svpOutcomes": [
        1,
        2,
        3,
        4,
        15
      ],
      "status": "draft"
    },
    {
      "number": 2,
      "id": "TÉMA 02",
      "group": "A",
      "title": "Mechatronika a robotika kolem nás",
      "description": "Průmyslové roboty, manipulátory, CNC stroje, ABS a další praktické aplikace.",
      "practice": "Najít společné části několika mechatronických systémů.",
      "hours": 3,
      "slug": "02",
      "svpUnits": [
        1,
        2,
        12
      ],
      "svpOutcomes": [
        4,
        5,
        15,
        39
      ],
      "status": "outline"
    },
    {
      "number": 3,
      "id": "TÉMA 03",
      "group": "B",
      "title": "Elektrické, pneumatické a hydraulické systémy",
      "description": "Principy, rozdíly, základní prvky a jejich schematické značky.",
      "practice": "Roztřídit prvky a přečíst několik základních značek.",
      "hours": 3,
      "slug": "03",
      "svpUnits": [
        2
      ],
      "svpOutcomes": [
        5
      ],
      "status": "outline"
    },
    {
      "number": 4,
      "id": "TÉMA 04",
      "group": "B",
      "title": "Snímače a měření veličin",
      "description": "Snímače teploty, tlaku, polohy, otáček a dalších fyzikálních veličin.",
      "practice": "Zvolit vhodný snímač a změřit jednoduchou veličinu.",
      "hours": 3,
      "slug": "04",
      "svpUnits": [
        2
      ],
      "svpOutcomes": [
        6
      ],
      "status": "outline"
    },
    {
      "number": 5,
      "id": "TÉMA 05",
      "group": "B",
      "title": "Signály, zesilovače a napájení",
      "description": "Jak se informace dostává ze snímače do řídicí jednotky.",
      "practice": "Zakreslit cestu signálu, zesílení a zdroj energie.",
      "hours": 3,
      "slug": "05",
      "svpUnits": [
        2
      ],
      "svpOutcomes": [
        7
      ],
      "status": "outline"
    },
    {
      "number": 6,
      "id": "TÉMA 06",
      "group": "B",
      "title": "Akční členy a ovládací obvody",
      "description": "Motory, relé, ventily, spínací prvky a základní kontaktní schémata.",
      "practice": "Návrh bezpečného ovládacího obvodu a čtení kontaktního schématu.",
      "hours": 3,
      "slug": "06",
      "svpUnits": [
        3,
        12
      ],
      "svpOutcomes": [
        8,
        9,
        10,
        39
      ],
      "status": "outline"
    },
    {
      "number": 7,
      "id": "TÉMA 07",
      "group": "C",
      "title": "Jak počítač pracuje s informacemi",
      "description": "Bity, dvojková soustava, logické hodnoty a základy Booleovy algebry.",
      "practice": "Přečíst a vytvořit jednoduchý binární zápis a logickou podmínku.",
      "hours": 3,
      "slug": "07",
      "svpUnits": [
        4
      ],
      "svpOutcomes": [
        11
      ],
      "status": "outline"
    },
    {
      "number": 8,
      "id": "TÉMA 08",
      "group": "C",
      "title": "Logická hradla a obvody",
      "description": "AND, OR, NOT a další funkce, pravdivostní tabulky a jednoduchá schémata.",
      "practice": "Vyzkoušet několik hradel na jednoduchých vstupních kombinacích.",
      "hours": 3,
      "slug": "08",
      "svpUnits": [
        3,
        4
      ],
      "svpOutcomes": [
        9,
        11,
        12
      ],
      "status": "outline"
    },
    {
      "number": 9,
      "id": "TÉMA 09",
      "group": "C",
      "title": "Kombinační logické obvody",
      "description": "Jak z více vstupů vzniká rozhodnutí. Sčítačka, dekodér a praktické příklady.",
      "practice": "Navrhnout jednoduchý kombinační obvod podle zadání.",
      "hours": 3,
      "slug": "09",
      "svpUnits": [
        4
      ],
      "svpOutcomes": [
        12
      ],
      "status": "outline"
    },
    {
      "number": 10,
      "id": "TÉMA 10",
      "group": "C",
      "title": "Sekvenční obvody a paměť",
      "description": "Jak si obvod pamatuje stav. Klopné obvody, registry a čítače.",
      "practice": "Rozlišit obvod s pamětí a bez paměti na praktickém příkladu.",
      "hours": 3,
      "slug": "10",
      "svpUnits": [
        4
      ],
      "svpOutcomes": [
        12,
        13
      ],
      "status": "outline"
    },
    {
      "number": 11,
      "id": "TÉMA 11",
      "group": "D",
      "title": "Mikroprocesory a mikrořadiče",
      "description": "Typy, vývoj, vlastnosti a použití v řídicích systémech.",
      "practice": "Porovnat dva mikrořadiče a navrhnout jejich použití.",
      "hours": 3,
      "slug": "11",
      "svpUnits": [
        4,
        5
      ],
      "svpOutcomes": [
        14,
        15,
        16
      ],
      "status": "outline"
    },
    {
      "number": 12,
      "id": "TÉMA 12",
      "group": "D",
      "title": "Jak funguje mikropočítač",
      "description": "Procesor, paměti, registry, sběrnice a základní architektura.",
      "practice": "Poskládat základní blokové schéma mikropočítače.",
      "hours": 3,
      "slug": "12",
      "svpUnits": [
        4,
        6
      ],
      "svpOutcomes": [
        14,
        17,
        18
      ],
      "status": "outline"
    },
    {
      "number": 13,
      "id": "TÉMA 13",
      "group": "D",
      "title": "Hodiny, vstupy a výstupy",
      "description": "Synchronizace, registry a vstupně-výstupní obvody mikrořadiče.",
      "practice": "Přivést signál na vstup a ovládat výstup.",
      "hours": 3,
      "slug": "13",
      "svpUnits": [
        6
      ],
      "svpOutcomes": [
        18,
        19,
        20
      ],
      "status": "outline"
    },
    {
      "number": 14,
      "id": "TÉMA 14",
      "group": "D",
      "title": "Algoritmy a vývojová prostředí",
      "description": "Od technického zadání k algoritmu, symbolické adresy a programovací prostředí.",
      "practice": "Zapsat algoritmus a orientovat se ve vývojovém prostředí.",
      "hours": 3,
      "slug": "14",
      "svpUnits": [
        7
      ],
      "svpOutcomes": [
        21,
        23,
        24,
        25
      ],
      "status": "outline"
    },
    {
      "number": 15,
      "id": "TÉMA 15",
      "group": "D",
      "title": "Programujeme první zařízení",
      "description": "Jednoduché programování mikrořadiče, například Arduino.",
      "practice": "Naprogramovat tlačítko, podmínku a výstup.",
      "hours": 3,
      "slug": "15",
      "svpUnits": [
        7
      ],
      "svpOutcomes": [
        21,
        23,
        25,
        26
      ],
      "status": "outline"
    },
    {
      "number": 16,
      "id": "TÉMA 16",
      "group": "D",
      "title": "Časování programu",
      "description": "Zpožďovací smyčky, časovače, generování impulsů a časové cykly.",
      "practice": "Porovnat blokující čekání s časovačem a změřit čas.",
      "hours": 3,
      "slug": "16",
      "svpUnits": [
        7,
        10
      ],
      "svpOutcomes": [
        28,
        32,
        33,
        34,
        35,
        36
      ],
      "status": "outline"
    },
    {
      "number": 17,
      "id": "TÉMA 17",
      "group": "D",
      "title": "PLC a žebříčkové diagramy",
      "description": "Základy programování PLC pomocí kontaktů a cívek.",
      "practice": "Zrealizovat START/STOP v žebříčkovém diagramu.",
      "hours": 3,
      "slug": "17",
      "svpUnits": [
        7
      ],
      "svpOutcomes": [
        24,
        25,
        26
      ],
      "status": "outline"
    },
    {
      "number": 18,
      "id": "TÉMA 18",
      "group": "D",
      "title": "Programování funkčních bloků",
      "description": "Grafické programování FBD a sestavování řídicí logiky.",
      "practice": "Sestavit jednoduché řízení pomocí bloků.",
      "hours": 3,
      "slug": "18",
      "svpUnits": [
        7
      ],
      "svpOutcomes": [
        24,
        25,
        26
      ],
      "status": "outline"
    },
    {
      "number": 19,
      "id": "TÉMA 19",
      "group": "D",
      "title": "Řízení postupných činností",
      "description": "Stavové automaty a programování jednoduchých technologických procesů.",
      "practice": "Naplánovat a naprogramovat posloupnost několika kroků.",
      "hours": 3,
      "slug": "19",
      "svpUnits": [
        7
      ],
      "svpOutcomes": [
        23,
        26,
        29
      ],
      "status": "outline"
    },
    {
      "number": 20,
      "id": "TÉMA 20",
      "group": "D",
      "title": "Komunikace a periferie",
      "description": "Sériová komunikace, stykové a podpůrné obvody.",
      "practice": "Odeslat data mezi zařízeními a zobrazit přijatou hodnotu.",
      "hours": 3,
      "slug": "20",
      "svpUnits": [
        6,
        7,
        8
      ],
      "svpOutcomes": [
        20,
        21,
        22,
        30
      ],
      "status": "outline"
    },
    {
      "number": 21,
      "id": "TÉMA 21",
      "group": "D",
      "title": "Přerušení a reakce na události",
      "description": "Externí a interní přerušení, rozdíl oproti průběžnému dotazování.",
      "practice": "Ukázat rozdíl mezi dotazováním a reakcí na přerušení.",
      "hours": 3,
      "slug": "21",
      "svpUnits": [
        7,
        9
      ],
      "svpOutcomes": [
        27,
        31
      ],
      "status": "outline"
    },
    {
      "number": 22,
      "id": "TÉMA 22",
      "group": "D",
      "title": "Obsluha přerušení",
      "description": "Obslužné rutiny, řadiče přerušení a praktické programování.",
      "practice": "Naprogramovat jednoduchou a krátkou obsluhu přerušení.",
      "hours": 3,
      "slug": "22",
      "svpUnits": [
        7,
        9
      ],
      "svpOutcomes": [
        27,
        31
      ],
      "status": "outline"
    },
    {
      "number": 23,
      "id": "TÉMA 23",
      "group": "D",
      "title": "Vlastní řídicí projekt",
      "description": "Návrh, programování, ladění, testování a bezpečnost zařízení.",
      "practice": "Propojit vstup, rozhodování a výstup do otestovaného mini-projektu.",
      "hours": 3,
      "slug": "23",
      "svpUnits": [
        7,
        8
      ],
      "svpOutcomes": [
        26,
        28,
        29,
        30
      ],
      "status": "outline"
    },
    {
      "number": 24,
      "id": "TÉMA 24",
      "group": "E",
      "title": "Proč potřebujeme zpětnou vazbu?",
      "description": "Jak systém pozná rozdíl mezi požadovaným a skutečným stavem.",
      "practice": "Porovnat jednoduché ovládání a regulaci konkrétní veličiny.",
      "hours": 3,
      "slug": "24",
      "svpUnits": [
        11,
        13
      ],
      "svpOutcomes": [
        37,
        38,
        40
      ],
      "status": "outline"
    },
    {
      "number": 25,
      "id": "TÉMA 25",
      "group": "E",
      "title": "Regulační smyčka a její schéma",
      "description": "Regulátor, snímač, akční člen, regulovaná soustava a regulační veličiny.",
      "practice": "Nakreslit regulační smyčku a pojmenovat její veličiny.",
      "hours": 3,
      "slug": "25",
      "svpUnits": [
        13
      ],
      "svpOutcomes": [
        40,
        41
      ],
      "status": "outline"
    },
    {
      "number": 26,
      "id": "TÉMA 26",
      "group": "E",
      "title": "Přenosy a bloková algebra",
      "description": "Co vyjadřuje přenos a jak se propojují funkční bloky.",
      "practice": "Složit dvě funkční části a odvodit jejich jednoduchý přenos.",
      "hours": 3,
      "slug": "26",
      "svpUnits": [
        13
      ],
      "svpOutcomes": [
        41
      ],
      "status": "outline"
    },
    {
      "number": 27,
      "id": "TÉMA 27",
      "group": "E",
      "title": "Jak se chová regulovaná soustava",
      "description": "Vlastnosti soustav, statické a astatické chování.",
      "practice": "Pozorovat a popsat odezvu různých soustav.",
      "hours": 3,
      "slug": "27",
      "svpUnits": [
        13
      ],
      "svpOutcomes": [
        40,
        42
      ],
      "status": "outline"
    },
    {
      "number": 28,
      "id": "TÉMA 28",
      "group": "E",
      "title": "Přechodové a frekvenční charakteristiky",
      "description": "Jak systémy reagují na změny; grafy, příklady a základní řešení přechodných dějů.",
      "practice": "Číst a porovnávat charakteristiky; řešit příklad přechodného děje.",
      "hours": 3,
      "slug": "28",
      "svpUnits": [
        13
      ],
      "svpOutcomes": [
        42,
        43
      ],
      "status": "outline"
    },
    {
      "number": 29,
      "id": "TÉMA 29",
      "group": "E",
      "title": "Regulátory P, I, D a PID",
      "description": "Jak regulátory pracují a jak ovlivňují chování systému.",
      "practice": "Na modelu srovnat základní typy regulátorů.",
      "hours": 3,
      "slug": "29",
      "svpUnits": [
        13
      ],
      "svpOutcomes": [
        40,
        43
      ],
      "status": "outline"
    },
    {
      "number": 30,
      "id": "TÉMA 30",
      "group": "E",
      "title": "Stabilita a kvalita regulace",
      "description": "Překmit, rychlost odezvy, ustálení a stabilita.",
      "practice": "Rozpoznat stabilní a nestabilní průběh a určit kvalitu regulace.",
      "hours": 3,
      "slug": "30",
      "svpUnits": [
        13
      ],
      "svpOutcomes": [
        42,
        43
      ],
      "status": "outline"
    },
    {
      "number": 31,
      "id": "TÉMA 31",
      "group": "E",
      "title": "Spojitá a číslicová regulace",
      "description": "Rozdíly mezi analogovým a číslicovým řízením, spojitým a diskrétním časem.",
      "practice": "Porovnat analogový a číslicový způsob regulace.",
      "hours": 3,
      "slug": "31",
      "svpUnits": [
        11,
        14
      ],
      "svpOutcomes": [
        37,
        38,
        44,
        45,
        46,
        47
      ],
      "status": "outline"
    },
    {
      "number": 32,
      "id": "TÉMA 32",
      "group": "E",
      "title": "Vzorkování a číslicový regulátor",
      "description": "Kvantování, vzorkování a jednoduchý programově řízený regulační systém.",
      "practice": "Ukázat vzorkování signálu a základ digitální regulace.",
      "hours": 3,
      "slug": "32",
      "svpUnits": [
        11,
        14
      ],
      "svpOutcomes": [
        37,
        38,
        44,
        45,
        46,
        47
      ],
      "status": "outline"
    }
  ]
};
