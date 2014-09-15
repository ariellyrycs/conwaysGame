;
/**
 * Created by arobles on 8/31/14.
 */
/* globals describe, it, before, resize, testUtilities */

var chai = chai || require('chai'),
    expect = chai.expect;

describe('The number of elements in section element', function () {
    'use strict';
    it('should be total of elements that fit in the current screen', function () {
        expect(resize.numberOfCells).to.equal(testUtilities.totalNumberOfCells);
    });
});
