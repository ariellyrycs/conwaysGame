;
/* globals describe, it, before, beforeEach, afterEach, testUtilities, gameOfLife, resize, after */
var chai = chai || require('chai'),
    expect = chai.expect;

describe('elements changes', function () {
    'use strict';
    before('', function () {
        this.i = 0;
    });

    afterEach('changing corner', function () {
        this.i += 1;
    });

    it('should have the capability to continue in the other side . (top-left Corner)', function (done) {
        console.log(this.i);
        testUtilities.positionToTest(this.i, 0);
        expect(gameOfLife.changes()).to.deep.equal(testUtilities.positionResults(this.i, 0)[0]);
        testUtilities.positionToTest(this.i, 1);
        expect(gameOfLife.changes()).to.deep.equal(testUtilities.positionResults(this.i, 1)[1]);
        done();
    });

    it('should have the capability to continue in the other side. (top-right Corner)', function (done) {
        testUtilities.positionToTest(this.i, 0);
        expect(gameOfLife.changes()).to.deep.equal(testUtilities.positionResults(this.i, 0)[0]);
        testUtilities.positionToTest(this.i, 1);
        expect(gameOfLife.changes()).to.deep.equal(testUtilities.positionResults(this.i, 1)[1]);
        done();
    });

    it('should have the capability to continue in the other side. (bottom-left Corner)', function (done) {
        testUtilities.positionToTest(this.i, 0);
        expect(gameOfLife.changes()).to.deep.equal(testUtilities.positionResults(this.i, 0)[0]);
        testUtilities.positionToTest(this.i, 1);
        expect(gameOfLife.changes()).to.deep.equal(testUtilities.positionResults(this.i, 1)[1]);
        done();
    });

    it('should have the capability to continue in the the other side. (bottom-right Corner)', function (done) {
        testUtilities.positionToTest(this.i, 0);
        expect(gameOfLife.changes()).to.deep.equal(testUtilities.positionResults(this.i, 0)[0]);
        testUtilities.positionToTest(this.i, 1);
        expect(gameOfLife.changes()).to.deep.equal(testUtilities.positionResults(this.i, 1)[1]);
        done();
    });

    after('clearElements', testUtilities.clearChangesAndActiveElements);
});