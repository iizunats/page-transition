import {expect} from 'chai';
import 'mocha';
import {GoToEvent} from "../../../src/events/go-to.event";


describe('GoToEvent Class', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof GoToEvent).to.equal('function');
	});
	it('should have a eventName', () => {
		expect(typeof GoToEvent.eventName).to.equal('string');
		expect(GoToEvent.eventName.length).to.least(1);
	});
	//@todo: add mor complex logic
});