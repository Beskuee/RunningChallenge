let Running = require('../models/runningChallengeModel'); //imports the Pokemon model.
const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');

const controller = require('../controllers/runningChallengeController'); //imports the Pokemon model.

describe('::getAverageKmRanByDate', () => {
    it('should be a function', () => {
        expect(controller.getAverageKmRanByDate).to.be.a('Function');
    });

    it('should throw error if no req in request', () => {
        expect(() => controller.getAverageKmRanByDate()).to.throw('Il manque la donnee ' +
            'startDate ou stopDate pour la requete');
    });

    it('should throw error if request body is empty in request', () => {
        const req = {};
        expect(() => controller.getAverageKmRanByDate(req)).to.throw('Il manque la donnee ' +
            'startDate ou stopDate pour la requete');
    });

    it('should throw error if request body missing property in request', () => {
        const req = {};
        _.set(req, 'body', {startDate: "1984-10-10"})
        expect(() => controller.getAverageKmRanByDate(req)).to.throw('Il manque la donnee ' +
            'startDate ou stopDate pour la requete');
    });

    // it('should throw error if request body missing property in request', () => {
    //     const req = {};
    //     _.set(req, 'body', {startDate : "1984-10-10", stopDate : "1984-10-10"})
    //     console.log('req', req.body)
    //     return controller.getAverageKmRanByDate(req)
    //         .then(()=> {
    //             expect(_checkDateFormat()).to.be.call(2);
    //         })
    // });
    //
    // it('should throw error if date format is incorrect', () => {
    //     const date = 'toto';
    //     expect(()=> controller.checkDateFormat(date)).to.throw('Format de date incorrecte, format requis : YYYY-MM-DD')
    // });

});
