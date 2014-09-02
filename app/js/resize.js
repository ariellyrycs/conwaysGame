
var resize = (function (window) {
    'use strict';
    var squareSize = 12,
        screenSize = {},
        numberColumns = 0,
        numberRows = 0,
        getScreenSize = function (element) {
            screenSize.width = element.offsetWidth;
            screenSize.height =  element.offsetHeight;
        },
        calculateElements = function () {
            numberColumns = Math.floor(screenSize.width / squareSize);
            numberRows = Math.floor(screenSize.height / squareSize);
        },
        resizeSection = function (sectionElement) {
            sectionElement.style.width = (numberColumns * squareSize) + "px";
            sectionElement.style.height = (numberRows * squareSize) + "px";
        },
        insertElements = function (div, section) {
            var newSpan,
                i,
                total = numberColumns * numberRows;
            for (i = 0; i < total; i += 1) {
                div.setAttribute('id', i.toString());
                newSpan = div.cloneNode(true);
                section.appendChild(newSpan);
            }
            return section;

        },
        addingElements = function () {
            var div = document.createElement('div'),
                main = document.activeElement.children[0],
                section = main.children[0],
                newSection;
            section.innerHTML = '';
            getScreenSize(main);
            calculateElements();
            newSection = insertElements(div, section);
            resizeSection(newSection);
        };
    //TODO : remove or append elements "resizing"
    addingElements();
    window.onresize = addingElements;
    return {
        /*//for testing purpuses
        setSquareSize: function (setVar) {
            squareSize = setVar;
        },
        setScreenSize: function (setVar) {
            screenSize = setVar;
        },
        setNumberColumns: function (setVar) {
            numberColumns = setVar;
        },
        setNumberRows: function (setVar) {
            numberRows = setVar;
        },
        getNumberColumns: function () {
            return numberColumns;
        },
        getNumberRows: function () {
            return numberRows;
        },
        calculateElements: calculateElements,
        resizeSection: resizeSection,
        insertElements: insertElements,*/

        columns: numberColumns,
        rows: numberRows,
        total: numberColumns * numberRows
    };
}(window));
