var mod = angular.module('lex.components',[]);

mod.controller('PhoneCtrl', function ($scope, $log) {
    // $log.debug('PhoneCtrl');
    // $log.warn('IPASymbolMap', IPASymbolMap);
    // $log.debug('found input char', $scope.identifier);

    $scope.selected = false;
    this.setParent = function () {
        // $log.debug('setting parent for scope', $scope.$id, $scope.identifier, $scope.char);
        return null;
    };
    this.getTooltip = function () {
        return 'IPA Number: ' + $scope.identifier + '\n' + 'IPA Symbol:' + $scope.char + '\n' +
            'X-SAMPA: n/a';
    };
    this.toggleSelection = function () {
        // $log.debug('toggle selection');
        $scope.selected = !$scope.selected;
        // $log.debug('iAttrs', $scope.iAttrs);
        if ($scope.selected) {
            $scope.iAttrs.$addClass('in-use');
        } else {
            $scope.iAttrs.$removeClass('in-use');
        }
    };
    $scope.$watch('mode', function (mode) {
        // $log.debug('mode changed to', mode);

        var ph = $scope.phones, x, contents;
        // $log.debug('ph is set to ', ph, 'mode is', mode);
        try {
            switch (mode) {
                case 'x-sampa':
                    contents = ph.map(function (phone) {
                        var xsampa = phone.xsampa;
                        if (typeof xsampa === 'string') {
                            return xsampa;
                        } else if (typeof xsampa === 'object') {
                            return xsampa[0];
                        } else {
                            return 'n/a';
                        }
                    }).join(' ');
                    break;
                case 'ipa-number':
                    contents = ph.map(function (phone) {
                        return phone.ipaNumber;
                    }).join('+');
                    break;
                default:
                    contents = ph.map(function (phone) {
                        // $log.debug('phone is', phone);
                        return phone.ipaSymbol;
                    }).join('');
                    break;
            }
        } catch (e) {
            $log.error('get error', e);
            contents = 'n/a';
        }
        $scope.content = contents;
        // $log.debug('content changed to', $scope.content);
    });
});

mod.directive('atPhone', function (IPASymbolMap, $log) {
    return {
        restrict: 'EA',
        scope: true,
        require: ['atPhone', '?atPhoneChart'],
        templateUrl: '../html/phone.html',
        link: function (scope, iElement, iAttrs, ctrls) {
            // $log.debug('link is running for ', iElement);
            var ctrl = ctrls[0], chartCtrl = ctrls[1],
                identifier = iAttrs.atPhone;

            scope.iAttrs = iAttrs;
            scope.identifier = identifier;
            scope.phones = identifier.split(/\+/).map(function (i) {
                return IPASymbolMap[i];
            });
            ctrl.setParent(chartCtrl);
        },
        controller: 'PhoneCtrl as ctrl'
    }
});

mod.controller('ChartCtrl', function ($scope) {
    $scope.mode = 'symbol';
});

mod.directive('atPhoneChart', function () {
    return {
        restrict: 'E',
        templateUrl: '../html/chart.html',
        controller: 'ChartCtrl as ctrl'
    };
});

mod.controller('AddConsonantCtrl', function ($scope, LinguisticService) {
    const L = LinguisticService;
    $scope.title = 'Add Consonant with Diacritic';
    $scope.formInput = {};
    this.getManners = function () {
        return L.MANNERS;
    };
    this.getDiacritics = function (forConsonant) {
        return ['_h', '_>', '_J'];
    };
});

mod.controller('AddDiphthongCtrl', function ($scope) {
    $scope.title = 'Add Diphthong / Triphthong';
});

mod.controller('AddPhoneCtrl', function ($scope, Linguist, $filter, phones) {
    $scope.title = 'Add A Phone';
    $scope.phones = phones;
    $scope.getConsonants = function () {
        var rs = $filter('filter')($scope.phones, function (ph) {
            return ph.type == 'consonant';
        }, true);
        rs = $filter('orderBy')(rs, function (ph) {
            return ph.symbol;
        });
        return rs;
    };
    $scope.getVowels = function () {
        var rs = $filter('filter')($scope.phones, function (ph) {
            return ph.type == 'vowel';
        }, true);
        rs = $filter('orderBy')(rs, function (ph) {
            return ph.symbol;
        });
        return rs;
    };
    $scope.getOthers = function () {
        var rs = $filter('filter')($scope.phones, function (ph) {
            return ph.type !== 'consonant' && ph.type !== 'vowel';
        }, true);
        rs = $filter('orderBy')(rs, function (ph) {
            return ph.symbol;
        });
        return rs;
    };

    this.iterConsonants = function () {
        var rs = Linguist.getConsonants();
        return $filter('filter')(rs, function (s) {
            return s.symbol.length == 1;
        }, true);
    };
    this.iterDiacritics = function (forVowel) {
        return Linguist.getDiacritics();
    };
    this.iterVowels = function () {
        var rs = Linguist.getVowels();
        return $filter('filter')(rs, function (s) {
            return s.symbol.length == 1;
        }, true);
        return rs;
    };
});

mod.controller('ConsonantPaneCtrl', function ($scope, $filter, $log,
                                              LinguisticService, $uibModal,
                                              Consonants, Linguist) {

    $log.debug('ConsonantPaneCtrl, $scope.$id', $scope.$id);

    $scope.mode = 'symbol';
    $scope.modeOptions = [
        {label: 'Symbol', value: 'symbol'},
        {label: 'IPA Number', value: 'ipaNumber'},
        {label: 'X-SAMPA', value: 'xSampa'},
        {label: 'ABH-SAMPA', value: 'sampa'}
    ];

    const L = LinguisticService, C = Consonants;
    $log.debug('L is', L, 'C is', C);
    var places = [], manners = [];
    angular.forEach(L.MANNERS, function (manner) {
        manners.push({label: manner});
    });
    angular.forEach(L.PLACES, function (place) {
        places.push({label: place});
    });

    this.getManners = function () {
        var r = $filter('filter')(manners, function (i) {
            return angular.isDefined(i.visible) ? i.visible : true;
        }, true);
        // $log.debug('rows', r);
        return r;
    };
    this.getPlaces = function () {
        var r = $filter('filter')(places, function (i) {
            return angular.isDefined(i.visible) ? i.visible : true;
        }, true);
        // $log.debug('cols', r);
        return r;
    };
    this.getCssClasses = function (manner, place, voiced) {
        var p = place.label, m = manner.label,
            v = voiced ? L.VOICED : L.VOICELESS,
            key = [m, p, v].join(',');
        return L.cssClassMap[key];
    };
    this.addConsonant = function () {
        $uibModal.open({
            templateUrl: '/src/html/add-consonant.html',
            controller: 'AddConsonantCtrl as ctrl',
            resolve: {}
        }).result.then(function (r) {
            $log.debug('result is', r);
        })
    };
    this.addDiphthong = function () {
        $uibModal.open({
            templateUrl: '/src/html/add-diphthong.html',
            controller: 'AddDiphthongCtrl as ctrl',
            resolve: {}
        }).result.then(function (r) {
            $log.debug('result is', r);
        });
    };


    this.setMode = function (mode) {
        $scope.mode = mode;
    };
    this.addPhone = function () {
        $uibModal.open({
            templateUrl: '/src/html/add-phone.html',
            controller: 'AddPhoneCtrl as ctrl',
            // size: 'lg',
            resolve: {
                phones: function () {
                    return $scope.phones;
                }
            }
        }).result.then(function (r) {
            $log.debug('result is', r);
        });

    };

    this.getPhoneKeys = function (manner, place, voiced) {
        var v = voiced ? 'voiced' : 'voiceless',
            key = [manner, place, v];
        if (L.cssClassMap[key].na)
            return [];
        var cc = C.getConsonants(manner, place, voiced);
        rs = [];
        angular.forEach(cc, function (c) {
            rs.push(c.key);
        });
        // $log.debug(manner, place, voiced, 'cc=', cc);
        return rs;
    };

    $scope.isInUse = function (key) {
        var found = false,
            alphabet = $scope.alphabet || {graphemes: []}, ph;
        for (var i = 0; i < alphabet.graphemes.length; i++) {
            ph = alphabet.graphemes[i];
            // $log.debug('checking', ph);
            if (ph.key == key) {
                found = true;
                break;
            }
        }
        return found;
    };

    getConsonantKeys = function () {
        var consonants = [
            '\\u006e', // n
            '\\u2c71', // ⱱ
            '\\u0283', // ʃ
            '\\u0284', // ʄ
            '\\u0288', // ʈ
            '\\u028b', // ʋ
            '\\u028d', // ʍ
            '\\u028e', // ʎ
            '\\u0291', // ʑ
            '\\u0062', // b
            '\\u0063', // c
            '\\u0064', // d
            '\\u0066', // f
            '\\u0068', // h
            '\\u006a', // j
            '\\u006b', // k
            '\\u006c', // l
            '\\u0070', // p
            '\\u0071', // q
            '\\u0072', // r
            '\\u0073', // s
            '\\u0074', // t
            '\\u0076', // v
            '\\u0077', // w
            '\\u0078', // x
            '\\u007a', // z
            '\\u00f0', // ð
            '\\u0127', // ħ
            '\\u014b', // ŋ
            '\\u01c0', // ǀ
            '\\u01c1', // ǁ
            '\\u01c2', // ǂ
            '\\u01c3', // ǃ
            '\\u0253', // ɓ
            '\\u0255', // ɕ
            '\\u0256', // ɖ
            '\\u0257', // ɗ
            '\\u025f', // ɟ
            '\\u0260', // ɠ
            '\\u0261', // ɡ
            '\\u0262', // ɢ
            '\\u0263', // ɣ
            '\\u0265', // ɥ
            '\\u0266', // ɦ
            '\\u026c', // ɬ
            '\\u026d', // ɭ
            '\\u026e', // ɮ
            '\\u0270', // ɰ
            '\\u0271', // ɱ
            '\\u0272', // ɲ
            '\\u0273', // ɳ
            '\\u0278', // ɸ
            '\\u0279', // ɹ
            '\\u027a', // ɺ
            '\\u027b', // ɻ
            '\\u027d', // ɽ
            '\\u027e', // ɾ
            '\\u0280', // ʀ
            '\\u0281', // ʁ
            '\\u006d', // m
            '\\u00e7', // ç
            '\\u0267', // ɧ
            '\\u0274', // ɴ
            '\\u0282', // ʂ
            '\\u0290', // ʐ
            '\\u02a1', // ʡ
            '\\u03b2', // β
            '\\u03b8', // θ
            '\\u03c7', // χ
            '\\u0292', // ʒ
            '\\u0294', // ʔ
            '\\u0295', // ʕ
            '\\u0298', // ʘ
            '\\u0299', // ʙ
            '\\u029b', // ʛ
            '\\u029c', // ʜ
            '\\u029d', // ʝ
            '\\u029f', // ʟ
            '\\u02a2'  // ʢ
        ];
    };

    $scope.getVowelKeys = function () {
        return [
            '\\u0065',        // e
            '\\u0069',        // i
            '\\u0075',        // u
            '\\u0251',        // ɑ
            '\\u025c',        // ɜ
            '\\u006f',        // o
            '\\u0079',        // y
            '\\u00e6',        // æ
            '\\u00f8',        // ø
            '\\u0153',        // œ
            '\\u0250',        // ɐ
            '\\u0252',        // ɒ
            '\\u0254',        // ɔ
            '\\u0258',        // ɘ
            '\\u0061',        // a
            '\\u0259',        // ə
            '\\u025b',        // ɛ
            '\\u025e',        // ɞ
            '\\u0264',        // ɤ
            '\\u0268',        // ɨ
            '\\u026a',        // ɪ
            '\\u026f',        // ɯ
            '\\u0275',        // ɵ
            '\\u0276',        // ɶ
            '\\u0289',        // ʉ
            '\\u028a',        // ʊ
            '\\u028c',        // ʌ
            '\\u028f'         // ʏ

        ];

    };
    $scope.getTop = function (key) {
        var y;
        switch (key) {
            case '\\u0069':        // i
            case '\\u0079':        // y
            case '\\u0268':        // ɨ
            case '\\u0289':        // ʉ
            case '\\u026f':        // ɯ
            case '\\u0075':        // u
                y = 0;
                break;
            case '\\u026a':        // ɪ
            case '\\u028f':        // ʏ
            case '\\u028a':        // ʊ
                y = 1;
                break;
            case '\\u0065':        // e
            case '\\u00f8':        // ø
            case '\\u0258':        // ɘ
            case '\\u0275':        // ɵ
            case '\\u0264':        // ɤ
            case '\\u006f':        // o
                y = 2;
                break;
            case '\\u0259':        // ə
                y = 3;
                break;
            case '\\u025b':        // ɛ
            case '\\u0153':        // œ
            case '\\u025c':        // ɜ
            case '\\u025e':        // ɞ
            case '\\u028c':        // ʌ
            case '\\u0254':        // ɔ
                y = 4;
                break;
            case '\\u00e6':        // æ
            case '\\u0250':        // ɐ
                y = 5;
                break;
            case '\\u0061':        // a
            case '\\u0276':        // ɶ
            case '\\u0251':        // ɑ
            case '\\u0252':        // ɒ
                y = 6;
                break;
        }
        return y * 36 + 38;
    };
    $scope.getLeft = function (key) {
        var x, y, z;
        switch (key) {
            case '\\u0069':        // i
                x = 0;
                y = 0;
                z = -1;
                break;
            case '\\u0079':        // y
                x = 0;
                y = 0;
                z = 1;
                break;
            case '\\u0268':        // ɨ
                x = 2;
                y = 0;
                z = -1;
                break;
            case '\\u0289':        // ʉ
                x = 2;
                y = 0;
                z = 1;
                break;
            case '\\u026f':        // ɯ
                x = 4;
                y = 0;
                z = -1;
                break;
            case '\\u0075':        // u
                x = 4;
                y = 0;
                z = 1;
                break;
            case '\\u026a':        // ɪ
                x = 1;
                y = 1;
                z = -1;
                break;
            case '\\u028f':        // ʏ
                x = 1;
                y = 1;
                z = 1;
                break;
            case '\\u028a':        // ʊ
                x = 3;
                y = 1;
                z = 1;
                break;
            case '\\u0065':        // e
                x = 0;
                y = 2;
                z = -1;
                break;
            case '\\u00f8':        // ø
                x = 0;
                y = 2;
                z = 1;
                break;
            case '\\u0258':        // ɘ
                x = 2;
                y = 2;
                z = -1;
                break;
            case '\\u0275':        // ɵ
                x = 2;
                y = 2;
                z = 1;
                break;
            case '\\u0264':        // ɤ
                x = 4;
                y = 2;
                z = -1;
                break;
            case '\\u006f':        // o
                x = 4;
                y = 2;
                z = 1;
                break;
            case '\\u0259':        // ə
                x = 2;
                y = 3;
                z = 0;
                break;
            case '\\u025b':        // ɛ
                x = 0;
                y = 4;
                z = -1;
                break;
            case '\\u0153':        // œ
                x = 0;
                y = 4;
                z = 1;
                break;
            case '\\u025c':        // ɜ
                x = 2;
                y = 4;
                z = -1;
                break;
            case '\\u025e':        // ɞ
                x = 2;
                y = 4;
                z = 1;
                break;
            case '\\u028c':        // ʌ
                x = 4;
                y = 4;
                z = -1;
                break;
            case '\\u0254':        // ɔ
                x = 4;
                y = 4;
                z = 1;
                break;
            case '\\u00e6':        // æ
                x = 0;
                y = 5;
                z = -1;
                break;
            case '\\u0250':        // ɐ
                x = 2;
                y = 5;
                z = 0;
                break;
            case '\\u0061':        // a
                x = 0;
                y = 6;
                z = -1;
                break;
            case '\\u0276':        // ɶ
                x = 0;
                y = 6;
                z = 1;
                break;
            case '\\u0251':        // ɑ
                x = 4;
                y = 6;
                z = -1;
                break;
            case '\\u0252':        // ɒ
                x = 4;
                y = 6;
                z = 1;
                break;
        }
        return 80 + 144 * y / 6 + (288 - 144 * y / 6) * x / 4 + 20 * z;
    };


    $scope.getStyle = function (key) {
        var top = $scope.getTop(key),
            left = $scope.getLeft(key);
        return 'position:absolute;top:' + top + 'px;left:' + left + 'px;';
        // $log.debug('getStyle is running');
        // return 'background-color:lightyellow;';
    }
});

mod.directive('atConsonantPane', function ($log) {
    return {
        restrict: 'EA',
        scope: {
            alphabet: '=',
            phones: '='
        },
        require: ['atConsonantPane'],
        templateUrl: '../html/consonant-pane.html',
        link: function (scope, iElement, iAttrs, ctrls) {
            // $log.debug('atConsonantPane.link', iElement);
            scope.iElement = iElement;
            scope.iAttrs = iAttrs;
        },
        controller: 'ConsonantPaneCtrl as ctrl'
    }
});
