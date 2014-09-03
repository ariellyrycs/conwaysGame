;
/**
 * Created by arobles on 8/31/14.
 */

/* globals describe, it, before, resize, complements */

var chai = chai || require('chai'),
    expect = chai.expect;

describe("resize", function () {
    'use strict';
    describe("Testing calculateElements Function", function () {
        before('setting complements', function () {
            complements.calculateElements.before();
        });
        it("columns", function (done) {
            expect(resize.getNumberColumns()).to.equal(5).to.be.a('number');
            done();
        });
        it("Rows", function (done) {
            expect(resize.getNumberRows()).to.equal(3).to.be.a('number');
            done();
        });
    });
    describe("Testing resizeSection Function", function () {
        before('setting complements', function () {
            complements.resizeSection.before();
        });
        it("columns", function (done) {
            expect(complements.resizeSection.width).to.equal('1200px').to.be.a('string');
            done();
        });
        it("Rows", function (done) {
            expect(complements.resizeSection.height).to.equal('10800px').to.be.a('string');
            done();
        });
    });
    describe("Testing insertElements Function", function () {
        before('setting complements', function () {
            complements.insertElements.before();
        });
        it("Number of Elements Inserted", function (done) {
            expect(complements.insertElements.elementsNumber).to.equal(130).to.be.a('number');
            done();
        });
    });
});
