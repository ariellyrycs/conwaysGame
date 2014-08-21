/**
 * Created by arobles on 8/15/14.
 */
/*globals game, promise */
(function () {
    'use strict';
    var boxes = document.getElementsByTagName('div'),
        control = document.getElementsByClassName('control'),
        i,
        color = {
            dead: 'darkolivegreen',
            alive: 'red'
        },
        intervalTime = 50,
        loopThroughActive,
        statusActive = false,
        startingPoint = -70,
        transitionTime,
        /*change Elements color*/
        update = function () {
            var item,
                changes = game.changes(),
                changeStatus,
                finished = new promise.Promise();

            for(item in changes) {
                if(changes.hasOwnProperty(item)) {
                    changeStatus = document.getElementById(item);
                    if(changeStatus === null) {
                        continue;
                    }
                    if(changes[item]) {
                        changeStatus.style.backgroundColor = color.alive;
                    } else {
                        changeStatus.style.backgroundColor = color.dead;
                    }
                }
            }
            finished.done(null);
            return finished;
        },
        setLoop = function () {
            loopThroughActive = setInterval(function () {
                game.loopActive().then(function () {
                    update().then(game.merge);
                });
            }, intervalTime);
        },
        boxClick = function () {
            var idCurrentElement = this.getAttribute('id');
            game.numberAround(idCurrentElement);
            document.getElementById(idCurrentElement).style.backgroundColor = color.alive;
        },
        /*status button*/
        changeStatus = function () {
            if(statusActive) {
                clearInterval(loopThroughActive);
                control[0].style.backgroundPosition = '-150px -298px';
                statusActive = false;
            } else {
                setLoop();
                control[0].style.backgroundPosition = '-80px -6px';
                statusActive = true;
            }

        },
        showStatus = function () {
            this.style.left =  startingPoint + "px";
            startingPoint = startingPoint + 5;
            if(startingPoint >= 0) {
                clearInterval(transitionTime);
            }
        },
        hideStatus = function () {
            this.style.left =  startingPoint + "px";
            startingPoint = startingPoint - 5;
            if(startingPoint <= -70) {
                clearInterval(transitionTime);
            }
        },
        displayStatus = function (that, callback) {
            setTimeout(function () {
                clearInterval(transitionTime);
                transitionTime = setInterval(callback.bind(that), 30);
            }, 500);
        };
    /*events*/
    control[0].onmouseout = function () {
        displayStatus(this, hideStatus);
    };
    control[0].onmouseover = function () {
        displayStatus(this, showStatus);
    };
    control[0].onclick = changeStatus;
    for (i = 0; i < boxes.length; i += 1) {
        boxes[i].addEventListener('click', boxClick, false);
    }
}());