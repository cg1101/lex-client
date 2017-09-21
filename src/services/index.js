var mod = angular.module('lex.services', [
    'lex.services.lex',
    'lex.services.linguist'
]);

mod.constant('IPASymbolMap', {
    '101': {ipaNumber: 101, ipaSymbol: '\u0070', xsampa: 'p'},
    '102': {ipaNumber: 102, ipaSymbol: '\u0062', xsampa: 'b'},
    '103': {ipaNumber: 103, ipaSymbol: '\u0074', xsampa: 't'},
    '104': {ipaNumber: 104, ipaSymbol: '\u0064', xsampa: 'd'},
    '105': {ipaNumber: 105, ipaSymbol: '\u0288', xsampa: 't`'},
    '106': {ipaNumber: 106, ipaSymbol: '\u0256', xsampa: 'd`'},
    '107': {ipaNumber: 107, ipaSymbol: '\u0063', xsampa: 'c'},
    '108': {ipaNumber: 108, ipaSymbol: '\u025f', xsampa: 'J\\'},
    '109': {ipaNumber: 109, ipaSymbol: '\u006b', xsampa: 'k'},
    '110': {ipaNumber: 110, ipaSymbol: '\u0261', xsampa: 'g'},
    '111': {ipaNumber: 111, ipaSymbol: '\u0071', xsampa: 'q'},
    '112': {ipaNumber: 112, ipaSymbol: '\u0262', xsampa: 'G\\'},
    '113': {ipaNumber: 113, ipaSymbol: '\u0294', xsampa: '?'},
    '114': {ipaNumber: 114, ipaSymbol: '\u006d', xsampa: 'm'},
    '115': {ipaNumber: 115, ipaSymbol: '\u0271', xsampa: 'F'},
    '116': {ipaNumber: 116, ipaSymbol: '\u006e', xsampa: 'n'},
    '117': {ipaNumber: 117, ipaSymbol: '\u0273', xsampa: 'n`'},
    '118': {ipaNumber: 118, ipaSymbol: '\u0272', xsampa: 'J'},
    '119': {ipaNumber: 119, ipaSymbol: '\u014b', xsampa: 'N'},
    '120': {ipaNumber: 120, ipaSymbol: '\u0274', xsampa: 'N\\'},
    '121': {ipaNumber: 121, ipaSymbol: '\u0299', xsampa: 'B\\'},
    '122': {ipaNumber: 122, ipaSymbol: '\u0072', xsampa: 'r'},
    '123': {ipaNumber: 123, ipaSymbol: '\u0280', xsampa: 'R\\'},
    '124': {ipaNumber: 124, ipaSymbol: '\u027e', xsampa: '4'},
    '125': {ipaNumber: 125, ipaSymbol: '\u027d', xsampa: 'r`'},
    '126': {ipaNumber: 126, ipaSymbol: '\u0278', xsampa: 'p\\'},
    '127': {ipaNumber: 127, ipaSymbol: '\u03b2', xsampa: 'B'},
    '128': {ipaNumber: 128, ipaSymbol: '\u0066', xsampa: 'f'},
    '129': {ipaNumber: 129, ipaSymbol: '\u0076', xsampa: 'v'},
    '130': {ipaNumber: 130, ipaSymbol: '\u03b8', xsampa: 'T'},
    '131': {ipaNumber: 131, ipaSymbol: '\u00f0', xsampa: 'D'},
    '132': {ipaNumber: 132, ipaSymbol: '\u0073', xsampa: 's'},
    '133': {ipaNumber: 133, ipaSymbol: '\u007a', xsampa: 'z'},
    '134': {ipaNumber: 134, ipaSymbol: '\u0283', xsampa: 'S'},
    '135': {ipaNumber: 135, ipaSymbol: '\u0292', xsampa: 'Z'},
    '136': {ipaNumber: 136, ipaSymbol: '\u0282', xsampa: 's`'},
    '137': {ipaNumber: 137, ipaSymbol: '\u0290', xsampa: 'z`'},
    '138': {ipaNumber: 138, ipaSymbol: '\u00e7', xsampa: 'C'},
    '139': {ipaNumber: 139, ipaSymbol: '\u029d', xsampa: 'j\\'},
    '140': {ipaNumber: 140, ipaSymbol: '\u0078', xsampa: 'x'},
    '141': {ipaNumber: 141, ipaSymbol: '\u0263', xsampa: 'G'},
    '142': {ipaNumber: 142, ipaSymbol: '\u03c7', xsampa: 'X'},
    '143': {ipaNumber: 143, ipaSymbol: '\u0281', xsampa: 'R'},
    '144': {ipaNumber: 144, ipaSymbol: '\u0127', xsampa: 'X\\'},
    '145': {ipaNumber: 145, ipaSymbol: '\u0295', xsampa: '?\\'},
    '146': {ipaNumber: 146, ipaSymbol: '\u0068', xsampa: 'h'},
    '147': {ipaNumber: 147, ipaSymbol: '\u0266', xsampa: 'h\\'},
    '148': {ipaNumber: 148, ipaSymbol: '\u026c', xsampa: 'K'},
    '149': {ipaNumber: 149, ipaSymbol: '\u026e', xsampa: 'K\\'},
    '150': {ipaNumber: 150, ipaSymbol: '\u028b', xsampa: ['P', 'v\\']},
    '151': {ipaNumber: 151, ipaSymbol: '\u0279', xsampa: 'r\\'},
    '152': {ipaNumber: 152, ipaSymbol: '\u027b', xsampa: 'r\\`'},
    '153': {ipaNumber: 153, ipaSymbol: '\u006a', xsampa: 'j'},
    '154': {ipaNumber: 154, ipaSymbol: '\u0270', xsampa: 'M\\'},
    '155': {ipaNumber: 155, ipaSymbol: '\u006c', xsampa: 'l'},
    '156': {ipaNumber: 156, ipaSymbol: '\u026d', xsampa: 'l`'},
    '157': {ipaNumber: 157, ipaSymbol: '\u028e', xsampa: 'L'},
    '158': {ipaNumber: 158, ipaSymbol: '\u029f', xsampa: 'L\\'},
    '160': {ipaNumber: 160, ipaSymbol: '\u0253', xsampa: 'b_<'},
    '162': {ipaNumber: 162, ipaSymbol: '\u0257', xsampa: 'd_<'},
    '164': {ipaNumber: 164, ipaSymbol: '\u0284', xsampa: 'J\\_<'},
    '166': {ipaNumber: 166, ipaSymbol: '\u0260', xsampa: 'g_<'},
    '168': {ipaNumber: 168, ipaSymbol: '\u029b', xsampa: 'G\\_<'},
    '169': {ipaNumber: 169, ipaSymbol: '\u028d', xsampa: 'W'},
    '170': {ipaNumber: 170, ipaSymbol: '\u0077', xsampa: 'w'},
    '171': {ipaNumber: 171, ipaSymbol: '\u0265', xsampa: 'H'},
    '172': {ipaNumber: 172, ipaSymbol: '\u029c', xsampa: 'H\\'},
    '173': {ipaNumber: 173, ipaSymbol: '\u02a1', xsampa: '>\\'},
    '174': {ipaNumber: 174, ipaSymbol: '\u02a2', xsampa: '<\\'},
    '175': {ipaNumber: 175, ipaSymbol: '\u0267', xsampa: 'x\\'},
    '176': {ipaNumber: 176, ipaSymbol: '\u0298', xsampa: 'O\\'},
    '177': {ipaNumber: 177, ipaSymbol: '\u01c0', xsampa: '|\\'},
    '178': {ipaNumber: 178, ipaSymbol: '\u01c3', xsampa: '!\\'},
    '179': {ipaNumber: 179, ipaSymbol: '\u01c2', xsampa: '=\\'},
    '180': {ipaNumber: 180, ipaSymbol: '\u01c1', xsampa: '|\\|\\'},
    '181': {ipaNumber: 181, ipaSymbol: '\u027a', xsampa: 'l\\'},
    '182': {ipaNumber: 182, ipaSymbol: '\u0255', xsampa: 's\\'},
    '183': {ipaNumber: 183, ipaSymbol: '\u0291', xsampa: 'z\\'},
    '184': {ipaNumber: 184, ipaSymbol: '\u2c71', xsampa: null},
    '301': {ipaNumber: 301, ipaSymbol: '\u0069', xsampa: 'i'},
    '302': {ipaNumber: 302, ipaSymbol: '\u0065', xsampa: 'e'},
    '303': {ipaNumber: 303, ipaSymbol: '\u025b', xsampa: 'E'},
    '304': {ipaNumber: 304, ipaSymbol: '\u0061', xsampa: 'a'},
    '305': {ipaNumber: 305, ipaSymbol: '\u0251', xsampa: 'A'},
    '306': {ipaNumber: 306, ipaSymbol: '\u0254', xsampa: 'O'},
    '307': {ipaNumber: 307, ipaSymbol: '\u006f', xsampa: 'o'},
    '308': {ipaNumber: 308, ipaSymbol: '\u0075', xsampa: 'u'},
    '309': {ipaNumber: 309, ipaSymbol: '\u0079', xsampa: 'y'},
    '310': {ipaNumber: 310, ipaSymbol: '\u00f8', xsampa: '2'},
    '311': {ipaNumber: 311, ipaSymbol: '\u0153', xsampa: '9'},
    '312': {ipaNumber: 312, ipaSymbol: '\u0276', xsampa: '&'},
    '313': {ipaNumber: 313, ipaSymbol: '\u0252', xsampa: 'Q'},
    '314': {ipaNumber: 314, ipaSymbol: '\u028c', xsampa: 'V'},
    '315': {ipaNumber: 315, ipaSymbol: '\u0264', xsampa: '7'},
    '316': {ipaNumber: 316, ipaSymbol: '\u026f', xsampa: 'M'},
    '317': {ipaNumber: 317, ipaSymbol: '\u0268', xsampa: '1'},
    '318': {ipaNumber: 318, ipaSymbol: '\u0289', xsampa: '}'},
    '319': {ipaNumber: 319, ipaSymbol: '\u026a', xsampa: 'I'},
    '320': {ipaNumber: 320, ipaSymbol: '\u028f', xsampa: 'Y'},
    '321': {ipaNumber: 321, ipaSymbol: '\u028a', xsampa: 'U'},
    '322': {ipaNumber: 322, ipaSymbol: '\u0259', xsampa: '@'},
    '323': {ipaNumber: 323, ipaSymbol: '\u0275', xsampa: '8'},
    '324': {ipaNumber: 324, ipaSymbol: '\u0250', xsampa: '6'},
    '325': {ipaNumber: 325, ipaSymbol: '\u00e6', xsampa: '{'},
    '326': {ipaNumber: 326, ipaSymbol: '\u025c', xsampa: '3'},
    '395': {ipaNumber: 395, ipaSymbol: '\u025e', xsampa: '3\\'},
    '397': {ipaNumber: 397, ipaSymbol: '\u0258', xsampa: '@\\'},
    '401': {ipaNumber: 401, ipaSymbol: '\u02bc', xsampa: '_>'},
    '402': {ipaNumber: 402, ipaSymbol: '\u0325', xsampa: '_0'},
    '403': {ipaNumber: 403, ipaSymbol: '\u032c', xsampa: '_v'},
    '404': {ipaNumber: 404, ipaSymbol: '\u02b0', xsampa: '_h'},
    '405': {ipaNumber: 405, ipaSymbol: '\u0324', xsampa: '_t'},
    '406': {ipaNumber: 406, ipaSymbol: '\u0330', xsampa: '_k'},
    '407': {ipaNumber: 407, ipaSymbol: '\u033c', xsampa: '_N'},
    '408': {ipaNumber: 408, ipaSymbol: '\u032a', xsampa: '_d'},
    '409': {ipaNumber: 409, ipaSymbol: '\u033a', xsampa: '_a'},
    '410': {ipaNumber: 410, ipaSymbol: '\u033b', xsampa: '_m'},
    '411': {ipaNumber: 411, ipaSymbol: '\u0339', xsampa: '_O'},
    '412': {ipaNumber: 412, ipaSymbol: '\u031c', xsampa: '_c'},
    '413': {ipaNumber: 413, ipaSymbol: '\u031f', xsampa: '_+'},
    '414': {ipaNumber: 414, ipaSymbol: '\u0320', xsampa: '_-'},
    '415': {ipaNumber: 415, ipaSymbol: '\u0308', xsampa: '_"'},
    '416': {ipaNumber: 416, ipaSymbol: '\u033d', xsampa: '_x'},
    '417': {ipaNumber: 417, ipaSymbol: '\u0318', xsampa: '_A'},
    '418': {ipaNumber: 418, ipaSymbol: '\u0319', xsampa: '_q'},
    '419': {ipaNumber: 419, ipaSymbol: '\u02de', xsampa: '`'},
    '420': {ipaNumber: 420, ipaSymbol: '\u02b7', xsampa: '_w'},
    '421': {ipaNumber: 421, ipaSymbol: '\u02b2', xsampa: ['_j', '\'']},
    '422': {ipaNumber: 422, ipaSymbol: '\u02e0', xsampa: '_G'},
    '423': {ipaNumber: 423, ipaSymbol: '\u02e4', xsampa: '_?\\'},
    '424': {ipaNumber: 424, ipaSymbol: '\u0303', xsampa: ['~', '_~']},
    '425': {ipaNumber: 425, ipaSymbol: '\u207f', xsampa: '_n'},
    '426': {ipaNumber: 426, ipaSymbol: '\u02e1', xsampa: '_l'},
    '427': {ipaNumber: 427, ipaSymbol: '\u031a', xsampa: '_}'},
    '428': {ipaNumber: 428, ipaSymbol: '\u0334', xsampa: '_e'},
    '429': {ipaNumber: 429, ipaSymbol: '\u031d', xsampa: '_r'},
    '430': {ipaNumber: 430, ipaSymbol: '\u031e', xsampa: '_o'},
    '431': {ipaNumber: 431, ipaSymbol: '\u0329', xsampa: ['=', '_=']},
    '432': {ipaNumber: 432, ipaSymbol: '\u032f', xsampa: '_^'},
    // 433 not confirmed
    '433A': {ipaNumber: 433, ipaSymbol: '\u035c', xsampa: null},
    '433B': {ipaNumber: 433, ipaSymbol: '\u0361', xsampa: null},
    //
    '501': {ipaNumber: 501, ipaSymbol: '\u02c8', xsampa: '"'},
    '502': {ipaNumber: 502, ipaSymbol: '\u02cc', xsampa: '%'},
    '503': {ipaNumber: 503, ipaSymbol: '\u02d0', xsampa: ':'},
    '504': {ipaNumber: 504, ipaSymbol: '\u02d1', xsampa: ':\\'},
    '505': {ipaNumber: 505, ipaSymbol: '\u0306', xsampa: '_X'},
    '506': {ipaNumber: 506, ipaSymbol: '\u002e', xsampa: '.'},
    '507': {ipaNumber: 507, ipaSymbol: '\u007c', xsampa: '|'},
    '508': {ipaNumber: 508, ipaSymbol: '\u2016', xsampa: '||'},
    '509': {ipaNumber: 509, ipaSymbol: '\u203f', xsampa: '-\\'},
    '510': {ipaNumber: 510, ipaSymbol: '\u2197', xsampa: '<R>'},
    '511': {ipaNumber: 511, ipaSymbol: '\u2198', xsampa: '<F>'},
    '512': {ipaNumber: 512, ipaSymbol: '\u030b', xsampa: '_T'},
    '513': {ipaNumber: 513, ipaSymbol: '\u0301', xsampa: '_H'},
    '514': {ipaNumber: 514, ipaSymbol: '\u0304', xsampa: '_M'},
    '515': {ipaNumber: 515, ipaSymbol: '\u0300', xsampa: '_L'},
    '516': {ipaNumber: 516, ipaSymbol: '\u030f', xsampa: '_B'},
    '517': {ipaNumber: 517, ipaSymbol: '\ua71c', xsampa: '!'},
    '518': {ipaNumber: 518, ipaSymbol: '\ua71b', xsampa: '^'},
    '519': {ipaNumber: 519, ipaSymbol: '\u02e5', xsampa: null},
    '520': {ipaNumber: 520, ipaSymbol: '\u02e6', xsampa: null},
    '521': {ipaNumber: 521, ipaSymbol: '\u02e7', xsampa: null},
    '522': {ipaNumber: 522, ipaSymbol: '\u02e8', xsampa: null},
    '523': {ipaNumber: 523, ipaSymbol: '\u02e9', xsampa: null},
    '524': {ipaNumber: 524, ipaSymbol: '\u030c', xsampa: ['_R', '_/']},
    '525': {ipaNumber: 525, ipaSymbol: '\u0302', xsampa: ['_F', '_\\']},
    '526': {ipaNumber: 526, ipaSymbol: '\u1dc4', xsampa: '_H_T'},
    '527': {ipaNumber: 527, ipaSymbol: '\u1dc5', xsampa: '_B_L'},
    '528': {ipaNumber: 528, ipaSymbol: '\u1dc8', xsampa: '_R_F'}
});

mod.factory('Phones', function () {
    var phones = {
        '\\u0023': {symbol: '\u0023'},
        '\\u002b': {symbol: '\u002b'},
        '\\u002e': {symbol: '\u002e'},
        '\\u0061': {symbol: '\u0061'},
        '\\u0062': {symbol: '\u0062'},
        '\\u0063': {symbol: '\u0063'},
        '\\u0064': {symbol: '\u0064'},
        '\\u0065': {symbol: '\u0065'},
        '\\u0066': {symbol: '\u0066'},
        '\\u0068': {symbol: '\u0068'},
        '\\u0069': {symbol: '\u0069'},
        '\\u006a': {symbol: '\u006a'},
        '\\u006b': {symbol: '\u006b'},
        '\\u006c': {symbol: '\u006c'},
        '\\u006d': {symbol: '\u006d'},
        '\\u006e': {symbol: '\u006e'},
        '\\u006f': {symbol: '\u006f'},
        '\\u0070': {symbol: '\u0070'},
        '\\u0071': {symbol: '\u0071'},
        '\\u0072': {symbol: '\u0072'},
        '\\u0073': {symbol: '\u0073'},
        '\\u0074': {symbol: '\u0074'},
        '\\u0075': {symbol: '\u0075'},
        '\\u0076': {symbol: '\u0076'},
        '\\u0077': {symbol: '\u0077'},
        '\\u0078': {symbol: '\u0078'},
        '\\u0079': {symbol: '\u0079'},
        '\\u007a': {symbol: '\u007a'},
        '\\u007c': {symbol: '\u007c'},
        '\\u00e6': {symbol: '\u00e6'},
        '\\u00e7': {symbol: '\u00e7'},
        '\\u00f0': {symbol: '\u00f0'},
        '\\u00f8': {symbol: '\u00f8'},
        '\\u0127': {symbol: '\u0127'},
        '\\u014b': {symbol: '\u014b'},
        '\\u0153': {symbol: '\u0153'},
        '\\u01c0': {symbol: '\u01c0'},
        '\\u01c1': {symbol: '\u01c1'},
        '\\u01c2': {symbol: '\u01c2'},
        '\\u01c3': {symbol: '\u01c3'},
        '\\u0250': {symbol: '\u0250'},
        '\\u0251': {symbol: '\u0251'},
        '\\u0252': {symbol: '\u0252'},
        '\\u0253': {symbol: '\u0253'},
        '\\u0254': {symbol: '\u0254'},
        '\\u0255': {symbol: '\u0255'},
        '\\u0256': {symbol: '\u0256'},
        '\\u0257': {symbol: '\u0257'},
        '\\u0258': {symbol: '\u0258'},
        '\\u0259': {symbol: '\u0259'},
        '\\u025b': {symbol: '\u025b'},
        '\\u025c': {symbol: '\u025c'},
        '\\u025e': {symbol: '\u025e'},
        '\\u025f': {symbol: '\u025f'},
        '\\u0260': {symbol: '\u0260'},
        '\\u0261': {symbol: '\u0261'},
        '\\u0262': {symbol: '\u0262'},
        '\\u0263': {symbol: '\u0263'},
        '\\u0264': {symbol: '\u0264'},
        '\\u0265': {symbol: '\u0265'},
        '\\u0266': {symbol: '\u0266'},
        '\\u0267': {symbol: '\u0267'},
        '\\u0268': {symbol: '\u0268'},
        '\\u026a': {symbol: '\u026a'},
        '\\u026c': {symbol: '\u026c'},
        '\\u026d': {symbol: '\u026d'},
        '\\u026e': {symbol: '\u026e'},
        '\\u026f': {symbol: '\u026f'},
        '\\u0270': {symbol: '\u0270'},
        '\\u0271': {symbol: '\u0271'},
        '\\u0272': {symbol: '\u0272'},
        '\\u0273': {symbol: '\u0273'},
        '\\u0274': {symbol: '\u0274'},
        '\\u0275': {symbol: '\u0275'},
        '\\u0276': {symbol: '\u0276'},
        '\\u0278': {symbol: '\u0278'},
        '\\u0279': {symbol: '\u0279'},
        '\\u027a': {symbol: '\u027a'},
        '\\u027b': {symbol: '\u027b'},
        '\\u027d': {symbol: '\u027d'},
        '\\u027e': {symbol: '\u027e'},
        '\\u0280': {symbol: '\u0280'},
        '\\u0281': {symbol: '\u0281'},
        '\\u0282': {symbol: '\u0282'},
        '\\u0283': {symbol: '\u0283'},
        '\\u0284': {symbol: '\u0284'},
        '\\u0288': {symbol: '\u0288'},
        '\\u0289': {symbol: '\u0289'},
        '\\u028a': {symbol: '\u028a'},
        '\\u028b': {symbol: '\u028b'},
        '\\u028c': {symbol: '\u028c'},
        '\\u028d': {symbol: '\u028d'},
        '\\u028e': {symbol: '\u028e'},
        '\\u028f': {symbol: '\u028f'},
        '\\u0290': {symbol: '\u0290'},
        '\\u0291': {symbol: '\u0291'},
        '\\u0292': {symbol: '\u0292'},
        '\\u0294': {symbol: '\u0294'},
        '\\u0295': {symbol: '\u0295'},
        '\\u0298': {symbol: '\u0298'},
        '\\u0299': {symbol: '\u0299'},
        '\\u029b': {symbol: '\u029b'},
        '\\u029c': {symbol: '\u029c'},
        '\\u029d': {symbol: '\u029d'},
        '\\u029f': {symbol: '\u029f'},
        '\\u02a1': {symbol: '\u02a1'},
        '\\u02a2': {symbol: '\u02a2'},
        '\\u02b0': {symbol: '\u02b0'},
        '\\u02b2': {symbol: '\u02b2'},
        '\\u02b7': {symbol: '\u02b7'},
        '\\u02bc': {symbol: '\u02bc'},
        '\\u02c8': {symbol: '\u02c8'},
        '\\u02cc': {symbol: '\u02cc'},
        '\\u02d0': {symbol: '\u02d0'},
        '\\u02d1': {symbol: '\u02d1'},
        '\\u02de': {symbol: '\u02de'},
        '\\u02e0': {symbol: '\u02e0'},
        '\\u02e1': {symbol: '\u02e1'},
        '\\u02e4': {symbol: '\u02e4'},
        '\\u02e5': {symbol: '\u02e5'},
        '\\u02e6': {symbol: '\u02e6'},
        '\\u02e7': {symbol: '\u02e7'},
        '\\u02e8': {symbol: '\u02e8'},
        '\\u02e9': {symbol: '\u02e9'},
        '\\u0302': {symbol: '\u0302'},
        '\\u0303': {symbol: '\u0303'},
        '\\u0306': {symbol: '\u0306'},
        '\\u0308': {symbol: '\u0308'},
        '\\u030c': {symbol: '\u030c'},
        '\\u0318': {symbol: '\u0318'},
        '\\u0319': {symbol: '\u0319'},
        '\\u031a': {symbol: '\u031a'},
        '\\u031c': {symbol: '\u031c'},
        '\\u031d': {symbol: '\u031d'},
        '\\u031e': {symbol: '\u031e'},
        '\\u031f': {symbol: '\u031f'},
        '\\u0320': {symbol: '\u0320'},
        '\\u0324': {symbol: '\u0324'},
        '\\u0325': {symbol: '\u0325'},
        '\\u0329': {symbol: '\u0329'},
        '\\u032a': {symbol: '\u032a'},
        '\\u032c': {symbol: '\u032c'},
        '\\u032f': {symbol: '\u032f'},
        '\\u0330': {symbol: '\u0330'},
        '\\u0334': {symbol: '\u0334'},
        '\\u0339': {symbol: '\u0339'},
        '\\u033a': {symbol: '\u033a'},
        '\\u033b': {symbol: '\u033b'},
        '\\u033c': {symbol: '\u033c'},
        '\\u033d': {symbol: '\u033d'},
        '\\u03b2': {symbol: '\u03b2'},
        '\\u03b8': {symbol: '\u03b8'},
        '\\u03c7': {symbol: '\u03c7'},
        '\\u2016': {symbol: '\u2016'},
        '\\u203f': {symbol: '\u203f'},
        '\\u207f': {symbol: '\u207f'},
        '\\u2098': {symbol: '\u2098'},
        '\\u2197': {symbol: '\u2197'},
        '\\u2198': {symbol: '\u2198'},
        '\\u2c71': {symbol: '\u2c71'},
        '\\ua71b': {symbol: '\ua71b'},
        '\\ua71c': {symbol: '\ua71c'},
    };
    return phones;
});

mod.factory('Consonants', function ($log) {
    var consonants = [
        {
            "category": "ipa_consonant",
            "ipaNumber": "125",
            "key": "\\u027d",
            "attributes": {
                "voiced": true,
                "place": "retroflex",
                // "manner": "flap"
                "manner": "tap"
            },
            "symbol": "\u027d",
            "appenLexId": "027D;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "126",
            "key": "\\u0278",
            "attributes": {
                "voiced": false,
                "place": "bilabial",
                "manner": "fricative"
            },
            "symbol": "\u0278",
            "appenLexId": "0278;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "127",
            "key": "\\u03b2",
            "attributes": {
                "voiced": true,
                "place": "bilabial",
                "manner": "fricative"
            },
            "symbol": "\u03b2",
            "appenLexId": "03B2;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "128",
            "key": "\\u0066",
            "attributes": {
                "voiced": false,
                "place": "labiodental",
                "manner": "fricative"
            },
            "symbol": "f",
            "appenLexId": "0066;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "129",
            "key": "\\u0076",
            "attributes": {
                "voiced": true,
                "place": "labiodental",
                "manner": "fricative"
            },
            "symbol": "v",
            "appenLexId": "0076;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "130",
            "key": "\\u03b8",
            "attributes": {
                "voiced": false,
                "place": "dental",
                "manner": "fricative"
            },
            "symbol": "\u03b8",
            "appenLexId": "03B8;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "131",
            "key": "\\u00f0",
            "attributes": {
                "voiced": true,
                "place": "dental",
                "manner": "fricative"
            },
            "symbol": "\u00f0",
            "appenLexId": "00F0;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "132",
            "key": "\\u0073",
            "attributes": {
                "voiced": false,
                "place": "alveolar",
                "manner": "fricative"
            },
            "symbol": "s",
            "appenLexId": "0073;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "133",
            "key": "\\u007a",
            "attributes": {
                "voiced": true,
                "place": "alveolar",
                "manner": "fricative"
            },
            "symbol": "z",
            "appenLexId": "007A;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "134",
            "key": "\\u0283",
            "attributes": {
                "voiced": false,
                "place": "palato_alveolar",
                "manner": "fricative"
            },
            "symbol": "\u0283",
            "appenLexId": "0283;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "135",
            "key": "\\u0292",
            "attributes": {
                "voiced": true,
                "place": "palato_alveolar",
                "manner": "fricative"
            },
            "symbol": "\u0292",
            "appenLexId": "0292;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "136",
            "key": "\\u0282",
            "attributes": {
                "voiced": false,
                "place": "retroflex",
                "manner": "fricative"
            },
            "symbol": "\u0282",
            "appenLexId": "0282;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "137",
            "key": "\\u0290",
            "attributes": {
                "voiced": true,
                "place": "retroflex",
                "manner": "fricative"
            },
            "symbol": "\u0290",
            "appenLexId": "0290;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "138",
            "key": "\\u00e7",
            "attributes": {
                "voiced": false,
                "place": "palatal",
                "manner": "fricative"
            },
            "symbol": "\u00e7",
            "appenLexId": "00E7;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "139",
            "key": "\\u029d",
            "attributes": {
                "voiced": true,
                "place": "palatal",
                "manner": "fricative"
            },
            "symbol": "\u029d",
            "appenLexId": "029D;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "140",
            "key": "\\u0078",
            "attributes": {
                "voiced": false,
                "place": "velar",
                "manner": "fricative"
            },
            "symbol": "x",
            "appenLexId": "0078;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "141",
            "key": "\\u0263",
            "attributes": {
                "voiced": true,
                "place": "velar",
                "manner": "fricative"
            },
            "symbol": "\u0263",
            "appenLexId": "0263;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "142",
            "key": "\\u03c7",
            "attributes": {
                "voiced": false,
                "place": "uvular",
                "manner": "fricative"
            },
            "symbol": "\u03c7",
            "appenLexId": "03C7;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "143",
            "key": "\\u0281",
            "attributes": {
                "voiced": true,
                "place": "uvular",
                "manner": "fricative"
            },
            "symbol": "\u0281",
            "appenLexId": "0281;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "144",
            "key": "\\u0127",
            "attributes": {
                "voiced": false,
                "place": "pharyngeal",
                "manner": "fricative"
            },
            "symbol": "\u0127",
            "appenLexId": "0127;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "150",
            "key": "\\u028b",
            "attributes": {
                "voiced": true,
                "place": "labiodental",
                "manner": "approximant"
            },
            "symbol": "\u028b",
            "appenLexId": "028B;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "151",
            "key": "\\u0279",
            "attributes": {
                "voiced": true,
                "place": "alveolar",
                "manner": "approximant"
            },
            "symbol": "\u0279",
            "appenLexId": "0279;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "152",
            "key": "\\u027b",
            "attributes": {
                "voiced": true,
                "place": "retroflex",
                "manner": "approximant"
            },
            "symbol": "\u027b",
            "appenLexId": "027B;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "153",
            "key": "\\u006a",
            "attributes": {
                "voiced": true,
                "place": "palatal",
                "manner": "approximant"
            },
            "symbol": "j",
            "appenLexId": "006A;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "154",
            "key": "\\u0270",
            "attributes": {
                "voiced": true,
                "place": "velar",
                "manner": "approximant"
            },
            "symbol": "\u0270",
            "appenLexId": "0270;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "121",
            "key": "\\u0299",
            "attributes": {
                "voiced": true,
                "place": "bilabial",
                "manner": "trill"
            },
            "symbol": "\u0299",
            "appenLexId": "0299;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "119",
            "key": "\\u014b",
            "attributes": {
                "voiced": true,
                "place": "velar",
                "manner": "nasal"
            },
            "symbol": "\u014b",
            "appenLexId": "014B;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "120",
            "key": "\\u0274",
            "attributes": {
                "voiced": true,
                "place": "uvular",
                "manner": "nasal"
            },
            "symbol": "\u0274",
            "appenLexId": "0274;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "101",
            "key": "\\u0070",
            "attributes": {
                "voiced": false,
                "place": "bilabial",
                "manner": "plosive"
            },
            "symbol": "p",
            "appenLexId": "0070;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "102",
            "key": "\\u0062",
            "attributes": {
                "voiced": true,
                "place": "bilabial",
                "manner": "plosive"
            },
            "symbol": "b",
            "appenLexId": "0062;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "103",
            "key": "\\u0074",
            "attributes": {
                "voiced": false,
                "place": "alveolar",
                "manner": "plosive"
            },
            "symbol": "t",
            "appenLexId": "0074;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "104",
            "key": "\\u0064",
            "attributes": {
                "voiced": true,
                "place": "alveolar",
                "manner": "plosive"
            },
            "symbol": "d",
            "appenLexId": "0064;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "105",
            "key": "\\u0288",
            "attributes": {
                "voiced": false,
                "place": "retroflex",
                "manner": "plosive"
            },
            "symbol": "\u0288",
            "appenLexId": "0288;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "106",
            "key": "\\u0256",
            "attributes": {
                "voiced": true,
                "place": "retroflex",
                "manner": "plosive"
            },
            "symbol": "\u0256",
            "appenLexId": "0256;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "107",
            "key": "\\u0063",
            "attributes": {
                "voiced": false,
                "place": "palatal",
                "manner": "plosive"
            },
            "symbol": "c",
            "appenLexId": "0063;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "108",
            "key": "\\u025f",
            "attributes": {
                "voiced": true,
                "place": "palatal",
                "manner": "plosive"
            },
            "symbol": "\u025f",
            "appenLexId": "025F;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "109",
            "key": "\\u006b",
            "attributes": {
                "voiced": false,
                "place": "velar",
                "manner": "plosive"
            },
            "symbol": "k",
            "appenLexId": "006B;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "110",
            "key": "\\u0261",
            "attributes": {
                "voiced": true,
                "place": "velar",
                "manner": "plosive"
            },
            "symbol": "\u0261",
            "appenLexId": "0067;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "111",
            "key": "\\u0071",
            "attributes": {
                "voiced": false,
                "place": "uvular",
                "manner": "plosive"
            },
            "symbol": "q",
            "appenLexId": "0071;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "112",
            "key": "\\u0262",
            "attributes": {
                "voiced": true,
                "place": "uvular",
                "manner": "plosive"
            },
            "symbol": "\u0262",
            "appenLexId": "0262;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "173",
            "key": "\\u02a1",
            "attributes": {
                "voiced": false,
                "place": "epiglottal",
                "manner": "plosive"
            },
            "symbol": "\u02a1",
            "appenLexId": "02A1;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "113",
            "key": "\\u0294",
            "attributes": {
                "voiced": false,
                "place": "glottal",
                "manner": "plosive"
            },
            "symbol": "\u0294",
            "appenLexId": "0294;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "145",
            "key": "\\u0295",
            "attributes": {
                "voiced": true,
                "place": "pharyngeal",
                "manner": "fricative"
            },
            "symbol": "\u0295",
            "appenLexId": "0295;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "172",
            "key": "\\u029c",
            "attributes": {
                "voiced": false,
                "place": "epiglottal",
                "manner": "fricative"
            },
            "symbol": "\u029c",
            "appenLexId": "029C;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "",
            "key": "\\u0074\\u0073",
            "attributes": {
                "voiced": false,
                "place": "alveolar",
                "manner": "affricate"
            },
            "symbol": "ts",
            "appenLexId": "0074;0073;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "",
            "key": "\\u0064\\u007a",
            "attributes": {
                "voiced": true,
                "place": "alveolar",
                "manner": "affricate"
            },
            "symbol": "dz",
            "appenLexId": "0064;007A;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "",
            "key": "\\u0074\\u0283",
            "attributes": {
                "voiced": false,
                "place": "palato_alveolar",
                "manner": "affricate"
            },
            "symbol": "t\u0283",
            "appenLexId": "0074;0283;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "122",
            "key": "\\u0072",
            "attributes": {
                "voiced": true,
                "place": "alveolar",
                "manner": "trill"
            },
            "symbol": "r",
            "appenLexId": "0072;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "123",
            "key": "\\u0280",
            "attributes": {
                "voiced": true,
                "place": "uvular",
                "manner": "trill"
            },
            "symbol": "\u0280",
            "appenLexId": "0280;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "123",
            "key": "\\u0280",
            "attributes": {
                "voiced": true,
                "place": "epiglottal",
                "manner": "trill"
            },
            "symbol": "\u0280",
            "appenLexId": "044F;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "184",
            "key": "\\u2c71",
            "attributes": {
                "voiced": true,
                "place": "labiodental",
                "manner": "tap"
            },
            "symbol": "\u2c71",
            "appenLexId": "F25F;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "124",
            "key": "\\u027e",
            "attributes": {
                "voiced": true,
                "place": "alveolar",
                "manner": "tap"
            },
            "symbol": "\u027e",
            "appenLexId": "027E;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "174",
            "key": "\\u02a2",
            "attributes": {
                "voiced": true,
                "place": "epiglottal",
                "manner": "fricative"
            },
            "symbol": "\u02a2",
            "appenLexId": "02A2;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "146",
            "key": "\\u0068",
            "attributes": {
                "voiced": false,
                "place": "glottal",
                "manner": "fricative"
            },
            "symbol": "h",
            "appenLexId": "0068;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "147",
            "key": "\\u0266",
            "attributes": {
                "voiced": true,
                "place": "glottal",
                "manner": "fricative"
            },
            "symbol": "\u0266",
            "appenLexId": "0266;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "114",
            "key": "\\u006d",
            "attributes": {
                "voiced": true,
                "place": "bilabial",
                "manner": "nasal"
            },
            "symbol": "m",
            "appenLexId": "006D;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "115",
            "key": "\\u0271",
            "attributes": {
                "voiced": true,
                "place": "labiodental",
                "manner": "nasal"
            },
            "symbol": "\u0271",
            "appenLexId": "0271;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "116",
            "key": "\\u006e",
            "attributes": {
                "voiced": true,
                "place": "alveolar",
                "manner": "nasal"
            },
            "symbol": "n",
            "appenLexId": "006E;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "118",
            "key": "\\u0272",
            "attributes": {
                "voiced": true,
                "place": "palatal",
                "manner": "nasal"
            },
            "symbol": "\u0272",
            "appenLexId": "0272;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "148",
            "key": "\\u026c",
            "attributes": {
                "voiced": false,
                "place": "alveolar",
                "manner": "lateral_fricative"
            },
            "symbol": "\u026c",
            "appenLexId": "026C;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "149",
            "key": "\\u026e",
            "attributes": {
                "voiced": true,
                "place": "alveolar",
                "manner": "lateral_fricative"
            },
            "symbol": "\u026e",
            "appenLexId": "026E;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "176",
            "key": "\\u0298",
            "attributes": {
                "voiced": false,
                "place": "bilabial",
                "manner": "click"
            },
            "symbol": "\u0298",
            "appenLexId": "0298;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "177",
            "key": "\\u01c0",
            "attributes": {
                "voiced": false,
                "place": "dental",
                "manner": "click"
            },
            "symbol": "\u01c0",
            "appenLexId": "01C0;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "180",
            "key": "\\u01c1",
            "attributes": {
                "voiced": false,
                "place": "alveolar",
                "manner": "click"
            },
            "symbol": "\u01c1",
            "appenLexId": "01C1;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "178",
            "key": "\\u01c3",
            "attributes": {
                "voiced": false,
                "place": "retroflex",
                "manner": "click"
            },
            "symbol": "\u01c3",
            "appenLexId": "01C3;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "179",
            "key": "\\u01c2",
            "attributes": {
                "voiced": false,
                "place": "palatal",
                "manner": "click"
            },
            "symbol": "\u01c2",
            "appenLexId": "01C2;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "160",
            "key": "\\u0253",
            "attributes": {
                "voiced": true,
                "place": "bilabial",
                "manner": "implosive"
            },
            "symbol": "\u0253",
            "appenLexId": "0253;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "162",
            "key": "\\u0257",
            "attributes": {
                "voiced": true,
                "place": "alveolar",
                "manner": "implosive"
            },
            "symbol": "\u0257",
            "appenLexId": "0257;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "164",
            "key": "\\u0284",
            "attributes": {
                "voiced": true,
                "place": "palatal",
                "manner": "implosive"
            },
            "symbol": "\u0284",
            "appenLexId": "0284;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "166",
            "key": "\\u0260",
            "attributes": {
                "voiced": true,
                "place": "velar",
                "manner": "implosive"
            },
            "symbol": "\u0260",
            "appenLexId": "0260;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "168",
            "key": "\\u029b",
            "attributes": {
                "voiced": true,
                "place": "uvular",
                "manner": "implosive"
            },
            "symbol": "\u029b",
            "appenLexId": "029B;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "171",
            "key": "\\u0265",
            "attributes": {
                "voiced": true,
                "place": "palatal",
                "manner": "labialised_approximant"
            },
            "symbol": "\u0265",
            "appenLexId": "0265;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "169",
            "key": "\\u028d",
            "attributes": {
                "voiced": false,
                "place": "velar",
                "manner": "labialised_approximant"
            },
            "symbol": "\u028d",
            "appenLexId": "028D;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "170",
            "key": "\\u0077",
            "attributes": {
                "voiced": true,
                "place": "velar",
                "manner": "labialised_approximant"
            },
            "symbol": "w",
            "appenLexId": "0077;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "182",
            "key": "\\u0255",
            "attributes": {
                "voiced": false,
                "place": "palato_alveolar",
                "manner": "palatalised_fricative"
            },
            "symbol": "\u0255",
            "appenLexId": "0255;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "183",
            "key": "\\u0291",
            "attributes": {
                "voiced": true,
                "place": "palato_alveolar",
                "manner": "palatalised_fricative"
            },
            "symbol": "\u0291",
            "appenLexId": "0291;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "175",
            "key": "\\u0267",
            "attributes": {
                "voiced": false,
                "place": "velar",
                "manner": "palatalised_fricative"
            },
            "symbol": "\u0267",
            "appenLexId": "0267;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "",
            "key": "\\u0074\\u0255",
            "attributes": {
                "voiced": false,
                "place": "palato_alveolar",
                "manner": "palatalised_affricate"
            },
            "symbol": "t\u0255",
            "appenLexId": "0074;0255;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "155",
            "key": "\\u006c",
            "attributes": {
                "voiced": true,
                "place": "alveolar",
                "manner": "lateral_approximant"
            },
            "symbol": "l",
            "appenLexId": "006C;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "156",
            "key": "\\u026d",
            "attributes": {
                "voiced": true,
                "place": "retroflex",
                "manner": "lateral_approximant"
            },
            "symbol": "\u026d",
            "appenLexId": "026D;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "157",
            "key": "\\u028e",
            "attributes": {
                "voiced": true,
                "place": "palatal",
                "manner": "lateral_approximant"
            },
            "symbol": "\u028e",
            "appenLexId": "028E;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "158",
            "key": "\\u029f",
            "attributes": {
                "voiced": true,
                "place": "velar",
                "manner": "lateral_approximant"
            },
            "symbol": "\u029f",
            "appenLexId": "029F;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "181",
            "key": "\\u027a",
            "attributes": {
                "voiced": true,
                "place": "alveolar",
                "manner": "lateral_flap"
            },
            "symbol": "\u027a",
            "appenLexId": "027A;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "",
            "key": "\\u0064\\u0292",
            "attributes": {
                "voiced": true,
                "place": "palato_alveolar",
                "manner": "affricate"
            },
            "symbol": "d\u0292",
            "appenLexId": "0064;0292;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "",
            "key": "\\u0064\\u0291",
            "attributes": {
                "voiced": true,
                "place": "palato_alveolar",
                "manner": "palatalised_affricate"
            },
            "symbol": "d\u0291",
            "appenLexId": "0064;0291;"
        },
        {
            "category": "ipa_consonant",
            "ipaNumber": "117",
            "key": "\\u0273",
            "attributes": {
                "voiced": true,
                "place": "retroflex",
                "manner": "nasal"
            },
            "symbol": "\u0273",
            "appenLexId": "0273;"
        },
        // extra affricate
        {
            "category": "ipa_affricate",
            "ipaNumber": "101+126",
            "key": "\\u0070\\u0278",
            "attributes": {
                "voiced": false,
                "place": "bilabial",
                "manner": "affricate"
            },
            "symbol": "p\u0278",    // pɸ
            "appenLexId": null
        },
        {
            "category": "ipa_affricate",
            "ipaNumber": "102+127",
            "key": "\\u0064\\u03b2",
            "attributes": {
                "voiced": true,
                "place": "bilabial",
                "manner": "affricate"
            },
            "symbol": "b\u03b2",    // bβ
            "appenLexId": null
        },
        {
            "category": "ipa_affricate",
            "ipaNumber": "103+130",
            "key": "\\u0074\\u03b8",
            "attributes": {
                "voiced": false,
                "place": "dental",
                "manner": "affricate"
            },
            "symbol": "t\u03b8",   // tθ
            "appenLexId": null
        },
        {
            "category": "ipa_affricate",
            "ipaNumber": "104+131",
            "key": "\\u0064\\u00f0",
            "attributes": {
                "voiced": true,
                "place": "dental",  // dð
                "manner": "affricate"
            },
            "symbol": "d\u00f0",
            "appenLexId": null
        }
    ];
    var _map = {},
        _coord = {},
        v = {};
    angular.forEach(consonants, function (c) {
        var place = c.attributes.place,
            manner = c.attributes.manner,
            voiced = c.attributes.voiced;
        _map[c.key] = c;
        if (!angular.isDefined(_coord[manner])) {
            _coord[manner] = {};
        }
        if (!angular.isDefined(_coord[manner][place])) {
            _coord[manner][place] = {};
        }
        if (!angular.isDefined(_coord[manner][place][voiced])) {
            _coord[manner][place][voiced] = [];
        }
        _coord[manner][place][voiced].push(c);
    });
    v.get = function (key) {
        return _map[key];
    };
    v.getConsonants = function (manner, place, voiced) {
        var rs = [];
        if (manner === 'tap or flap') {
            manner = 'tap';
        } else if (manner == 'lateral fricative') {
            manner = 'lateral_fricative';
        } else if (manner === 'lateral approximant') {
            manner = 'lateral_approximant';
        }
        if (place === 'postalveolar') {
            place = 'palato_alveolar';
        }
        if (angular.isDefined(_coord[manner])) {
            // $log.debug('found manner map', _coord[manner]);
            if (angular.isDefined(_coord[manner][place])) {
                // $log.debug('found place map', _coord[manner][place]);
                if (angular.isDefined(_coord[manner][place][voiced])) {
                    // $log.debug('found voided list', _coord[manner][place][voiced]);
                    rs = _coord[manner][place][voiced];
                }
            } else {
                // $log.warn('place not found', place);
            }
        }
        // if (manner == 'affricate') {
        //     if (place == 'alveolar') {
        //         $log.debug('getConsonants(', manner, place, voiced, ')');
        //         $log.debug('data dict', _coord[manner][place]);
        //         $log.debug('returning ', rs.length, 'consonants');
        //     }
        // }
        return rs;
    };
    v._map = _map;
    v._coord = _coord;
    return v;
});

mod.factory('LinguisticService', function () {
    var c = {
        // PLACES: (11)
        BILABIAL: 'bilabial',
        LABIODENTAL: 'labiodental',
        DENTAL: 'dental',
        ALVEOLAR: 'alveolar',
        POSTALVEOLAR: 'postalveolar',
        RETROFLEX: 'retroflex',
        PALATAL: 'palatal',
        VELAR: 'velar',
        UVULAR: 'uvular',
        PHARYNGEAL: 'pharyngeal',
        GLOTTAL: 'glottal',

        // MANNERS: (9)
        PLOSIVE: 'plosive',
        NASAL: 'nasal',
        TRILL: 'trill',
        TAP_OR_FLAP: 'tap or flap',
        FRICATIVE: 'fricative',
        AFFRICATE: 'affricate',
        LATERAL_FRICATIVE: 'lateral fricative',
        APPROXIMANT: 'approximant',
        LATERAL_APPROXIMANT: 'lateral approximant',

        //
        CLICK: 'click',
        IMPLOSIVE: 'implosive',
        LATERAL_FLAP: 'lateral flap',

        VOICED: 'voiced',
        VOICELESS: 'voiceless',

        PLACES: [],
        MANNERS: [],

        cssClassMap: {}
    }, cmap = c.cssClassMap;

    angular.forEach([c.BILABIAL, c.LABIODENTAL, c.DENTAL, c.ALVEOLAR,
        c.POSTALVEOLAR, c.RETROFLEX, c.PALATAL, c.VELAR, c.UVULAR,
        c.PHARYNGEAL, c.GLOTTAL], function (p) {
        c.PLACES.push(p)
    });
    angular.forEach([c.PLOSIVE, c.NASAL, c.TRILL, c.TAP_OR_FLAP,
        c.FRICATIVE, c.AFFRICATE, c.LATERAL_FRICATIVE, c.APPROXIMANT,
        c.LATERAL_APPROXIMANT], function (m) {
        c.MANNERS.push(m);
    });

    angular.forEach(c.MANNERS, function (m) {
        angular.forEach(c.PLACES, function (p) {
            angular.forEach([c.VOICELESS, c.VOICED], function (v) {
                var key = [m, p, v].join(',');
                cmap[key] = v === c.VOICED ? {'nb': true} : {};
            });
        });
    });
    delete cmap[[c.PLOSIVE, c.PHARYNGEAL, c.VOICED].join(',')].nb;
    delete cmap[[c.PLOSIVE, c.GLOTTAL, c.VOICED].join(',')].nb;
    delete cmap[[c.AFFRICATE, c.GLOTTAL, c.VOICED].join(',')].nb;
    cmap[[c.PLOSIVE, c.ALVEOLAR, c.VOICELESS].join(',')].nb = true;
    cmap[[c.PLOSIVE, c.POSTALVEOLAR, c.VOICELESS].join(',')].nb = true;
    cmap[[c.NASAL, c.ALVEOLAR, c.VOICELESS].join(',')].nb = true;
    cmap[[c.NASAL, c.POSTALVEOLAR, c.VOICELESS].join(',')].nb = true;
    cmap[[c.TRILL, c.ALVEOLAR, c.VOICELESS].join(',')].nb = true;
    cmap[[c.TRILL, c.POSTALVEOLAR, c.VOICELESS].join(',')].nb = true;
    cmap[[c.TAP_OR_FLAP, c.ALVEOLAR, c.VOICELESS].join(',')].nb = true;
    cmap[[c.TAP_OR_FLAP, c.POSTALVEOLAR, c.VOICELESS].join(',')].nb = true;
    cmap[[c.AFFRICATE, c.ALVEOLAR, c.VOICELESS].join(',')].nb = true;
    cmap[[c.LATERAL_FRICATIVE, c.ALVEOLAR, c.VOICELESS].join(',')].nb = true;
    cmap[[c.LATERAL_FRICATIVE, c.POSTALVEOLAR, c.VOICELESS].join(',')].nb = true;
    cmap[[c.APPROXIMANT, c.ALVEOLAR, c.VOICELESS].join(',')].nb = true;
    cmap[[c.APPROXIMANT, c.POSTALVEOLAR, c.VOICELESS].join(',')].nb = true;
    cmap[[c.LATERAL_APPROXIMANT, c.ALVEOLAR, c.VOICELESS].join(',')].nb = true;
    cmap[[c.LATERAL_APPROXIMANT, c.POSTALVEOLAR, c.VOICELESS].join(',')].nb = true;

    cmap[[c.PLOSIVE, c.PHARYNGEAL, c.VOICED].join(',')].na = true;
    cmap[[c.PLOSIVE, c.GLOTTAL, c.VOICED].join(',')].na = true;
    cmap[[c.NASAL, c.PHARYNGEAL, c.VOICELESS].join(',')].na = true;
    cmap[[c.NASAL, c.PHARYNGEAL, c.VOICED].join(',')].na = true;
    cmap[[c.NASAL, c.GLOTTAL, c.VOICELESS].join(',')].na = true;
    cmap[[c.NASAL, c.GLOTTAL, c.VOICED].join(',')].na = true;
    cmap[[c.TRILL, c.VELAR, c.VOICELESS].join(',')].na = true;
    cmap[[c.TRILL, c.VELAR, c.VOICED].join(',')].na = true;
    cmap[[c.TAP_OR_FLAP, c.VELAR, c.VOICELESS].join(',')].na = true;
    cmap[[c.TAP_OR_FLAP, c.VELAR, c.VOICED].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.BILABIAL, c.VOICELESS].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.BILABIAL, c.VOICED].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.LABIODENTAL, c.VOICELESS].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.LABIODENTAL, c.VOICED].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.PHARYNGEAL, c.VOICELESS].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.PHARYNGEAL, c.VOICED].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.GLOTTAL, c.VOICELESS].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.GLOTTAL, c.VOICED].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.PALATAL, c.VOICELESS].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.PALATAL, c.VOICED].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.VELAR, c.VOICELESS].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.VELAR, c.VOICED].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.UVULAR, c.VOICELESS].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.UVULAR, c.VOICED].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.PHARYNGEAL, c.VOICELESS].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.PHARYNGEAL, c.VOICED].join(',')].na = true;
    // cmap[[c.AFFRICATE, c.GLOTTAL, c.VOICELESS].join(',')].na = true;
    cmap[[c.AFFRICATE, c.GLOTTAL, c.VOICED].join(',')].na = true;
    cmap[[c.LATERAL_FRICATIVE, c.BILABIAL, c.VOICELESS].join(',')].na = true;
    cmap[[c.LATERAL_FRICATIVE, c.BILABIAL, c.VOICED].join(',')].na = true;
    cmap[[c.LATERAL_FRICATIVE, c.LABIODENTAL, c.VOICELESS].join(',')].na = true;
    cmap[[c.LATERAL_FRICATIVE, c.LABIODENTAL, c.VOICED].join(',')].na = true;
    cmap[[c.LATERAL_FRICATIVE, c.PHARYNGEAL, c.VOICELESS].join(',')].na = true;
    cmap[[c.LATERAL_FRICATIVE, c.PHARYNGEAL, c.VOICED].join(',')].na = true;
    cmap[[c.LATERAL_FRICATIVE, c.GLOTTAL, c.VOICELESS].join(',')].na = true;
    cmap[[c.LATERAL_FRICATIVE, c.GLOTTAL, c.VOICED].join(',')].na = true;
    cmap[[c.APPROXIMANT, c.GLOTTAL, c.VOICELESS].join(',')].na = true;
    cmap[[c.APPROXIMANT, c.GLOTTAL, c.VOICED].join(',')].na = true;
    cmap[[c.LATERAL_APPROXIMANT, c.BILABIAL, c.VOICELESS].join(',')].na = true;
    cmap[[c.LATERAL_APPROXIMANT, c.BILABIAL, c.VOICED].join(',')].na = true;
    cmap[[c.LATERAL_APPROXIMANT, c.LABIODENTAL, c.VOICELESS].join(',')].na = true;
    cmap[[c.LATERAL_APPROXIMANT, c.LABIODENTAL, c.VOICED].join(',')].na = true;
    cmap[[c.LATERAL_APPROXIMANT, c.PHARYNGEAL, c.VOICELESS].join(',')].na = true;
    cmap[[c.LATERAL_APPROXIMANT, c.PHARYNGEAL, c.VOICED].join(',')].na = true;
    cmap[[c.LATERAL_APPROXIMANT, c.GLOTTAL, c.VOICELESS].join(',')].na = true;
    cmap[[c.LATERAL_APPROXIMANT, c.GLOTTAL, c.VOICED].join(',')].na = true;

    return c;
});

mod.factory('errorLoggerInterceptor', function ($q, $log) {
    return {
        responseError: function (response) {
            $log.error('HTTP Error', response);
            return $q.reject(response);
        }
    };
});

mod.config(function ($httpProvider) {
    // console.log('configuring');
    $httpProvider.interceptors.push('errorLoggerInterceptor');
});

mod.run(function () {
    // console.log('running');
});
