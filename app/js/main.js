(function (window) {
    'use strict';
    var squareSize = 12,
        screenSize = {},
        numberColumns,
        numberRows;
    var calculateElements = function () {
            numberColumns = Math.floor(screenSize.width / squareSize);
            numberRows = Math.floor(screenSize.height / squareSize);
        },
        getScreenSize = function (Element) {
            screenSize.width = Element.offsetWidth;
            screenSize.height =  Element.offsetHeight;
        },
        resizeSection = function (sectionElement) {
            sectionElement.style.width = (numberColumns * squareSize) + "px";
            sectionElement.style.height = (numberRows * squareSize) + "px";
        },

        insertElements = function (span, section) {
            var newSpan,
                i,
                total = numberColumns * numberRows;

            for(i = 0; i < total; i += 1){
                newSpan = span.cloneNode(true);
                section.appendChild(newSpan);
            }
            resizeSection(section);
        },
        addingElements = function () {
        var span = document.createElement('div'),
            main = document.activeElement.children[0],
            section = main.children[0];
            section.innerHTML = '';
        getScreenSize(main);
        calculateElements();
        insertElements(span, section);
    };
    //TODO : remove or append elements "resizing"
    window.onload = addingElements;
    window.onresize = addingElements;
}(window));