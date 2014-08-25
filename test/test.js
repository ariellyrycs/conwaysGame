/*globals describe, require, it*/
var chai = chai || require('chai');
var assert = chai.assert;
describe('asda', function() {
    describe('#inddsdfdsfexOf()', function(){
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(0));
        });
        it('shound pass', function() {
            assert.equal(-1, [1,2,3].indexOf(0));
            /*
            //var sum = new sum(1,2);
            assert.equal(1, sum(1,2));//Todo manipulate The DOM of this way
            var bodyElement = document.getElementsByTagName("body");
            var node = document.createElement('div');
            node.innerHTML = '<label style="color: red">ARIEL IS CRAZY</label>';
            bodyElement[0].appendChild(node);
*/
        });
        it('sum', function () {
            assert.equal(3, sum(0, 2));
        });
    });
});
