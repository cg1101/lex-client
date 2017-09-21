var mod = angular.module('lex.services.linguist', []);

mod.factory('Linguist', function (Lex, $log, $filter) {
    const placeOptions = [
        {label: 'Bilabial', tag: ['bilabial']},
        {label: 'Labiodental', tag: ['labiodental']},
        {label: 'Dental', tag: ['dental']},
        {label: 'Alveolar', tag: ['alveolar']},
        {label: 'Postalveolar', tag: ['palato_alveolar']},
        {label: 'Retroflex', tag: ['retroflex']},
        {label: 'Palatal', tag: ['palatal']},
        {label: 'Velar', tag: ['velar']},
        {label: 'Uvular', tag: ['uvular']},
        {label: 'Pharyngeal', tag: ['pharyngeal']},
        {label: 'Epiglottal', tag: ['epiglottal']},
        {label: 'Glottal', tag: ['glottal']}
    ], mannerOptions = [
        {label: 'Plosive', pulmonic: true, tag: ['plosive']},
        {label: 'Nasal', pulmonic: true, tag: ['nasal']},
        {label: 'Trill', pulmonic: true, tag: ['trill']},
        {label: 'Tap or Flap', pulmonic: true, tag: ['tap', 'flap']},
        {label: 'Fricative', pulmonic: true, tag: ['fricative']},
        {label: 'Affricate', pulmonic: true, tag: ['affricate']},
        {label: 'Lateral Fricative', pulmonic: true, tag: ['lateral_fricative']},
        {label: 'Approximant', pulmonic: true, tag: ['approximant']},
        {label: 'Lateral Approximant', pulmonic: true, tag: ['lateral_approximant']},
        {label: 'Click', pulmonic: false, tag: ['click']},
        {label: 'Implosive', pulmonic: false, tag: ['implosive']},
        {label: 'Ejective', pulmonic: false, tag: ['ejective']},
        {label: 'Labialised Approximant', pulmonic: true, tag: ['labialised_approximant']},
        {label: 'Lateral Flap', pulmonic: true, tag: ['lateral_flap']},
        {label: 'Palatalised affricate', pulmonic: true, tag: ['palatalised_affricate']},
        {label: 'Palatalised fricative', pulmonic: true, tag: ['palatalised_fricative']}

    ];

    // $log.debug('LexConfig factory is running');
    var linguist = {},
        symbols = [],
        byIpaNumber = {}, ipaNumberCount = 0,
        byAppenKey = {}, appenKeyCount = 0,
        byKey = {}, keyCount = 0,

        byType = {
            consonant: [],
            vowel: [],
            suprasegmental: [],
            diacritic: []
        },

        consonantMatrix = {},
        tagMapping = {};

    angular.forEach(mannerOptions, function (m) {
        var row = consonantMatrix[m.label] = {};
        angular.forEach(m.tag, function (t) {
            tagMapping[t] = angular.extend({}, {manner: m.label});
        });
        angular.forEach(placeOptions, function (p) {
            row[p.label] = {false: [], true: []};
        });
    });
    angular.forEach(placeOptions, function (p) {
        angular.forEach(p.tag, function (t) {
            var x = new Object();
            tagMapping[t] = angular.extend(x, {place: p.label});
        });
    });

    tagMapping['voiceless'] = {voice: false};
    tagMapping['voiced'] = {voice: true};
    // $log.debug('tagMapping', tagMapping);
    // $log.debug('consonantMatrix', consonantMatrix);

    Lex.getSymbols().then(function (response) {
        var rs = response.data.symbols;
        // $log.debug('loaded ' + rs.length + ' symbols');
        angular.forEach(rs, function (symbol) {
            symbols.push(symbol);
            if (!symbol.key) {
                $log.error('key not found', key);
            } else {
                byKey[symbol.key] = symbol;
                keyCount++;
            }
            // TODO: populate appenKey if needed
            if (symbol.appenKey) {
                appenKeyCount++;
                byAppenKey[symbol.appenKey] = symbol;
            }
            if (symbol.ipaNumber) {
                ipaNumberCount++;
                byIpaNumber[symbol.ipaNumber] = symbol;
            }
            if (angular.isUndefined(byType[symbol.type])) {
                throw new Error('invalid symbol type: ' + symbol.type);
            }
            var tags = (symbol.tags || []).slice(1);
            if (symbol.type === 'consonant' || symbol.type === 'vowel') {
                symbol.label = tags.join(' ').replace('_', '-');
            }
            byType[symbol.type].push(symbol);
        });
        angular.forEach(byType.consonant, function (c) {
            var hit = [], result = {};
            angular.forEach(c.tags, function (t) {
                if (angular.isDefined(tagMapping[t])) {
                    hit.push(tagMapping[t]);
                } else if (t !== 'consonant') {
                    $log.warn('found unknown tag', t);
                }
            });
            angular.forEach(hit, function (extra) {
                result = angular.extend({}, result, extra);
            });
            consonantMatrix[result.manner][result.place][result.voice].push(c);
        });
        // $log.debug('symbols loaded', symbols);
        // $log.debug('ipaNumberCount', ipaNumberCount, byIpaNumber);
        // $log.debug('appenKeyCount', appenKeyCount, byAppenKey);
        // $log.debug('keyCount', keyCount, byKey);
    });
    linguist.getConsonants = function () {
        return byType.consonant;
    };
    linguist.getDiacritics = function () {
        return byType.diacritic;
    };
    linguist.getVowels = function () {
        return byType.vowel;
    };

    linguist.get = function (key) {
        var s = byKey[key];
        if (angular.isDefined(s)) {
            return s;
        }
    };
    linguist.lookup = function (appenKey) {
        var symbol = byAppenKey[appenKey], aks,
            symbols = [], missing = [];
        if (!appenKey) {
            return null;
        }
        if (angular.isDefined(symbol)) {
            return symbol;
        }
        aks = appenKey.replace(/;0?$/, '').split(';');
        // $log.debug('aks', aks);
        angular.forEach(aks, function (v) {
            var k = v + ';';
            if (angular.isDefined(byAppenKey[k])) {
                symbols.push(byAppenKey[k]);
            } else {
                missing.push(k);
            }
        });
        if (missing.length) {
            $log.error('missing', missing);
            throw new Error('symbol not found for ' + missing.join(','));
        }
        var types = [];
        angular.forEach(symbols, function (s) {
            types.push(s.type);
        });
        types = types.join(',');
        var newSymbol = {
            key: symbols.map(function (s) {
                return s.key;
            }).join(''),
            appenKey: appenKey,
            ipaNumber: symbols.map(function (s) {
                return s.ipaNumber;
            }).join('+'),
            symbol: symbols.map(function (s) {
                return s.symbol;
            }).join(''),
            xSampa: symbols.map(function (s) {
                return s.xSampa;
            }).join(''),
            appenSampa: null,
            tags: []
        };
        if (types.match(/^consonant,/)) {
            newSymbol.type = 'consonant';
        } else if (types.match(/^vowel/)) {
            newSymbol.type = 'vowel';
        } else {
            newSymbol.type = 'unknown';
        }
        // Now add newly created symbol to internal data holders
        if (newSymbol.ipaNumber) {
            byIpaNumber[newSymbol.ipaNumber] = newSymbol;
        }
        byKey[newSymbol.key] = newSymbol;
        byAppenKey[newSymbol.appenKey] = newSymbol;
        // $log.debug('returning symbol of ' + appenKey, newSymbol);
        return newSymbol;
    };

    linguist.getConsonantManners = function (pulmonic) {
        return $filter('filter')(mannerOptions, {pulmonic: pulmonic});
    };
    linguist.getConsonantPlaces = function () {
        return placeOptions;
    };
    linguist.getMatchedConsonants = function (manner, place, voice) {
        var hit = [];
        if (place !== null) {
            return consonantMatrix[manner.label][place.label][voice];
        }
        angular.forEach(consonantMatrix[manner.label], function (d) {
            hit = hit.concat(d[false]);
            hit = hit.concat(d[true]);
        });
        return hit;
    };
    return linguist;
});
