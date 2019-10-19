import {expect} from 'chai';
import 'mocha';
import {MiddleEvent} from "../../../src/events/middle.event";


describe('MiddleEvent Class', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof MiddleEvent).to.equal('function');
	});
	it('should have a eventName', () => {
		expect(typeof MiddleEvent.eventName).to.equal('string');
		expect(MiddleEvent.eventName.length).to.least(1);
	});
	it('should have a undefined value', () => {
		expect(typeof (new MiddleEvent()).value).to.equal('undefined');
	});
});