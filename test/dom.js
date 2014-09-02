
/*
 //var sum = new sum(1,2);
 assert.equal(1, sum(1,2));//Todo manipulate The DOM of this way
 var bodyElement = document.getElementsByTagName("body");
 var node = document.createElement('div');
 node.innerHTML = '<label style="color: red">ARIEL IS CRAZY</label>';
 bodyElement[0].appendChild(node);
 */
'use strict';
var $DOM_Manipulation = {
    calculateElements: function (number, kind) {
        return Math.floor(number[kind] / number);
    }
};