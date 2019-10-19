import {expect} from 'chai';
import 'mocha';
import {ResponseHeader} from "../../src/response-header";


describe('ResponseHeader Class', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof ResponseHeader).to.equal('function');
	});
});