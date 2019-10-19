import {expect} from 'chai';
import 'mocha';
import {EndEvent} from "../../../src/events/end.event";


describe('EndEvent Class', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof EndEvent).to.equal('function');
	});
	it('should have a eventName', () => {
		expect(typeof EndEvent.eventName).to.equal('string');
		expect(EndEvent.eventName.length).to.least(1);
	});
	it('should have a undefined value', () => {
		expect(typeof (new EndEvent()).value).to.equal('undefined');
	});
});