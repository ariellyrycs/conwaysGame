/* globals describe, require, it, beforeEach, afterEach */
var chai = chai || require('chai'),
    expect = chai.expect;

describe("Game Of Life test", function () {
    'use strict';
    describe("Testing calculateElements Function", function () {
        before("before calculateElements", function () {
            game.gameSet(undefined, 16, 4);
            this.position = 0;
            this.toIncrement = [3, 9, 3, 0];
            this.i = 0;
        });
        beforeEach("change params", function () {
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
        });
        afterEach("change position", function () {
            this.position += this.toIncrement[this.i++];
        });
        it("Testing margin top left", function () {
            expect(this.around).to.deep.equal({
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
            expect(this.around).to.deep.equal({
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
            expect(this.around).to.deep.equal({
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
            expect(this.around).to.deep.equal({
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
            game.gameSet({ 6: true, 10: true }, 16, 4);
            this.object = game.detectAround(9).number;
        });
        it("how many elements around it?", function () {
            expect(this.object).to.equal(2).to.be.a('number');
        });
    });
});