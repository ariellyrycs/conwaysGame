;
var resize = (function (window) {
    'use strict';
    var squareSize = 12, //12px
        screenSize = {},
        numberOfColumns = 0,
        numberOfRows = 0,
        setScreenSize = function (element) {
            screenSize.width = element.offsetWidth;
            screenSize.height =  element.offsetHeight;
        },
        calculateNumberOfCells = function () {
            numberOfColumns = Math.floor(screenSize.width / squareSize);
            numberOfRows = Math.floor(screenSize.height / squareSize);
        },
        resizeSection = function (sectionElement) {
            sectionElement.style.width = (numberOfColumns * squareSize) + 'px';
            sectionElement.style.height = (numberOfRows * squareSize) + 'px';
        },
        insertElements = function (div, section) {
            var newSpan,
                i,
                total = numberOfColumns * numberOfRows;
            for (i = 0; i < total; i += 1) {
                div.setAttribute('id', i.toString());
                newSpan = div.cloneNode(true);
                section.appendChild(newSpan);
            }
        },
        addingElements = function () {
            var div = document.createElement('div'),
                main = document.activeElement.children[0],
                section = main.children[0];
            section.innerHTML = '';
            setScreenSize(main);
            calculateNumberOfCells();
            insertElements(div, section);
            resizeSection(section);
        };
    //TODO : remove or append elements "resizing"
    addingElements();
    window.onresize = addingElements;
    return {
        numberOfColumns: numberOfColumns,
        numberOfRows: numberOfRows,
        numberOfCells: numberOfColumns * numberOfRows
    };
}(window));