import {expect} from 'chai';
import 'mocha';
import {PageData} from "../../src/page-data";


describe('PageData Class', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof PageData).to.equal('function');
	});
});