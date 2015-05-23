/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />

/**
 * Globals
 */
var expect = chai.expect;

/**
 * Unit tests
 */
describe('Calculations Unit Tests:',() => {

    describe('positive test',() => {
        it('should never fail',(done) => {
            expect(1).to.equals(1);
            done();
        });
    });

    describe('SimpleMath',() => {
        it('should return 2 for 1 + 1',(done) => {
            var simpleMath = new Calculations.SimpleMath();
            expect(simpleMath.addTwoNumbers(1, 1)).to.equals(2);
            done();
        });
    });
});