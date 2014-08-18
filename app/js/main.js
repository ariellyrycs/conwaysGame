/**
 * Created by arobles on 8/15/14.
 */
/*globals game, promise */
(function () {
    'use strict';
    var boxes = document.getElementsByTagName('div'),
        i,
        color = {
            dead: 'darkolivegreen',
            alive: 'red'
        },
        update = function () {
            var item,
                changes = game.changes,
                changeStatus,
                finished = new promise.Promise();
            for(item in changes) {
                if(changes.hasOwnProperty(item)) {
                    changeStatus = document.getElementById(item);
                    if(item) {
                        changeStatus.style.backgroundColor = color.alive;
                    } else {
                        changeStatus.style.backgroundColor = color.dead;
                    }
                }
            }
            finished.done(null);
            return finished;
        },
        boxClick = function () {
            var idCurrentElement = this.getAttribute('id');
            if(game.numberAround(idCurrentElement)) {
                game.myFunctionReference(idCurrentElement);
            }
            console.log('2323');
            update().then(game.merge);
            document.getElementById(idCurrentElement).style.backgroundColor = color.alive;
        };
    for (i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", boxClick, false);
    }
}());