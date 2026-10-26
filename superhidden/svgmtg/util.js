function sym(name) {
    switch (name.toLowerCase()) {
        case "w": return '\u{1fc00}'; // white mana
        case "u": return '\u{1fc01}'; // blue mana
        case "b": return '\u{1fc02}'; // black mana
        case "r": return '\u{1fc03}'; // red mana
        case "g": return '\u{1fc04}'; // green mana
        case "c": return '\u{1fc05}'; // colorless mana
        case "0": return '\u{1fc06}'; // 0 generic mana
        case "1": return '\u{1fc07}'; // 1 generic mana
        case "2": return '\u{1fc08}'; // 2 generic mana
        case "3": return '\u{1fc09}'; // 3 generic mana
        case "4": return '\u{1fc0a}'; // 4 generic mana
        case "5": return '\u{1fc0b}'; // 5 generic mana
        case "6": return '\u{1fc0c}'; // 6 generic mana
        case "7": return '\u{1fc0d}'; // 7 generic mana
        case "8": return '\u{1fc0e}'; // 8 generic mana
        case "9": return '\u{1fc0f}'; // 9 generic mana
        case "10": return '\u{1fc10}'; // 10 generic mana
        case "11": return '\u{1fc11}'; // 11 generic mana
        case "12": return '\u{1fc12}'; // 12 generic mana
        case "13": return '\u{1fc13}'; // 13 generic mana
        case "14": return '\u{1fc14}'; // 14 generic mana
        case "15": return '\u{1fc15}'; // 15 generic mana
        case "16": return '\u{1fc16}'; // 16 generic mana
        case "17": return '\u{1fc17}'; // 17 generic mana
        case "18": return '\u{1fc18}'; // 18 generic mana
        case "19": return '\u{1fc19}'; // 19 generic mana
        case "20": return '\u{1fc1a}'; // 20 generic mana
        case "x": return '\u{1fc1b}'; // X mana
        case "y": return '\u{1fc1c}'; // Y mana
        case "z": return '\u{1fc1d}'; // Z mana
        case "wu": case "uw": return '\u{1fc1e}'; // white-blue hybrid mana
        case "ub": case "bu": return '\u{1fc1f}'; // blue-black hybrid mana
        case "br": case "rb": return '\u{1fc20}'; // black-red hybrid mana
        case "rg": case "gr": return '\u{1fc21}'; // red-green hybrid mana
        case "gw": case "wg": return '\u{1fc22}'; // green-white hybrid mana
        case "wb": case "bw": return '\u{1fc23}'; // white-black hybrid mana
        case "ur": case "ru": return '\u{1fc24}'; // blue-red hybrid mana
        case "bg": case "gb": return '\u{1fc25}'; // black-green hybrid mana
        case "rw": case "wr": return '\u{1fc26}'; // red-white hybrid mana
        case "gu": case "ug": return '\u{1fc27}'; // green-blue hybrid mana
        case "cw": case "wc": return '\u{1fc28}'; // colorless-white hybrid mana
        case "cu": case "uc": return '\u{1fc29}'; // colorless-blue hybrid mana
        case "cb": case "bc": return '\u{1fc2a}'; // colorless-black hybrid mana
        case "cr": case "rc": return '\u{1fc2b}'; // colorless-red hybrid mana
        case "cg": case "gc": return '\u{1fc2c}'; // colorless-green hybrid mana
        case "2w": return '\u{1fc2d}'; // 2 generic/1 white mana
        case "2u": return '\u{1fc2e}'; // 2 generic/1 blue mana
        case "2b": return '\u{1fc2f}'; // 2 generic/1 black mana
        case "2r": return '\u{1fc30}'; // 2 generic/1 red mana
        case "2g": return '\u{1fc31}'; // 2 generic/1 green mana
        case "pw": return '\u{1fc32}'; // phyrexian white mana
        case "pu": return '\u{1fc33}'; // phyrexian blue mana
        case "pb": return '\u{1fc34}'; // phyrexian black mana
        case "pr": return '\u{1fc35}'; // phyrexian red mana
        case "pg": return '\u{1fc36}'; // phyrexian green mana
        case "pc": return '\u{1fc37}'; // phyrexian colorless mana
        case "pwu": case "puw": return '\u{1fc38}'; // phyrexian white-blue hybrid mana
        case "pub": case "pbu": return '\u{1fc39}'; // phyrexian blue-black hybrid mana
        case "pbr": case "prb": return '\u{1fc3a}'; // phyrexian black-red hybrid mana
        case "prg": case "pgr": return '\u{1fc3b}'; // phyrexian red-green hybrid mana
        case "pgw": case "pwg": return '\u{1fc3c}'; // phyrexian green-white hybrid mana
        case "pwb": case "pbw": return '\u{1fc3d}'; // phyrexian white-black hybrid mana
        case "pur": case "pru": return '\u{1fc3e}'; // phyrexian blue-red hybrid mana
        case "pbg": case "pgb": return '\u{1fc3f}'; // phyrexian black-green hybrid mana
        case "prw": case "pwr": return '\u{1fc40}'; // phyrexian red-white hybrid mana
        case "pgu": case "pug": return '\u{1fc41}'; // phyrexian green-blue hybrid mana
        case "s": return '\u{1fc42}'; // snow mana
        case "t": return '\u{1fc43}'; // tap
        case "ut": return '\u{1fc44}'; // untap
        default: return null; // no value found!
    }
}