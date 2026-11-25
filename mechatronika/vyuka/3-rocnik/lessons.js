/* Studentský přehled: 5 celků, 32 × 3 vyučovací hodiny. Odborné mapování je pouze interní v dokumentaci. */
window.MER3_COURSE={
  "version": "2026-11-25-svp-32-simple",
  "hours": 96,
  "groups": [
    {
      "id": "A",
      "title": "Automatizace a technické základy",
      "subtitle": "Od jednoduchého ovládání ke snímačům a schématům",
      "color": "cyan"
    },
    {
      "id": "B",
      "title": "Číslicová technika a mikropočítače",
      "subtitle": "Jak počítač zpracovává informace a řídí zařízení",
      "color": "blue"
    },
    {
      "id": "C",
      "title": "Programování řídicích systémů",
      "subtitle": "Arduino, PLC, komunikace a ladění programů",
      "color": "purple"
    },
    {
      "id": "D",
      "title": "Akční členy a praktické řízení",
      "subtitle": "Motory, spínače a pohony ve skutečných strojích",
      "color": "amber"
    },
    {
      "id": "E",
      "title": "Regulace a číslicové řízení",
      "subtitle": "Zpětná vazba, regulátory a stabilita",
      "color": "green"
    }
  ],
  "lessons": [
    {
      "number": 1,
      "id": "TÉMA 01",
      "group": "A",
      "title": "Co je automatizace?",
      "description": "Proč automatizujeme, co znamená ovládání a regulace a kdy má automatizace smysl.",
      "practice": "Pozorování jednoduchého řízení světla, časovače a termostatu.",
      "hours": 3,
      "slug": "01",
      "svpUnits": [
        1
      ],
      "svpOutcomes": [
        1,
        2,
        3,
        4
      ],
      "status": "outline"
    },
    {
      "number": 2,
      "id": "TÉMA 02",
      "group": "A",
      "title": "Elektrické, pneumatické a hydraulické systémy",
      "description": "Prostředky automatizace, používaná média a základní schematické značky.",
      "practice": "Přiřazování prvků a značek k jednoduchému technickému schématu.",
      "hours": 3,
      "slug": "02",
      "svpUnits": [
        2
      ],
      "svpOutcomes": [
        5
      ],
      "status": "outline"
    },
    {
      "number": 3,
      "id": "TÉMA 03",
      "group": "A",
      "title": "Snímače a měření veličin",
      "description": "Jak měříme teplotu, tlak, polohu, otáčky a další fyzikální veličiny.",
      "practice": "Volba snímače pro konkrétní zařízení a jednoduché měření.",
      "hours": 3,
      "slug": "03",
      "svpUnits": [
        2
      ],
      "svpOutcomes": [
        6
      ],
      "status": "outline"
    },
    {
      "number": 4,
      "id": "TÉMA 04",
      "group": "A",
      "title": "Signály, zesilovače a napájení",
      "description": "Cesta informace ze snímače do řídicí jednotky a zdroje energie pro systém.",
      "practice": "Nákres signálové cesty a ukázka zesílení slabého signálu.",
      "hours": 3,
      "slug": "04",
      "svpUnits": [
        2
      ],
      "svpOutcomes": [
        7
      ],
      "status": "outline"
    },
    {
      "number": 5,
      "id": "TÉMA 05",
      "group": "A",
      "title": "Kontaktní a logická schémata",
      "description": "Kontakty, cívky, integrovaná logika a schémata ovládacích obvodů.",
      "practice": "Čtení a kreslení jednoduchého START/STOP zapojení.",
      "hours": 3,
      "slug": "05",
      "svpUnits": [
        3
      ],
      "svpOutcomes": [
        8,
        9,
        10
      ],
      "status": "outline"
    },
    {
      "number": 6,
      "id": "TÉMA 06",
      "group": "B",
      "title": "Dvojková soustava a logické úrovně",
      "description": "Bity, nuly a jedničky, dvojková soustava a zobrazení informace v počítači.",
      "practice": "Převody malých binárních čísel a práce s logickými úrovněmi.",
      "hours": 3,
      "slug": "06",
      "svpUnits": [
        4
      ],
      "svpOutcomes": [
        11
      ],
      "status": "outline"
    },
    {
      "number": 7,
      "id": "TÉMA 07",
      "group": "B",
      "title": "Booleova algebra a logická hradla",
      "description": "Operace AND, OR, NOT, další hradla a pravdivostní tabulky.",
      "practice": "Vyzkoušení logických funkcí v jednoduchém interaktivním obvodu.",
      "hours": 3,
      "slug": "07",
      "svpUnits": [
        4
      ],
      "svpOutcomes": [
        11,
        12
      ],
      "status": "outline"
    },
    {
      "number": 8,
      "id": "TÉMA 08",
      "group": "B",
      "title": "Kombinační logické obvody",
      "description": "Obvody, jejichž výstup závisí na aktuálních vstupech; sčítačka a dekodér.",
      "practice": "Návrh jednoduché logické podmínky ze senzorů.",
      "hours": 3,
      "slug": "08",
      "svpUnits": [
        4
      ],
      "svpOutcomes": [
        12
      ],
      "status": "outline"
    },
    {
      "number": 9,
      "id": "TÉMA 09",
      "group": "B",
      "title": "Sekvenční logické obvody",
      "description": "Obvody, které si pamatují stav; zpětná vazba, RS a hodinový signál.",
      "practice": "Pokus s jednoduchým paměťovým obvodem.",
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
      "group": "B",
      "title": "Paměti, registry a čítače",
      "description": "Uložení informací v RAM/ROM, registr jako skupina bitů a počítání impulsů.",
      "practice": "Ukázka ukládání hodnoty a jednoduchého čítače.",
      "hours": 3,
      "slug": "10",
      "svpUnits": [
        4,
        6
      ],
      "svpOutcomes": [
        13,
        18
      ],
      "status": "outline"
    },
    {
      "number": 11,
      "id": "TÉMA 11",
      "group": "B",
      "title": "Mikroprocesory a mikrořadiče",
      "description": "Vývoj a typy procesorových systémů, základní rozdíly a použití.",
      "practice": "Výběr vhodného mikrořadiče pro konkrétní úkol.",
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
      "group": "B",
      "title": "Architektura mikropočítače",
      "description": "Procesor, paměť, sběrnice, programovatelné pole a podpůrné obvody.",
      "practice": "Sestavení blokového schématu jednoduchého mikropočítače.",
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
      "group": "B",
      "title": "Hodiny, vstupy a výstupy",
      "description": "Synchronizace, registry a vstupně-výstupní obvody mikrořadiče.",
      "practice": "Čtení signálu na vstupu a jeho převod na výstup.",
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
      "group": "C",
      "title": "Algoritmy a vývojová prostředí",
      "description": "Postup programování, jednoduché algoritmy a symbolické adresy.",
      "practice": "Zápis algoritmu pro zařízení a první programový projekt.",
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
      "group": "C",
      "title": "Programování mikrořadiče",
      "description": "Řízení digitálních vstupů a výstupů například na Arduinu.",
      "practice": "Tlačítko, LED, podmínka a základní program.",
      "hours": 3,
      "slug": "15",
      "svpUnits": [
        7
      ],
      "svpOutcomes": [
        21,
        24,
        25,
        26
      ],
      "status": "outline"
    },
    {
      "number": 16,
      "id": "TÉMA 16",
      "group": "C",
      "title": "PLC a žebříčkové diagramy",
      "description": "Jak se programuje řídicí systém pomocí kontaktů a cívek.",
      "practice": "Program START/STOP v žebříčkovém diagramu.",
      "hours": 3,
      "slug": "16",
      "svpUnits": [
        7
      ],
      "svpOutcomes": [
        23,
        25,
        26
      ],
      "status": "outline"
    },
    {
      "number": 17,
      "id": "TÉMA 17",
      "group": "C",
      "title": "Programování funkčních bloků",
      "description": "Grafické programování řídicích systémů a propojení funkčních bloků.",
      "practice": "Řízení jednoduchého procesu pomocí FBD.",
      "hours": 3,
      "slug": "17",
      "svpUnits": [
        7
      ],
      "svpOutcomes": [
        25,
        26
      ],
      "status": "outline"
    },
    {
      "number": 18,
      "id": "TÉMA 18",
      "group": "C",
      "title": "Stavové řízení zařízení",
      "description": "Postupné kroky automatického zařízení a práce se stavy.",
      "practice": "Návrh jednoduché sekvence START → PRÁCE → STOP.",
      "hours": 3,
      "slug": "18",
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
      "number": 19,
      "id": "TÉMA 19",
      "group": "C",
      "title": "Sériová komunikace a periferie",
      "description": "Jak si zařízení předávají informace a jak fungují stykové obvody.",
      "practice": "Odeslání a přijetí hodnoty po sériové lince.",
      "hours": 3,
      "slug": "19",
      "svpUnits": [
        6,
        7,
        8
      ],
      "svpOutcomes": [
        20,
        22,
        30
      ],
      "status": "outline"
    },
    {
      "number": 20,
      "id": "TÉMA 20",
      "group": "C",
      "title": "Přerušení a časování programu",
      "description": "Interní a externí přerušení, časovače, zpožďovací smyčky a jejich obsluha.",
      "practice": "Reakce programu na impuls a porovnání časovače se zpožděním.",
      "hours": 3,
      "slug": "20",
      "svpUnits": [
        7,
        9,
        10,
        11
      ],
      "svpOutcomes": [
        27,
        28,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38
      ],
      "status": "outline"
    },
    {
      "number": 21,
      "id": "TÉMA 21",
      "group": "C",
      "title": "Ladění, testování a bezpečnost",
      "description": "Jak najít chybu, ověřit spolehlivost a bezpečně navrhnout program.",
      "practice": "Odhalení chyby, testovací protokol a návrh bezpečného chování.",
      "hours": 3,
      "slug": "21",
      "svpUnits": [
        7
      ],
      "svpOutcomes": [
        26,
        28,
        29
      ],
      "status": "outline"
    },
    {
      "number": 22,
      "id": "TÉMA 22",
      "group": "D",
      "title": "Relé, spínací prvky a elektromotory",
      "description": "Způsoby elektrického spínání a řízení pohybů.",
      "practice": "Bezpečné nízkonapěťové zapojení motoru nebo relé.",
      "hours": 3,
      "slug": "22",
      "svpUnits": [
        12
      ],
      "svpOutcomes": [
        39
      ],
      "status": "outline"
    },
    {
      "number": 23,
      "id": "TÉMA 23",
      "group": "D",
      "title": "Pneumatické a hydraulické pohony",
      "description": "Válce, rozváděče a pohony využívající stlačený vzduch nebo kapalinu.",
      "practice": "Přečtení jednoduchého pneumatického či hydraulického obvodu.",
      "hours": 3,
      "slug": "23",
      "svpUnits": [
        12
      ],
      "svpOutcomes": [
        39
      ],
      "status": "outline"
    },
    {
      "number": 24,
      "id": "TÉMA 24",
      "group": "D",
      "title": "Praktický projekt řízení zařízení",
      "description": "Propojení snímače, programu a akčního členu do funkčního systému.",
      "practice": "Malý projekt se schématem, programem a ověřením funkce.",
      "hours": 3,
      "slug": "24",
      "svpUnits": [
        7,
        12
      ],
      "svpOutcomes": [
        26,
        29,
        39
      ],
      "status": "outline"
    },
    {
      "number": 25,
      "id": "TÉMA 25",
      "group": "E",
      "title": "Regulace a zpětná vazba",
      "description": "Regulační smyčka, snímač, požadovaná hodnota a regulační odchylka.",
      "practice": "Porovnání ovládání a regulace na jednoduchém modelu.",
      "hours": 3,
      "slug": "25",
      "svpUnits": [
        11,
        13
      ],
      "svpOutcomes": [
        37,
        38,
        40,
        41
      ],
      "status": "outline"
    },
    {
      "number": 26,
      "id": "TÉMA 26",
      "group": "E",
      "title": "Bloková schémata regulačních obvodů",
      "description": "Regulátor, regulovaná soustava a veličiny ve schématu.",
      "practice": "Nakreslení jednoduché regulační smyčky a správné označení bloků.",
      "hours": 3,
      "slug": "26",
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
      "number": 27,
      "id": "TÉMA 27",
      "group": "E",
      "title": "Přenosy a skládání bloků",
      "description": "Co vyjadřuje přenos a jak se propojují jednotlivé části obvodu.",
      "practice": "Sériové, paralelní a zpětnovazební spojení jednoduchých bloků.",
      "hours": 3,
      "slug": "27",
      "svpUnits": [
        13
      ],
      "svpOutcomes": [
        41
      ],
      "status": "outline"
    },
    {
      "number": 28,
      "id": "TÉMA 28",
      "group": "E",
      "title": "Přechodové a frekvenční charakteristiky",
      "description": "Jak zařízení reaguje na změnu vstupu nebo na různé frekvence.",
      "practice": "Čtení grafů odezvy a jednoduchý příklad přechodného děje.",
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
      "title": "Regulátory P, I, D, PI a PID",
      "description": "Jak se regulátor rozhoduje a proč mají jeho jednotlivé složky různé účinky.",
      "practice": "Porovnání základních regulátorů na názorném modelu.",
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
      "title": "Regulované soustavy a stabilita",
      "description": "Statické a astatické soustavy, přeregulování a kvalita regulace.",
      "practice": "Pozorování stabilního a nestabilního chování soustavy.",
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
      "title": "Analogová a číslicová regulace",
      "description": "Spojitý a diskrétní čas, analogové a číslicové hodnoty, jejich výhody a omezení.",
      "practice": "Porovnání dvou způsobů regulace stejné úlohy.",
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
      "title": "Vzorkování, kvantování a číslicový regulátor",
      "description": "Jak převádíme měřené signály na čísla a používáme je v programu regulátoru.",
      "practice": "Simulace vzorkování a jednoduché řízení digitálním regulátorem.",
      "hours": 3,
      "slug": "32",
      "svpUnits": [
        14
      ],
      "svpOutcomes": [
        44,
        45,
        46,
        47
      ],
      "status": "outline"
    }
  ]
};
