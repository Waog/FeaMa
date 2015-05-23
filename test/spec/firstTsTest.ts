/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe('User Model Unit Tests:',() => {

    describe('2 + 4',() => {
        it('should be 6',(done) => {
            expect(2 + 4).to.equals(6);
            done();
        });

        it('should not be 7',(done) => {
            expect(2 + 4).to.not.equals(7);
            done();
        });

        it('TODO: has nothing to do with GithubIssues',(done) => {
            var simpleMath = new Calculations.SimpleMath();
            expect(simpleMath.addTwoNumbers(2, 6)).to.equals(8);
            done();
        });

    });
});