import {expect} from 'chai';
import 'mocha';
import {PageCacheUtility} from "../../../src/utilities/page-cache-utility";


describe('PageCacheUtility Class', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof PageCacheUtility).to.equal('function');
	});
});