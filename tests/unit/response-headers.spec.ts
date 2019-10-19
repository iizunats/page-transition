import {expect} from 'chai';
import 'mocha';
import {ResponseHeaders} from "../../src/response-headers";


describe('ResponseHeaders Class', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof ResponseHeaders).to.equal('function');
	});
});