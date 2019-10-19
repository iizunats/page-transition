import {expect} from 'chai';
import 'mocha';
import {InnerHTMLUpdateEvent} from "../../../src/events/innerHTML-update.event";


describe('InnerHTMLUpdateEvent Class', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof InnerHTMLUpdateEvent).to.equal('function');
	});
	it('should have a eventName', () => {
		expect(typeof InnerHTMLUpdateEvent.eventName).to.equal('string');
		expect(InnerHTMLUpdateEvent.eventName.length).to.least(1);
	});
	it('should have an Element as Value', () => {
		expect(typeof (new InnerHTMLUpdateEvent(document.createElement('div')))).to.equal('object');
	});
});