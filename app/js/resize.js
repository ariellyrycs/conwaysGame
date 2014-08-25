var resize = (function (window) {
    'use strict';
    var squareSize = 12,
        screenSize = {},
        numberColumns = 0,
        numberRows = 0,
        calculateElements = function () {
            numberColumns = Math.floor(screenSize.width / squareSize);
            numberRows = Math.floor(screenSize.height / squareSize);
        },
        getScreenSize = function (element) {
            screenSize.width = element.offsetWidth;
            screenSize.height =  element.offsetHeight;
        },
        resizeSection = function (sectionElement) {
            sectionElement.style.width = (numberColumns * squareSize) + "px";
            sectionElement.style.height = (numberRows * squareSize) + "px";
        },
        insertElements = function (div, section) {
            var newSpan,
                i,
                total = numberColumns * numberRows;
            for(i = 0; i < total; i += 1) {
                div.setAttribute('id', i.toString());
                newSpan = div.cloneNode(true);
                section.appendChild(newSpan);
            }
            resizeSection(section);
        },
        addingElements = function () {
        var div = document.createElement('div'),
            main = document.activeElement.children[0],
            section = main.children[0];
            section.innerHTML = '';
        getScreenSize(main);
        calculateElements();
        insertElements(div, section);
    };
    //TODO : remove or append elements "resizing"
    addingElements();
    window.onresize = addingElements;
    return {
        columns: numberColumns,
        rows: numberRows,
        total: numberColumns * numberRows
    };
}(window));
function sum(a, b ) {
    return  a + b;
}