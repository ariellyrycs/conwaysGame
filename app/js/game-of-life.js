var game = (function () {
    /*globals resize*/
    'use strict';
    var rules = {
        dead : [1, 4, 5, 6, 7, 8],
        alive : 2,
        born: 3,
        start: 2
        },
        _changesToDo = {},
        _activeElements = {},
        activate = function (array ,element) {
            array[element] = true;
        },
        remove = function (array, element) {
            array.splice(element, 1);
        },
        applyRules = function (content, number) {
            if(rules.dead.hasOwnProperty(number)) {
                _changesToDo[number] = false;
            }
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
            //return number;
            //applyRules(exist, number);
        },
        detectNextAround = function (aroundId) {
            var i,
                nextAround;
            for(i = 0; i <= 7; i += 1) {
                if(!aroundId[i][1]) {
                    nextAround = detectAround(aroundId[i][0]);
                    if(nextAround.number >= rules.born) {
                        activate(_changesToDo, aroundId[i][0]);
                    }
                }
            }
        },
        mergeNewItems = function () {
            var item;
            for(item in _changesToDo){
                if(_changesToDo.hasOwnProperty(item)) {
                    _activeElements[item] = _changesToDo[item];
                }
            }
            game._changesToDo = {};
        };
        return {
            myFunctionReference : function (idCurrentElement) {
                activate(_activeElements, idCurrentElement);
                //remove(idCurrentElement);
                /*this.style.backgroundColor = rules.alive.color;
                 detectAround.call(idCurrentElement);
                 addCurrent(idCurrentElement);*/
            },
            numberAround : function (idCurrentElement) {
                var infoAround;
                activate(_activeElements, idCurrentElement);
                infoAround = detectAround(idCurrentElement);
                detectNextAround(infoAround.aroundId);
                return infoAround.number >= rules.start;
            },
            changes: _changesToDo,
            merge: mergeNewItems
        };
}());