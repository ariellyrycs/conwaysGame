;
/* globals describe, it, before, beforeEach, afterEach, complements */
var chai = chai || require('chai'),
    expect = chai.expect;

describe("Game Of Life test", function () {
    'use strict';
    describe("Testing calculateElements Function", function () {
        before("before calculateElements", function () {
            complements.elementsAround.set();
        });
        beforeEach("change params", function () {
            complements.elementsAround.beforeEach();
        });
        afterEach("change position", function () {
            complements.elementsAround.afterEach();
        });
        it("Testing margin top left", function () {
            expect(complements.elementsAround.around).to.deep.equal({
                0:[15],
                1:[12],
                2:[13],
                3:[3],
                4:[1],
                5:[7],
                6:[4],
                7:[5]
            });
        });
        it("Testing margin top right", function () {
            expect(complements.elementsAround.around).to.deep.equal({
                0:[14],
                1:[15],
                2:[12],
                3:[2],
                4:[0],
                5:[6],
                6:[7],
                7:[4]
            });
        });
        it("Testing margin bottom left", function () {
            expect(complements.elementsAround.around).to.deep.equal({
                0:[11],
                1:[8],
                2:[9],
                3:[15],
                4:[13],
                5:[3],
                6:[0],
                7:[1]
            });
        });
        it("Testing margin bottom right", function () {
            expect(complements.elementsAround.around).to.deep.equal({
                0:[10],
                1:[11],
                2:[8],
                3:[14],
                4:[12],
                5:[2],
                6:[3],
                7:[0]
            });
        });
    });
    describe("Testing detectAround function.", function () {
        before("before calculateElements", function () {
            complements.detectAround.set();
        });
        it("how many elements around it?", function () {
            expect(complements.detectAround.object).to.equal(2).to.be.a('number')
        });
    });
});