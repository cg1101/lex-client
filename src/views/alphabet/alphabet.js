var mod = angular.module('at.views.alphabet', []);

mod.controller('AlphabetCtrl', function ($scope, alphabetId, $q, Lex, $log, Linguist, $filter, $uibModal) {

    var usedKeys = {};

    (function (delay) {
        usedKeys = {};
        $scope.context = {isLoading: true};
        $scope.title = '';
        $scope.alphabet = null;
        $scope.phones = [];
        $q.all({
            alphabet: Lex.getAlphabet(alphabetId),
            _timer: Lex.getFakeResponse(delay)
        }).then(function (result) {
            var alphabet = result.alphabet.data.alphabet,
                phones = [];

            angular.forEach(alphabet.graphemes, function (g) {
                var symbol = Linguist.lookup(g.appenKey),
                    ph = angular.extend({}, symbol, g);

                if (angular.isUndefined(usedKeys[ph.key])) {
                    phones.push(ph);
                }
                usedKeys[ph.key] = ph;
            });

            $scope.title = 'Alphabet #' + alphabet.alphabetId + ': ' + alphabet.name;
            $scope.alphabet = alphabet;
            $scope.phones = phones;
            $log.debug('phones defined in alphabet #' + alphabetId, phones);
        }).finally(function () {
            delete $scope.context.isLoading;
        });
    })(0);

    this.getPlaceOptions = function () {
        return Linguist.getConsonantPlaces();
    };
    this.getMannerOptions = function (pulmonic) {
        return Linguist.getConsonantManners(pulmonic);
    };
    this.getCssClasses = function () {
        return '';
    };
    this.toggleSelection = function (key) {
        var ph;
        if (angular.isDefined(usedKeys[key])) {
            usedKeys[key].removed = !usedKeys[key].removed;
        } else {
            ph = Linguist.get(key);
            usedKeys[key] = ph;
            $scope.phones.push(ph);
        }
    };
    this.getMatchedPhones = function (manner, place, voice) {
        return Linguist.getMatchedConsonants(manner, place, voice);
    };

    this.isInUse = function (key) {
        return angular.isDefined(usedKeys[key]) && !usedKeys[key].removed;
    };
    this.dumpKeys = function (key) {
        var rs = [];
        angular.forEach(usedKeys, function (ph, key) {
            if (ph.type.search(/consonant,/)) {
                rs.push(key);
            }
        });
        console.log($filter('orderBy')(rs));
    };

    //////////////////////////////////////////////////////////////////////
    this.getPhoneCount = function (phoneType) {
        var hit = $scope.phones;
        switch (phoneType) {
            case 'vowel':
            case 'consonant':
            case 'suprasegmental':
            case 'diacritic':
                hit = $filter('filter')(hit, function (ph) {
                    return ph.type === phoneType && !ph.removed;
                }, true);
                break;
            default:
                hit = $filter('filter')(hit, function (ph) {
                    return !ph.removed;
                }, true);
        }
        return hit.length;
    };
    this.getRuleCount = function (type) {
        if (!$scope.alphabet) {
            return 0;
        }
        switch (type) {
            case 'phonology':
            case 'stress':
            case 'syllabification':
            case 'vowelisation':
                if (angular.isDefined($scope.alphabet[type + 'Rules'])) {
                    return $scope.alphabet[type + 'Rules'].length;
                }
        }
        return 0;
    };

    //////////////////////////////////////////////////////////////////////
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
    //////////////////////////////////////////////////////////////////////

    this.addPhone = function () {
        $uibModal.open({
            templateUrl: '/static/html/dialogs/dlg_add_phone/dlg_add_phone.html',
            resolve: {
                phones: function () {
                    return $scope.phones;
                },
                usedKeys: function () {
                    return usedKeys;
                }
            },
            controller: 'DlgAddPhoneCtrl as ctrl'
        });
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

    function getTop(key) {
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
    }

    function getLeft(key) {
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
    }

    $scope.getStyle = function (key) {
        var top = getTop(key),
            left = getLeft(key);
        return 'position:absolute;top:' + top + 'px;left:' + left + 'px;';
        // $log.debug('getStyle is running');
        // return 'background-color:lightyellow;';
    }
});


mod.config(function ($stateProvider) {
    $stateProvider.state('alphabet', {
        url: '/alphabets/{alphabetId:[0-9]+}',
        templateUrl: '/static/html/views/alphabet/alphabet.html',
        resolve: {
            alphabetId: function ($stateParams) {
                return $stateParams.alphabetId;
            }
        },
        controller: 'AlphabetCtrl as ctrl'
    });
});
