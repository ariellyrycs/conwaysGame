; /**
 * Created by arobles on 8/31/14.
 */
     /* globals describe, require, it, chai, before, main, beforeEach,  testUtilities, after, afterEach */
var chai = chai || require('chai'),
    expect = chai.expect;
describe('DOM', function () {
    'use strict';
    describe('change color of the box', function () {
        before('click element', function () {
            this.element = testUtilities.clickElement('5')[0];
        });
        it('should change color of the clicked box', function () {
            expect(this.element.style.backgroundColor).to.equal('red');
        });
        after('clearElements', testUtilities.clearChangesAndActiveElements);
    });
    describe('Animation', function () {
        before('set environment', function (done) {
            this.elementsToApply = ['7', '2', '34'];
            this.element = testUtilities.clickElement.apply(this, this.elementsToApply);
            this.statusElement = document.getElementsByClassName('control')[0];
            done();
        });
        beforeEach('start', function (done) {
            this.statusElement.click();
            done();
        });
        it('should follow established rules', function () {
            setTimeout(function () {
                expect(this.element[1].style.backgroundColor).to.equal('darkolivegreen');
                expect(this.element[1].style.backgroundColor).to.equal('darkolivegreen');
                expect(this.element[2].style.backgroundColor).to.equal('darkolivegreen');
            }.bind(this), 1500);
        });
        after('stop', function (){
            this.statusElement.click();
        });
    });
});
