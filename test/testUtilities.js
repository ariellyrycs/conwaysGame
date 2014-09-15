;
/* globals main, gameOfLife, resize */
var testUtilities = (function () {
    'use strict';
    var main = document.activeElement.children[0],
        lastRow = resize.numberOfColumns * (resize.numberOfRows - 1),
        lastColumn = resize.numberOfColumns - 1,
        cornerCells = {
            0: {
                0: lastRow + lastColumn,
                1: lastRow,
                2: lastRow + 1,
                3: lastColumn,
                4: 0,
                5: 1,
                6: resize.numberOfColumns * 2 - 1,
                7: resize.numberOfColumns,
                8: resize.numberOfColumns + 1
            },
            1: {
                0: resize.numberOfCells - 2,
                1: resize.numberOfCells - 1,
                2: lastRow,
                3: lastColumn - 1,
                4: lastColumn,
                5: 0,
                6: lastColumn * 2,
                7: resize.numberOfColumns * 2 - 1,
                8: resize.numberOfColumns
            },
            2: {
                0: lastRow - 1,
                1: resize.numberOfColumns * (resize.numberOfRows - 2),
                2: resize.numberOfColumns * (resize.numberOfRows - 2) + 1,
                3: resize.numberOfCells - 1,
                4: lastRow,
                5: lastRow + 1,
                6: resize.numberOfColumns - 1,
                7: 0,
                8: 1
            },
            3: {
                0: lastRow - 2,
                1: lastRow - 1,
                2: resize.numberOfColumns * (resize.numberOfRows - 2),
                3: resize.numberOfCells - 2,
                4: resize.numberOfCells - 1,
                5: lastRow,
                6: lastColumn - 1,
                7: lastColumn,
                8: 0
            }
        },
        clearChangesAndActiveElements = function () {
            gameOfLife.resetChanges();
            gameOfLife.resetElements();
        },
        changeCells = function (cellsToApply) {
            var length = cellsToApply.length,
                i;
            for(i = 0; i < length; i += 1) {
                gameOfLife.numberCellsAround(cellsToApply[i]);
            }
        },
        positionToTest = function (cornerNumber, indexGroupOfElementToTest) {
            var position = {
                0: [cornerCells[cornerNumber][0], cornerCells[cornerNumber][2], cornerCells[cornerNumber][4], cornerCells[cornerNumber][6], cornerCells[cornerNumber][8]],
                1: [cornerCells[cornerNumber][1], cornerCells[cornerNumber][3], cornerCells[cornerNumber][4], cornerCells[cornerNumber][5], cornerCells[cornerNumber][7]]
            };
            clearChangesAndActiveElements();
            this.changeCells(position[indexGroupOfElementToTest]);
            gameOfLife.loopActiveElements();
        },
        positionResults = function (cornerNumber, typeOfResults) {
            var elements = { 0: {}, 1: {} };
            if(typeOfResults === 0) {
                elements[0][cornerCells[cornerNumber][1]] = true;
                elements[0][cornerCells[cornerNumber][3]] = true;
                elements[0][cornerCells[cornerNumber][5]] = true;
                elements[0][cornerCells[cornerNumber][7]] = true;
                elements[0][cornerCells[cornerNumber][0]] = false;
                elements[0][cornerCells[cornerNumber][2]] = false;
                elements[0][cornerCells[cornerNumber][4]] = false;
                elements[0][cornerCells[cornerNumber][6]] = false;
                elements[0][cornerCells[cornerNumber][8]] = false;
            }
            if(typeOfResults === 1) {
                elements[1][cornerCells[cornerNumber][0]] = true;
                elements[1][cornerCells[cornerNumber][2]] = true;
                elements[1][cornerCells[cornerNumber][6]] = true;
                elements[1][cornerCells[cornerNumber][8]] = true;
                elements[1][cornerCells[cornerNumber][4]] = false;
            }
            return elements;
        },
        clickElement = function () {
            var lengthElements = arguments.length,
                i,
                element = [];
            for(i = 0; i < lengthElements; i += 1) {
                element[i] = document.getElementById(arguments[i]);
                element[i].click();
            }
            return element;
    };
    return {
        //general
        clearChangesAndActiveElements: clearChangesAndActiveElements,
        //resize
        totalNumberOfCells : main.children[0].children.length,
        //gameOfLife
        changeCells : changeCells,
        positionToTest: positionToTest,
        positionResults: positionResults,
        cornerCells: cornerCells,
        //gameView
        clickElement: clickElement
    }
}());