/**
 * Created by arobles on 8/31/14.
 */

/* globals describe, it, before, after, beforeEach, afterEach, resize, $DOM_Manipulation  */

var chai = chai || require('chai'),
    expect = chai.expect;

describe("resize", function () {
    'use strict';
    describe("Testing calculateElements Function", function () {

        before('setting complements', function () {
            resize.setSquareSize(12);
            resize.setScreenSize({ height:36, width:60});
            resize.calculateElements();
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
            var element = document.getElementsByTagName('section')[0];
            resize.setSquareSize(12);
            resize.setNumberColumns(100);
            resize.setNumberRows(900);
            resize.resizeSection(element);
            this.width = element.style.width;
            this.height = element.style.height;
        });
        it("columns", function (done) {
            expect(this.width).to.equal('1200px').to.be.a('string');
            done();
        });
        it("Rows", function (done) {
            expect(this.height).to.equal('10800px').to.be.a('string');
            done();
        });
    });
    describe("Testing insertElements Function", function () {
        before('setting complements', function () {
            var element = document.createElement('section');
            var div = document.createElement('div');
            resize.setNumberColumns(13);
            resize.setNumberRows(10);
            this.elementsNumber = resize.insertElements(div, element).childElementCount;
        });
        it("Number of Elements Inserted", function (done) {
            expect(this.elementsNumber).to.equal(130).to.be.a('number');
            done();
        });
    });
});
