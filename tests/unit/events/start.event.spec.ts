import {expect} from 'chai';
import 'mocha';
import {StartEvent} from "../../../src/events/start.event";


describe('StartEvent Class', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof StartEvent).to.equal('function');
	});
	it('should have a eventName', () => {
		expect(typeof StartEvent.eventName).to.equal('string');
		expect(StartEvent.eventName.length).to.least(1);
	});
	it('should have a undefined value', () => {
		expect(typeof (new StartEvent()).value).to.equal('undefined');
	});
});