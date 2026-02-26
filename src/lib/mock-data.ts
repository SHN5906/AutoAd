// Vehicle database with year ranges and phases
export interface ModelInfo {
  name: string;
  yearStart: number;
  yearEnd: number;
  isElectric?: boolean;
  phases?: string[];
}

// Compact helper: [name, yearStart, yearEnd, isElectric?, phases?]
type M = [string, number, number, boolean?, string[]?];
const m = (d: M): ModelInfo => ({ name: d[0], yearStart: d[1], yearEnd: d[2], ...(d[3] ? { isElectric: true } : {}), ...(d[4] ? { phases: d[4] } : {}) });

export const VEHICLE_DB: Record<string, ModelInfo[]> = Object.fromEntries(
  Object.entries({
    "Alfa Romeo": [
      ["Giulia", 2016, 2026], ["Stelvio", 2017, 2026], ["Tonale", 2022, 2026],
      ["Giulietta", 2010, 2020, false, ["Phase 1 (2010-2013)", "Phase 2 (2014-2020)"]], ["MiTo", 2008, 2018],
      ["4C", 2013, 2020], ["159", 2005, 2011], ["Brera", 2006, 2010],
    ],
    "Audi": [
      ["A1", 2010, 2026, false, ["I (2010-2018)", "II (2019-2026)"]], ["A3", 2003, 2026, false, ["8P (2003-2012)", "8V (2013-2020)", "8Y (2021-2026)"]],
      ["A4", 2004, 2026, false, ["B7 (2004-2008)", "B8 (2008-2015)", "B9 (2016-2026)"]], ["A4 Avant", 2004, 2026],
      ["A5", 2007, 2026, false, ["I (2007-2016)", "II (2017-2026)"]], ["A5 Sportback", 2010, 2026],
      ["A6", 2004, 2026, false, ["C6 (2004-2011)", "C7 (2012-2018)", "C8 (2019-2026)"]], ["A6 Avant", 2005, 2026],
      ["A7 Sportback", 2011, 2026], ["A8", 2003, 2026], ["Q2", 2016, 2026], ["Q3", 2012, 2026, false, ["I (2012-2018)", "II (2019-2026)"]],
      ["Q5", 2009, 2026, false, ["I (2009-2016)", "II (2017-2026)"]], ["Q7", 2006, 2026, false, ["I (2006-2015)", "II (2016-2026)"]],
      ["Q8", 2019, 2026], ["TT", 2006, 2023, false, ["II (2006-2014)", "III (2015-2023)"]], ["R8", 2007, 2024],
      ["RS3", 2011, 2026], ["RS4 Avant", 2012, 2026], ["RS5", 2010, 2026], ["RS6 Avant", 2013, 2026], ["RS7", 2014, 2026],
      ["S3", 2007, 2026], ["S4", 2009, 2026], ["S5", 2008, 2026],
      ["Q4 e-tron", 2022, 2026, true], ["Q4 Sportback e-tron", 2022, 2026, true], ["Q8 e-tron", 2023, 2026, true],
      ["e-tron GT", 2022, 2026, true], ["RS e-tron GT", 2022, 2026, true],
    ],
    "BMW": [
      ["Série 1", 2004, 2026, false, ["E87 (2004-2011)", "F20 (2012-2019)", "F40 (2020-2026)"]],
      ["Série 2 Coupé", 2014, 2026], ["Série 2 Gran Coupé", 2020, 2026], ["Série 2 Active Tourer", 2015, 2026],
      ["Série 3", 2005, 2026, false, ["E90 (2005-2011)", "F30 (2012-2018)", "G20 (2019-2026)"]],
      ["Série 3 Touring", 2005, 2026], ["Série 4 Coupé", 2014, 2026], ["Série 4 Gran Coupé", 2015, 2026],
      ["Série 5", 2004, 2026, false, ["E60 (2004-2010)", "F10 (2010-2016)", "G30 (2017-2023)", "G60 (2024-2026)"]],
      ["Série 5 Touring", 2004, 2026], ["Série 7", 2002, 2026], ["Série 8", 2019, 2026],
      ["X1", 2010, 2026, false, ["E84 (2010-2015)", "F48 (2016-2022)", "U11 (2023-2026)"]], ["X2", 2018, 2026],
      ["X3", 2004, 2026, false, ["E83 (2004-2010)", "F25 (2011-2017)", "G01 (2018-2024)", "G45 (2025-2026)"]],
      ["X4", 2014, 2026], ["X5", 2007, 2026, false, ["E70 (2007-2013)", "F15 (2014-2018)", "G05 (2019-2026)"]],
      ["X6", 2008, 2026], ["X7", 2019, 2026], ["Z4", 2009, 2026], ["M2", 2016, 2026], ["M3", 2007, 2026],
      ["M4", 2014, 2026], ["M5", 2005, 2026],
      ["i3", 2014, 2022, true], ["i4", 2022, 2026, true], ["i5", 2024, 2026, true], ["i7", 2023, 2026, true],
      ["iX", 2022, 2026, true], ["iX1", 2023, 2026, true], ["iX3", 2021, 2023, true],
    ],
    "Citroën": [
      ["C1", 2005, 2021, false, ["I (2005-2014)", "II (2014-2021)"]], ["C3", 2002, 2026, false, ["I (2002-2009)", "II (2010-2016)", "III (2017-2026)"]],
      ["C3 Aircross", 2018, 2026], ["C4", 2011, 2026, false, ["I (2011-2017)", "II (2021-2026)"]],
      ["C4 X", 2023, 2026], ["C5 Aircross", 2019, 2026], ["C5 X", 2022, 2026], ["Berlingo", 2008, 2026],
      ["ë-C3", 2024, 2026, true], ["ë-C4", 2021, 2026, true], ["ë-Berlingo", 2021, 2026, true], ["Ami", 2020, 2026, true],
    ],
    "Cupra": [
      ["Born", 2022, 2026, true], ["Formentor", 2021, 2026], ["Leon", 2021, 2026], ["Ateca", 2021, 2026],
      ["Tavascan", 2024, 2026, true], ["Terramar", 2025, 2026],
    ],
    "Dacia": [
      ["Sandero", 2008, 2026, false, ["I (2008-2012)", "II (2013-2020)", "III (2021-2026)"]], ["Sandero Stepway", 2010, 2026],
      ["Duster", 2010, 2026, false, ["I (2010-2017)", "II (2018-2023)", "III (2024-2026)"]], ["Jogger", 2022, 2026],
      ["Logan", 2005, 2026], ["Spring", 2021, 2026, true],
    ],
    "DS": [
      ["DS 3 Crossback", 2019, 2026], ["DS 3 E-Tense", 2019, 2026, true], ["DS 4", 2021, 2026],
      ["DS 7", 2018, 2026, false, ["Phase 1 (2018-2022)", "Phase 2 (2023-2026)"]], ["DS 9", 2021, 2026],
    ],
    "Fiat": [
      ["500", 2007, 2026, false, ["Phase 1 (2007-2015)", "Phase 2 (2016-2026)"]], ["500X", 2015, 2026], ["500L", 2013, 2024],
      ["Panda", 2003, 2026, false, ["II (2003-2011)", "III (2012-2026)"]], ["Tipo", 2016, 2026],
      ["500e", 2021, 2026, true], ["600e", 2024, 2026, true],
    ],
    "Ford": [
      ["Fiesta", 2008, 2023, false, ["VI (2008-2017)", "VII (2018-2023)"]], ["Focus", 2005, 2025, false, ["II (2005-2010)", "III (2011-2018)", "IV (2019-2025)"]],
      ["Puma", 2020, 2026], ["Kuga", 2013, 2026, false, ["I (2013-2019)", "II (2020-2026)"]],
      ["Explorer", 2020, 2026], ["Mustang", 2015, 2026], ["Ranger", 2012, 2026],
      ["Mustang Mach-E", 2021, 2026, true],
    ],
    "Honda": [
      ["Jazz", 2008, 2026], ["Civic", 2006, 2026, false, ["VIII (2006-2011)", "IX (2012-2016)", "X (2017-2021)", "XI (2022-2026)"]],
      ["Civic Type R", 2007, 2026], ["HR-V", 2015, 2026], ["CR-V", 2007, 2026], ["ZR-V", 2023, 2026],
      ["e:Ny1", 2024, 2026, true], ["Honda e", 2020, 2024, true],
    ],
    "Hyundai": [
      ["i10", 2008, 2026, false, ["I (2008-2013)", "II (2014-2019)", "III (2020-2026)"]], ["i20", 2009, 2026, false, ["I (2009-2014)", "II (2015-2020)", "III (2021-2026)"]],
      ["i30", 2007, 2026, false, ["I (2007-2011)", "II (2012-2016)", "III (2017-2026)"]], ["Bayon", 2021, 2026],
      ["Kona", 2018, 2026], ["Tucson", 2005, 2026, false, ["I (2005-2009)", "II (2010-2015)", "III (2016-2020)", "IV (2021-2026)"]],
      ["Santa Fe", 2006, 2026], ["Ioniq 5", 2022, 2026, true], ["Ioniq 6", 2023, 2026, true], ["Kona Electric", 2019, 2026, true],
    ],
    "Jaguar": [
      ["E-Pace", 2018, 2026], ["F-Pace", 2016, 2026], ["F-Type", 2014, 2024], ["XE", 2015, 2023], ["XF", 2008, 2024],
      ["I-Pace", 2019, 2026, true],
    ],
    "Jeep": [
      ["Renegade", 2015, 2026], ["Compass", 2017, 2026], ["Grand Cherokee", 2011, 2026], ["Wrangler", 2007, 2026],
      ["Avenger", 2023, 2026, true],
    ],
    "Kia": [
      ["Picanto", 2004, 2026], ["Rio", 2005, 2026], ["Ceed", 2007, 2026, false, ["I (2007-2012)", "II (2013-2018)", "III (2019-2026)"]],
      ["XCeed", 2020, 2026], ["Sportage", 2005, 2026, false, ["III (2011-2015)", "IV (2016-2021)", "V (2022-2026)"]],
      ["Sorento", 2009, 2026], ["Niro", 2017, 2026], ["Stonic", 2018, 2026], ["Stinger", 2018, 2024],
      ["EV6", 2022, 2026, true], ["EV9", 2024, 2026, true], ["Niro EV", 2019, 2026, true],
    ],
    "Land Rover": [
      ["Defender 90", 2020, 2026], ["Defender 110", 2020, 2026], ["Discovery", 2004, 2026], ["Discovery Sport", 2015, 2026],
      ["Range Rover", 2003, 2026, false, ["III (2003-2012)", "IV (2013-2021)", "V (2022-2026)"]],
      ["Range Rover Sport", 2005, 2026, false, ["I (2005-2013)", "II (2014-2022)", "III (2023-2026)"]],
      ["Range Rover Velar", 2017, 2026], ["Range Rover Evoque", 2012, 2026, false, ["I (2012-2019)", "II (2020-2026)"]],
    ],
    "Lexus": [
      ["IS", 2006, 2026], ["ES", 2019, 2026], ["NX", 2015, 2026], ["RX", 2004, 2026], ["UX", 2019, 2026], ["LC", 2017, 2026],
      ["LBX", 2024, 2026], ["RZ", 2023, 2026, true],
    ],
    "Mazda": [
      ["Mazda2", 2008, 2026], ["Mazda3", 2004, 2026, false, ["I (2004-2009)", "II (2009-2013)", "III (2014-2018)", "IV (2019-2026)"]],
      ["Mazda6", 2003, 2023], ["CX-3", 2015, 2026], ["CX-30", 2020, 2026], ["CX-5", 2012, 2026, false, ["I (2012-2016)", "II (2017-2026)"]],
      ["CX-60", 2023, 2026], ["MX-5", 2006, 2026, false, ["NC (2006-2015)", "ND (2016-2026)"]], ["MX-30", 2021, 2026, true],
    ],
    "Mercedes-Benz": [
      ["Classe A", 2005, 2026, false, ["W169 (2005-2012)", "W176 (2013-2018)", "W177 (2019-2026)"]],
      ["CLA", 2014, 2026, false, ["C117 (2014-2019)", "C118 (2020-2026)"]], ["Classe B", 2005, 2026],
      ["Classe C", 2007, 2026, false, ["W204 (2007-2013)", "W205 (2014-2021)", "W206 (2022-2026)"]],
      ["Classe C Break", 2007, 2026], ["Classe E", 2003, 2026, false, ["W211 (2003-2009)", "W212 (2010-2016)", "W213 (2017-2023)", "W214 (2024-2026)"]],
      ["Classe E Break", 2004, 2026], ["CLS", 2005, 2026], ["Classe S", 2006, 2026], ["Classe G", 2000, 2026],
      ["GLA", 2014, 2026], ["GLB", 2020, 2026], ["GLC", 2016, 2026], ["GLC Coupé", 2017, 2026],
      ["GLE", 2016, 2026], ["GLE Coupé", 2016, 2026], ["GLS", 2017, 2026],
      ["AMG GT", 2015, 2026], ["AMG A 35", 2019, 2026], ["AMG A 45", 2014, 2026], ["AMG C 43", 2016, 2026], ["AMG C 63", 2008, 2026],
      ["Classe V", 2015, 2026], ["Vito", 2004, 2026],
      ["EQA", 2021, 2026, true], ["EQB", 2022, 2026, true], ["EQC", 2020, 2024, true], ["EQE", 2023, 2026, true],
      ["EQS", 2022, 2026, true], ["EQS SUV", 2023, 2026, true],
    ],
    "Mini": [
      ["Mini 3 portes", 2007, 2026, false, ["R56 (2007-2013)", "F56 (2014-2026)"]], ["Mini 5 portes", 2014, 2026],
      ["Mini Cabrio", 2009, 2026], ["Mini Clubman", 2008, 2024], ["Mini Countryman", 2011, 2026, false, ["R60 (2011-2016)", "F60 (2017-2023)", "U25 (2024-2026)"]],
      ["Mini Electric", 2020, 2026, true], ["Mini Aceman", 2024, 2026, true],
    ],
    "Nissan": [
      ["Micra", 2003, 2024, false, ["K12 (2003-2010)", "K13 (2011-2016)", "K14 (2017-2024)"]], ["Juke", 2011, 2026, false, ["I (2011-2019)", "II (2020-2026)"]],
      ["Qashqai", 2007, 2026, false, ["J10 (2007-2013)", "J11 (2014-2021)", "J12 (2022-2026)"]], ["X-Trail", 2008, 2026],
      ["Navara", 2006, 2026], ["GT-R", 2009, 2024],
      ["Leaf", 2011, 2026, true, ["I (2011-2017)", "II (2018-2026)"]], ["Ariya", 2023, 2026, true],
    ],
    "Opel": [
      ["Corsa", 2007, 2026, false, ["D (2007-2014)", "E (2015-2019)", "F (2020-2026)"]], ["Astra", 2004, 2026, false, ["H (2004-2009)", "J (2010-2015)", "K (2016-2021)", "L (2022-2026)"]],
      ["Mokka", 2013, 2026, false, ["I (2013-2019)", "II (2021-2026)"]], ["Crossland", 2017, 2026], ["Grandland", 2018, 2026], ["Insignia", 2009, 2022],
      ["Corsa-e", 2020, 2026, true], ["Mokka-e", 2021, 2026, true],
    ],
    "Peugeot": [
      ["108", 2014, 2023], ["208", 2012, 2026, false, ["I (2012-2019)", "II (2020-2026)"]], ["308", 2008, 2026, false, ["I (2008-2013)", "II (2014-2021)", "III (2022-2026)"]],
      ["308 SW", 2008, 2026], ["408", 2023, 2026], ["508", 2011, 2026, false, ["I (2011-2018)", "II (2019-2026)"]], ["508 SW", 2011, 2026],
      ["2008", 2013, 2026, false, ["I (2013-2019)", "II (2020-2026)"]], ["3008", 2009, 2026, false, ["I (2009-2016)", "II (2017-2023)", "III (2024-2026)"]],
      ["5008", 2010, 2026, false, ["I (2010-2016)", "II (2017-2023)", "III (2024-2026)"]], ["Rifter", 2018, 2026],
      ["Partner", 2008, 2026], ["Expert", 2007, 2026],
      ["e-208", 2020, 2026, true], ["e-308", 2023, 2026, true], ["e-2008", 2020, 2026, true], ["e-3008", 2024, 2026, true],
      ["e-5008", 2024, 2026, true], ["e-Rifter", 2021, 2026, true],
    ],
    "Polestar": [["Polestar 2", 2021, 2026, true], ["Polestar 3", 2024, 2026, true], ["Polestar 4", 2024, 2026, true]],
    "Porsche": [
      ["911 Carrera", 2005, 2026, false, ["997 (2005-2011)", "991 (2012-2019)", "992 (2020-2026)"]], ["911 Turbo", 2007, 2026],
      ["911 GT3", 2007, 2026], ["718 Cayman", 2017, 2026], ["718 Boxster", 2017, 2026],
      ["Panamera", 2010, 2026], ["Cayenne", 2003, 2026, false, ["I (2003-2010)", "II (2011-2017)", "III (2018-2026)"]],
      ["Cayenne Coupé", 2020, 2026], ["Macan", 2014, 2026],
      ["Taycan", 2020, 2026, true], ["Taycan Cross Turismo", 2022, 2026, true], ["Macan Electric", 2025, 2026, true],
    ],
    "Renault": [
      ["Twingo", 2007, 2024, false, ["II (2007-2014)", "III (2015-2024)"]], ["Clio", 2006, 2026, false, ["III (2006-2012)", "IV (2013-2019)", "V (2020-2026)"]],
      ["Captur", 2013, 2026, false, ["I (2013-2019)", "II (2020-2026)"]], ["Mégane", 2003, 2022, false, ["II (2003-2008)", "III (2009-2015)", "IV (2016-2022)"]],
      ["Austral", 2023, 2026], ["Espace", 2023, 2026], ["Rafale", 2024, 2026], ["Arkana", 2021, 2026],
      ["Kangoo", 2008, 2026], ["Scénic", 2004, 2022, false, ["II (2004-2009)", "III (2010-2016)", "IV (2017-2022)"]],
      ["ZOE", 2013, 2024, true, ["Phase 1 (2013-2019)", "Phase 2 (2020-2024)"]], ["Mégane E-Tech Electric", 2022, 2026, true],
      ["Scénic E-Tech Electric", 2024, 2026, true], ["R5 E-Tech", 2025, 2026, true],
    ],
    "Seat": [
      ["Ibiza", 2006, 2026, false, ["IV (2008-2017)", "V (2018-2026)"]], ["Leon", 2006, 2026, false, ["II (2006-2012)", "III (2013-2020)", "IV (2021-2026)"]],
      ["Arona", 2018, 2026], ["Ateca", 2016, 2026], ["Tarraco", 2019, 2026],
    ],
    "Škoda": [
      ["Fabia", 2007, 2026, false, ["II (2007-2014)", "III (2015-2021)", "IV (2022-2026)"]], ["Octavia", 2005, 2026, false, ["II (2005-2012)", "III (2013-2019)", "IV (2020-2026)"]],
      ["Octavia Combi", 2005, 2026], ["Superb", 2008, 2026], ["Superb Combi", 2010, 2026],
      ["Karoq", 2018, 2026], ["Kodiaq", 2017, 2026], ["Kamiq", 2020, 2026], ["Scala", 2019, 2026],
      ["Enyaq", 2021, 2026, true], ["Enyaq Coupé", 2022, 2026, true],
    ],
    "Smart": [["EQ fortwo", 2018, 2024, true], ["EQ forfour", 2018, 2024, true], ["#1", 2023, 2026, true], ["#3", 2024, 2026, true]],
    "Suzuki": [["Swift", 2005, 2026], ["Ignis", 2017, 2026], ["Vitara", 2015, 2026], ["S-Cross", 2014, 2026], ["Jimny", 2018, 2026]],
    "Tesla": [["Model 3", 2019, 2026, true, ["Phase 1 (2019-2023)", "Highland (2024-2026)"]], ["Model Y", 2021, 2026, true, ["Phase 1 (2021-2024)", "Juniper (2025-2026)"]], ["Model S", 2014, 2026, true, ["Phase 1 (2014-2021)", "Refresh (2022-2026)"]], ["Model X", 2016, 2026, true], ["Cybertruck", 2024, 2026, true]],
    "Toyota": [
      ["Yaris", 2006, 2026, false, ["II (2006-2011)", "III (2012-2019)", "IV (2020-2026)"]], ["Yaris Cross", 2021, 2026],
      ["GR Yaris", 2021, 2026], ["Corolla", 2019, 2026], ["Corolla Touring Sports", 2019, 2026],
      ["C-HR", 2017, 2026, false, ["I (2017-2023)", "II (2024-2026)"]], ["RAV4", 2006, 2026, false, ["III (2006-2012)", "IV (2013-2018)", "V (2019-2026)"]],
      ["Land Cruiser", 2003, 2026], ["Supra", 2019, 2026], ["GR86", 2022, 2026], ["Aygo X", 2022, 2026],
      ["Highlander", 2021, 2026], ["Camry", 2019, 2026], ["Proace", 2013, 2026],
      ["bZ4X", 2023, 2026, true], ["Mirai", 2021, 2026],
    ],
    "Volkswagen": [
      ["Polo", 2005, 2026, false, ["IV (2005-2009)", "V (2010-2017)", "VI (2018-2026)"]], ["Golf", 2004, 2026, false, ["V (2004-2008)", "VI (2009-2012)", "VII (2013-2019)", "VIII (2020-2026)"]],
      ["Golf GTI", 2005, 2026], ["Golf R", 2010, 2026], ["Golf Variant", 2007, 2026],
      ["T-Roc", 2018, 2026], ["T-Cross", 2019, 2026], ["Tiguan", 2008, 2026, false, ["I (2008-2016)", "II (2017-2026)"]],
      ["Touareg", 2003, 2026], ["Passat", 2005, 2026, false, ["B6 (2005-2010)", "B7 (2011-2014)", "B8 (2015-2023)", "B9 (2024-2026)"]],
      ["Passat Variant", 2005, 2026], ["Arteon", 2018, 2026], ["Taigo", 2022, 2026],
      ["Caddy", 2004, 2026], ["Multivan", 2004, 2026], ["Transporter", 2003, 2026], ["up!", 2012, 2023],
      ["ID.3", 2021, 2026, true], ["ID.4", 2021, 2026, true], ["ID.5", 2022, 2026, true], ["ID.7", 2024, 2026, true],
      ["ID. Buzz", 2023, 2026, true], ["e-up!", 2014, 2023, true],
    ],
    "Volvo": [
      ["XC40", 2018, 2026], ["XC60", 2009, 2026, false, ["I (2009-2016)", "II (2017-2026)"]], ["XC90", 2003, 2026, false, ["I (2003-2014)", "II (2015-2026)"]],
      ["S60", 2011, 2026], ["S90", 2017, 2026], ["V60", 2011, 2026], ["V60 Cross Country", 2015, 2026],
      ["V90", 2017, 2026], ["V90 Cross Country", 2017, 2026],
      ["C40 Recharge", 2022, 2026, true], ["XC40 Recharge", 2021, 2026, true], ["EX30", 2024, 2026, true], ["EX90", 2025, 2026, true],
    ],
  }).map(([brand, models]) => [brand, (models as M[]).map(m)]));

export const BRANDS = Object.keys(VEHICLE_DB).sort();
export const ELECTRIC_ONLY_BRANDS = ["Tesla", "Polestar", "Smart"] as const;

// ─── Helpers ───
export function isElectricOnlyBrand(brand: string): boolean {
  return (ELECTRIC_ONLY_BRANDS as readonly string[]).includes(brand);
}

export function getModelsForBrand(brand: string): ModelInfo[] {
  return VEHICLE_DB[brand] || [];
}

export function isElectricModel(brand: string, modelName: string): boolean {
  if (isElectricOnlyBrand(brand)) return true;
  const models = VEHICLE_DB[brand];
  if (!models) return false;
  const found = models.find((m) => m.name === modelName);
  return found?.isElectric ?? false;
}

export function getYearsForModel(brand: string, modelName: string): string[] {
  const models = VEHICLE_DB[brand];
  if (!models) return YEARS;
  const found = models.find((m) => m.name === modelName);
  if (!found) return YEARS;
  const years: string[] = [];
  for (let y = found.yearEnd; y >= found.yearStart; y--) {
    years.push(y.toString());
  }
  return years;
}

export function getPhasesForModel(brand: string, modelName: string): string[] {
  const models = VEHICLE_DB[brand];
  if (!models) return [];
  const found = models.find((m) => m.name === modelName);
  return found?.phases ?? [];
}

export const FUEL_TYPES = [
  { value: "essence", label: "Essence" },
  { value: "diesel", label: "Diesel" },
  { value: "hybride", label: "Hybride" },
  { value: "hybride-rechargeable", label: "Hybride rechargeable" },
  { value: "electrique", label: "Électrique" },
  { value: "gpl", label: "GPL" },
  { value: "ethanol", label: "Éthanol (E85)" },
] as const;

export const TRANSMISSIONS = [
  { value: "manuelle", label: "Manuelle" },
  { value: "automatique", label: "Automatique" },
] as const;

export const YEARS = Array.from({ length: 27 }, (_, i) => (2026 - i).toString());

// ─── Types & Mock Data ───
export interface Vehicle {
  id: string; brand: string; model: string; year: number; mileage: number; price: number;
  fuel: string; transmission: string; notes?: string; images: string[]; createdAt: string;
  status: "published" | "draft" | "generating";
}

export interface Generation {
  id: string; vehicleId: string; content: string; style: "standard" | "short" | "sales";
  seoScore: number; createdAt: string;
}

export const mockVehicles: Vehicle[] = [
  { id: "v1", brand: "BMW", model: "Série 3", year: 2022, mileage: 35000, price: 34900, fuel: "diesel", transmission: "automatique", images: [], createdAt: "2026-02-25", status: "published" },
  { id: "v2", brand: "Mercedes-Benz", model: "Classe A", year: 2023, mileage: 18000, price: 29500, fuel: "essence", transmission: "automatique", images: [], createdAt: "2026-02-24", status: "published" },
  { id: "v3", brand: "Peugeot", model: "3008", year: 2021, mileage: 52000, price: 24900, fuel: "hybride", transmission: "automatique", images: [], createdAt: "2026-02-23", status: "draft" },
  { id: "v4", brand: "Audi", model: "A4 Avant", year: 2022, mileage: 41000, price: 38700, fuel: "diesel", transmission: "automatique", images: [], createdAt: "2026-02-22", status: "published" },
  { id: "v5", brand: "Tesla", model: "Model 3", year: 2023, mileage: 15000, price: 41900, fuel: "electrique", transmission: "automatique", images: [], createdAt: "2026-02-20", status: "published" },
];

export const mockStats = { totalAds: 47, thisMonth: 12, avgSeoScore: 92, totalViews: 3840 };

export const MOCK_GENERATED_AD = `[BRAND] [MODEL] [YEAR] - [MILEAGE] km - [FUEL] - [TRANSMISSION] - [PRICE] €

Découvrez cette [BRAND] [MODEL] de [YEAR], affichant seulement [MILEAGE] km au compteur. Véhicule en excellent état, entretenu régulièrement, prêt à prendre la route.


CARACTÉRISTIQUES
- Marque : [BRAND]
- Modèle : [MODEL]
- Mise en circulation : [YEAR]
- Kilométrage : [MILEAGE] km
- Énergie : [FUEL]
- Boîte de vitesse : [TRANSMISSION]
- Prix : [PRICE] €


ÉQUIPEMENTS ET OPTIONS
- Climatisation automatique
- Régulateur de vitesse adaptatif
- Écran tactile multimédia
- Aide au stationnement avant/arrière
- Sièges chauffants
- Jantes alliage
- Feux LED
- Démarrage sans clé


ÉTAT DU VÉHICULE
- Carnet d'entretien à jour
- Contrôle technique OK, sans observations
- Aucun frais à prévoir
- Non-fumeur
- Jamais accidenté

[NOTES]

POURQUOI CHOISIR CE VÉHICULE ?
Cette [BRAND] [MODEL] offre un excellent rapport qualité-prix. Fiable et bien entretenue, elle conviendra aussi bien pour un usage quotidien que pour les longs trajets. Faible kilométrage pour son année, motorisation [FUEL] économique, boîte [TRANSMISSION] pour un confort de conduite optimal.


INFORMATIONS PRATIQUES
- Véhicule visible en concession sur rendez-vous
- Reprise de votre ancien véhicule possible
- Financement sur mesure disponible (LOA / Crédit)
- Garantie constructeur ou garantie mécanique incluse
- Livraison possible dans toute la France

Contactez-nous dès maintenant pour organiser un essai ou obtenir plus d'informations. Véhicule disponible immédiatement.`;
