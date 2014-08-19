var game = (function () {
    /*globals resize*/
    'use strict';
    var rules = {
        dead : [0, 1, 4, 5, 6, 7, 8],
        alive : 2,
        born: 3
        },
        _changesToDo = {},
        _activeElements = {},
        activate = function (array ,element) {
            array[element] = true;
        },
        detectAround = function (idElement) {
            var around = {
                    0: [idElement - resize.columns - 1],
                    1: [idElement - resize.columns],
                    2: [idElement - resize.columns + 1],
                    3: [idElement - 1],
                    4: [parseInt(idElement) + 1],
                    5: [parseInt(idElement) + resize.columns - 1],
                    6: [parseInt(idElement) + resize.columns],
                    7: [parseInt(idElement) + resize.columns + 1]
                },
                i,
                _activeArrayAroundNumber = 0;
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
            /*debugger;
            console.log(_changesToDo[item]);
            console.log(_activeElements);
            (_changesToDo[item]) ? activate(_activeElements, item) : delete _activeElements[item];
            console.log(_activeElements);*/
            console.log(typeof _changesToDo[item]);
            if(_changesToDo[item]) {
                activate(_activeElements, item);
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
            loopActive: loopActive,
            numberAround : function (idCurrentElement) {
                activate(_activeElements, idCurrentElement);
            },
            changes: _changesToDo,
            merge: loopThroughChanges
        };

}());