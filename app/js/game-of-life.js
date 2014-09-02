var game = (function () {
    /*globals resize, promise*/
    'use strict';
    var rules = {
        dead : [0, 1, 4, 5, 6, 7, 8],
        alive : 2,
        born: 3
        },
        _changesToDo = {},
        _activeElements = {},
        total = resize.total,
        columns = resize.columns,
        activate = function (array ,element) {
            array[element] = true;
        },
        margin = function (idElement, around) {
            var firstColumn = Math.floor(idElement / columns) * columns,
                lastColumn = firstColumn + (columns - 1),
                lastRow = total - columns;
            if(parseInt(idElement) === firstColumn) {
                around[0][0] += columns;
                around[3][0] += columns;
                around[5][0] += columns;
            }
            if(parseInt(idElement) === lastColumn){
                around[2][0] -= columns;
                around[4][0] -= columns;
                around[7][0] -= columns;
            }
            if(idElement < columns) {
                around[0][0] += total;
                around[1][0] += total;
                around[2][0] += total;
            }
            if(idElement >= lastRow) {
                around[5][0] -= total;
                around[6][0] -= total;
                around[7][0] -= total;
            }
        },
        detectAround = function (idElement) {
            var around = {
                    0: [idElement - columns - 1],
                    1: [idElement - columns],
                    2: [idElement - columns + 1],
                    3: [idElement - 1],
                    4: [parseInt(idElement) + 1],
                    5: [parseInt(idElement) + columns - 1],
                    6: [parseInt(idElement) + columns],
                    7: [parseInt(idElement) + columns + 1]
                },
                i,
                _activeArrayAroundNumber = 0;
            margin(idElement, around);
            for(i = 0; i <= 7; i += 1) {
                if(_activeElements.hasOwnProperty(around[i])) {
                    around[i][1] = true;
                    _activeArrayAroundNumber += 1;
                } else {
                    around[i][1] = false;
                }
            }
            return {
                number: _activeArrayAroundNumber,
                aroundId: around
            };
        },
        detectNextAround = function (aroundId) {
            var i,
                nextAround;
            for(i = 0; i <= 7; i += 1) {
                if(!aroundId[i][1]) {
                    nextAround = detectAround(aroundId[i][0]);
                    if(nextAround.number === rules.born) {
                        activate(_changesToDo, aroundId[i][0]);
                    }
                }
            }
        },
        mergeNewItems = function (item) {
            if(_changesToDo[item]) {
                _activeElements[item] = true;
            } else {
                delete _activeElements[item];
            }
        },
        loopThroughChanges = function () {
            var item;
            for(item in _changesToDo){
                if(_changesToDo.hasOwnProperty(item)) {
                    mergeNewItems(item);
                }
            }
            _changesToDo = {};
        },
        killElements = function (number, item) {
            if(rules.dead.indexOf(number) !== -1) {
                _changesToDo[item] = false;
            }
        },
        loopActive = function () {
            var item,
                itemsAround,
                finished = new promise.Promise();
            for(item in _activeElements) {
                if(_activeElements.hasOwnProperty(item)) {
                    itemsAround = detectAround(item);
                    killElements(itemsAround.number, item);
                    detectNextAround(itemsAround.aroundId);
                }
            }
            finished.done(null);
            return finished;
        };
        return {
            /* //for testing purpuses
            gameSet: function (_active, _total, _column) {
                _activeElements =  _active || _activeElements;
                total = _total || total;
                columns = _column || columns;
            },
            margin: margin,
            detectAround: detectAround,*/





            loopActive: loopActive,
            numberAround : function (idCurrentElement) {
                activate(_activeElements, idCurrentElement);
            },
            changes: function () {
                return _changesToDo;
            },
            merge: loopThroughChanges
        };
}());