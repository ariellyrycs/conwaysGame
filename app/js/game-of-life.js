;
var gameOfLife = (function () {
    /*globals resize, promise */
    'use strict';
    var rules = {
        numberOfLiveCellsRequiredToDie : [0, 1, 4, 5, 6, 7, 8],
        numberOfLiveCellsRequiredToLive : 2,
        numberOfLiveCellsRequiredToBeBorn: 3
        },
        _changesToDo = {},
        _activeElements = {},
        total = resize.numberOfCells,
        columns = resize.numberOfColumns,
        renameMaxNumberOfNeighbors = 7,
        activateElementInArray = function (array, element) {
            array[element] = true;
        },
        identifyBorderElements = function (idElement, neighbors) {
            var firstColumn = Math.floor(idElement / columns) * columns,
                lastColumn = firstColumn + (columns - 1),
                lastRow = total - columns;
            if(parseInt(idElement, 10) === firstColumn) {
                neighbors[0][0] += columns;
                neighbors[3][0] += columns;
                neighbors[5][0] += columns;
            }
            if(parseInt(idElement, 10) === lastColumn){
                neighbors[2][0] -= columns;
                neighbors[4][0] -= columns;
                neighbors[7][0] -= columns;
            }
            if(idElement < columns) {
                neighbors[0][0] += total;
                neighbors[1][0] += total;
                neighbors[2][0] += total;
            }
            if(idElement >= lastRow) {
                neighbors[5][0] -= total;
                neighbors[6][0] -= total;
                neighbors[7][0] -= total;
            }
        },
        identifyNeighborElements = function (idElement) {
            var neighborElements = {
                    0: [idElement - columns - 1],
                    1: [idElement - columns],
                    2: [idElement - columns + 1],
                    3: [idElement - 1],
                    4: [parseInt(idElement, 10) + 1],
                    5: [parseInt(idElement, 10) + columns - 1],
                    6: [parseInt(idElement, 10) + columns],
                    7: [parseInt(idElement, 10) + columns + 1]
                },
                i,
                numberOfAliveNeighbors = 0;
            identifyBorderElements(idElement, neighborElements);
            for(i = 0; i <= 7; i += 1) {
                if(_activeElements.hasOwnProperty(neighborElements[i])) {
                    neighborElements[i][1] = true;
                    numberOfAliveNeighbors += 1;
                } else {
                    neighborElements[i][1] = false;
                }
            }
            return {
                numberOfAliveNeighbors: numberOfAliveNeighbors,
                neighborElements: neighborElements
            };
        },
        identifyNextNeighbor = function (neighborId) {
            var i,
                nextAround;
            for(i = 0; i <= renameMaxNumberOfNeighbors; i += 1) {
                if(!neighborId[i][1]) {
                    nextAround = identifyNeighborElements(neighborId[i][0]);
                    if(nextAround.numberOfAliveNeighbors === rules.numberOfLiveCellsRequiredToBeBorn) {
                        activateElementInArray(_changesToDo, neighborId[i][0]);
                    }
                }
            }
        },
        activateOrKillCells = function (cellNumber) {
            if(_changesToDo[cellNumber]) {
                _activeElements[cellNumber] = true;
            } else {
                delete _activeElements[cellNumber];
            }
        },
        loopThroughChanges = function () {
            var item,
                finished = new promise.Promise();
            for(item in _changesToDo){
                if(_changesToDo.hasOwnProperty(item)) {
                    activateOrKillCells(item);
                }
            }
            finished.done(null);
            return finished;
        },
        killElements = function (number, item) {
            if(rules.numberOfLiveCellsRequiredToDie.indexOf(number) !== -1) {
                _changesToDo[item] = false;
            }
        },
        loopActiveElements = function () {
            var item,
                neighborItems,
                finishedApplyingGameRules = new promise.Promise();
            for(item in _activeElements) {
                if(_activeElements.hasOwnProperty(item)) {
                    neighborItems = identifyNeighborElements(item);
                    killElements(neighborItems.numberOfAliveNeighbors, item);
                    identifyNextNeighbor(neighborItems.neighborElements);
                }
            }
            finishedApplyingGameRules.done(null);
            return finishedApplyingGameRules;
        };
        return {
            //main process
            loopActiveElements: loopActiveElements,
            //it runs a function that activate current element
            numberCellsAround : function (idCurrentElement) {
                activateElementInArray(_activeElements, idCurrentElement);
            },
            //object that contains the current changes to apply
            changes: function () {
                return _changesToDo;
            },
            active: function () {
                return _activeElements;
            },

            resetChanges: function () {
                _changesToDo = {};
            },
            resetElements: function () {
                _activeElements = {};
            },
            //changes to apply
            merge: loopThroughChanges
        };
}());