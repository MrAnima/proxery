const { expect } = require('chai');
const fs = require('fs');
const jsdom = require('jsdom-global');
const util = require('util');

const HTML = fs.readFileSync(__dirname + '/sample.html', {encoding: 'utf8'});

describe("param-case", function() {

    const paramCase = require('../param-case');

    [
        ['helloWorld', 'hello-world'],
        ['HelloWorld', 'hello-world'],
        ['loremIpsumDolorSitAmet', 'lorem-ipsum-dolor-sit-amet']
    ]
    .forEach(([test, expected]) => {
        it(`should return ${expected}`, function() {
            expect(paramCase(test)).to.equal(expected);
        });
    });
    

});

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
        it('should handle camelCased strings as param-cased ones"', function() {
            let primaryButtons = proxery.class.btnPrimary;
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
