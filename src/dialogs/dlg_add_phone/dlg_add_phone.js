var mod = angular.module('at.dialogs.dlg-add-phone', []);

mod.controller('DlgAddPhoneCtrl', function ($scope, $log, Linguist, phones, usedKeys, $filter) {

    $scope.title = 'Add Phone';
    $scope.tabIndex = 0;
    $scope.formInput = {
        primary: null,
        secondary: null,
        buf: [],
        symbol: null
    };

    $scope.phones = phones;
    $scope.usedKeys = usedKeys;

    // $log.debug('passed in phones', phones);
    // $log.debug('passed in vowels', $filter('filter')(phones, {type: 'vowel'}));
    // $log.debug('passed in consonants', $filter('filter')(phones, {type: 'consonant'}));

    $scope.primarySymbols = [];
    $scope.secondarySymbols = [];

    var consonants = $filter('filter')(Linguist.getConsonants(), function (c) {
            return c.symbol.length === 1;
        }, true),
        vowels = $filter('filter')(Linguist.getVowels(), function (v) {
            return v.symbol.length === 1;
        }, true),
        diacritics = Linguist.getDiacritics(),
        consonantDiacritics = $filter('filter')(diacritics, function (ph) {
            return ['\\u02bc', '\\u0325', '\\u032c', '\\u02b0', '\\u0324',
                '\\u0330', '\\u033c', '\\u032a', '\\u033a', '\\u033b',
                '\\u02b7', '\\u02b2', '\\u02e0', '\\u02e4', '\\u207f',
                '\\u02e1', '\\u031a', '\\u0334', '\\u031d', '\\u031e',
                '\\u0329', '\\u2098'].includes(ph.key);
        }, true),
        vowelDiacritics = diacritics.slice();

    function updateSymbolList() {
        if ($scope.tabIndex === 0) {
            $scope.primarySymbols = vowels.slice();
            $scope.secondarySymbols = vowelDiacritics.slice();
        } else {
            $scope.primarySymbols = consonants.slice();
            $scope.secondarySymbols = consonantDiacritics.slice();
        }
    }

    $scope.$watch('form', function (form) {
        if (form) {
            // TODO: install conditional validators
        }
    });
    $scope.$watch('tabIndex', function () {
        var formInput = $scope.formInput;
        formInput.primary = null;
        formInput.secondary = null;
        formInput.buf.length = 0;
        formInput.symbol = null;
        updateSymbolList();
    });
    // $scope.$watchGroup(['tabIndex'], updateSymbolList);

    $scope.$watchCollection('formInput.buf', function () {
        var buf = $scope.formInput.buf || [];
        var appenKey = buf.map(function (s) {
            return s.appenKey;
        }).join('');
        var symbol = Linguist.lookup(appenKey);
        $log.debug('lookedup symbol', symbol);
        $scope.formInput.symbol = symbol;
    });

    this.addPrimary = function () {
        var formInput = $scope.formInput;
        if (formInput.primary) {
            formInput.buf.push(formInput.primary);
            formInput.primary = null;
        }
    };
    this.addSecondary = function () {
        var formInput = $scope.formInput;
        if (formInput.secondary) {
            formInput.buf.push(formInput.secondary);
            formInput.secondary = null;
        }
    };
    this.addPhone = function () {
        window.alert('added new phone: ' + $scope.formInput.symbol.symbol);
    };
    this.isInUse = function () {
        var formInput = $scope.formInput;
        if (formInput.symbol) {
            if (angular.isDefined(usedKeys[formInput.symbol.key])) {
                return true;
            }
        }
        return false;
    };
    this.okay = function () {
        if ($scope.form && $scope.form.$valid) {
            $scope.$close(true);
        }
    };
});
