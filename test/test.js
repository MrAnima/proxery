const { expect } = require('chai');
const fs = require('fs');
const jsdom = require('jsdom-global');
const util = require('util');

const HTML = fs.readFileSync(__dirname + '/sample.html', {encoding: 'utf8'});

describe("proxery", function() {

    jsdom(HTML);

    let proxery = require('../')();

    it("should return a proxery object", function() {
        const proxyNames = ['class', 'id', 'name', 'tag'];

        expect(proxery).to.have.keys(...proxyNames);
    });

    describe('proxery.class', function() {
        it('should return 3 elements', function() {
            let buttons = proxery.class.btn;
            expect(buttons).to.have.length(3);
        });
        it('should return 1 element with innerHTML == "Button3"', function() {
            let primaryButtons = proxery.class['btn-primary'];
            expect(primaryButtons[0]).to.have.property('innerHTML', "Button3");
        });
    });

    describe("proxery.id", function() {
        it('should return a div element with 3 children', function() {
            let el = proxery.id.container;
            expect(el)
                .to.be.instanceof(HTMLDivElement).and
                .to.have.property('childElementCount', 3);
        });
    });

});