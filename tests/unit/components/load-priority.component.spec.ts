import {expect} from 'chai';
import 'mocha';
import {PageCacheUtility} from '../../../src/utilities/page-cache-utility';


describe('LoadPriorityComponent Class', () => {
	it('should calculate the load delay', () => {
		expect(PageCacheUtility.calculateLoadDelay(-6)).to.equal(0);
		expect(PageCacheUtility.calculateLoadDelay('iizuna')).to.equal(0);
		expect(PageCacheUtility.calculateLoadDelay('-6')).to.equal(0);
		expect(PageCacheUtility.calculateLoadDelay('1')).to.equal(150);

		expect(PageCacheUtility.calculateLoadDelay(0)).to.equal(0);
		expect(PageCacheUtility.calculateLoadDelay(1)).to.equal(150);
		expect(PageCacheUtility.calculateLoadDelay(2)).to.equal(300);
		expect(PageCacheUtility.calculateLoadDelay(3)).to.equal(450);
		expect(PageCacheUtility.calculateLoadDelay(4)).to.equal(600);
		expect(PageCacheUtility.calculateLoadDelay(6)).to.equal(900);
		expect(PageCacheUtility.calculateLoadDelay(7)).to.equal(1050);
	});
});