;
/* globals main, game, resize */

var complements = (function () {
    'use strict';
    return {
        activeBox: {
            boxClick: function () {
                var id = (2).toString();
                this.div = document.createElement('div');
                this.div.setAttribute('id', id);
                main.boxClick.call(this.div);
                return document.getElementById(id).style.backgroundColor;
            }
        },
        statusBox: {
            status: function () {
                this.span = document.getElementsByClassName('control')[0];
            },
            showStatus: function () {
                var interval = setInterval(main.showStatus.bind(this.span), 50);
                main.set(interval, undefined);
            },
            hideStatus: function () {
                var interval
                main.set(undefined, -5);
                interval = setInterval(main.hideStatus.bind(this.span), 50);
                main.set(interval, undefined);
            }
        },
        elementsAround: {
            set: function () {
                game.gameSet(undefined, 16, 4);
                this.position = 0;
                this.toIncrement = [3, 9, 3, 0];
                this.i = 0;
            },
            beforeEach: function () {
                this.around = {
                    0: [-5 + this.position],
                    1: [-4 + this.position],
                    2: [-3 + this.position],
                    3: [-1 + this.position],
                    4: [1 + this.position],
                    5: [3 + this.position],
                    6: [4 + this.position],
                    7: [5 + this.position]
                };
                game.margin(0  + this.position, this.around);
            },
            afterEach: function () {
                this.position += this.toIncrement[this.i];
                this.i += 1;
            }
        },
        detectAround: {
            set: function () {
                game.gameSet({ 6: true, 10: true }, 16, 4);
                this.object = game.detectAround(9).number;
            }
        },
        calculateElements: {
            before: function () {
                resize.setSquareSize(12);
                resize.setScreenSize({ height:36, width:60});
                resize.setScreenSize({ height:36, width:60});
                resize.calculateElements();
            }
        },
        resizeSection:{
            before: function () {
                var element = document.getElementsByTagName('section')[0];
                resize.setSquareSize(12);
                resize.setNumberColumns(100);
                resize.setNumberRows(900);
                resize.resizeSection(element);
                this.width = element.style.width;
                this.height = element.style.height;
            }
        },
        insertElements: {
            before: function () {
                var element = document.createElement('section');
                var div = document.createElement('div');
                resize.setNumberColumns(13);
                resize.setNumberRows(10);
                this.elementsNumber = resize.insertElements(div, element).childElementCount;
            }
        }
    };
}());
