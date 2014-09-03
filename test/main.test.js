; /**
 * Created by arobles on 8/31/14.
 */
     /* globals describe, require, it, chai, before, main, beforeEach, complements */
var chai = chai || require('chai'),
    expect = chai.expect;
describe('testing main file', function () {
    'use strict';
    describe('active box', function () {
        before('before boxClick', function () {
            this.styleElement = complements.activeBox.boxClick();
        });
        it('testing item activated', function () {
            expect(this.styleElement).to.equal('red');
        });
    });
    describe('Status', function () {
        before('before status', function () {
            complements.statusBox.status();
        });
        it('Status: show', function (done) {
            complements.statusBox.showStatus();
            setTimeout(function () {
                expect(complements.statusBox.span.style.left).to.equal('-5px');
                done();
            }, 1000);
        });
        it('Status: hide', function (done) {
            complements.statusBox.hideStatus();
            setTimeout(function () {
                expect(complements.statusBox.span.style.left).to.equal('-70px');
                done();
            }, 1000);
        });
    });
});