import {expect} from 'chai';
import 'mocha';
import {AnchorUtility} from "../../../src/utilities/anchor-utility";


describe('AnchorUtility Class', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof AnchorUtility).to.equal('function');
	});

	it('should identify Anchor Elements', () => {
		expect(AnchorUtility.isAnchorElement(document.createElement('a'))).to.equal(true);
		expect(AnchorUtility.isAnchorElement(document.createElement('div'))).to.equal(false);
		expect(AnchorUtility.isAnchorElement(document.createElement('link'))).to.equal(false);
	});

	it('should identify target attributes of anchor', () => {
		const anchor = document.createElement('a');
		anchor.target = '_blank';
		expect(AnchorUtility.anchorOpensInSameWindow(anchor)).to.equal(false);

		anchor.target = '_self';
		expect(AnchorUtility.anchorOpensInSameWindow(anchor)).to.equal(true);

		anchor.target = '';
		expect(AnchorUtility.anchorOpensInSameWindow(anchor)).to.equal(true);

		anchor.target = '_parent';
		expect(AnchorUtility.anchorOpensInSameWindow(anchor)).to.equal(false);

		anchor.target = '_top';
		expect(AnchorUtility.anchorOpensInSameWindow(anchor)).to.equal(false);

		anchor.target = 'some-frame-name';
		expect(AnchorUtility.anchorOpensInSameWindow(anchor)).to.equal(false);
	});


	it('should reduce the anchor to options', () => {
		const getOptionsTarget = (element: HTMLAnchorElement) => AnchorUtility.reduceAnchorToOptions(element).target;
		const anchor = document.createElement('a');
		anchor.target = '_blank';
		expect(getOptionsTarget(anchor)).to.equal('_blank');

		anchor.target = '_self';
		expect(getOptionsTarget(anchor)).to.equal('_self');

		anchor.target = '';
		expect(getOptionsTarget(anchor)).to.equal('_self');

		anchor.target = '_parent';
		expect(getOptionsTarget(anchor)).to.equal('_parent');

		anchor.target = 'some-frame-name';
		expect(getOptionsTarget(anchor)).to.equal('_parent');

		anchor.target = '_top';
		expect(getOptionsTarget(anchor)).to.equal('_top');
	});

	it('should detect internal links', () => {
		const anchor = document.createElement('a');

		it('should check for relative urls', () => {
			anchor.href = '/relative/link';
			anchor.target = '_blank';
			expect(AnchorUtility.isInternalLink(anchor)).to.equal(false);

			anchor.target = '_self';
			expect(AnchorUtility.isInternalLink(anchor)).to.equal(true);

			anchor.target = '';
			expect(AnchorUtility.isInternalLink(anchor)).to.equal(true);

			anchor.target = '_parent';
			expect(AnchorUtility.isInternalLink(anchor)).to.equal(false);

			anchor.target = 'some-frame-name';
			expect(AnchorUtility.isInternalLink(anchor)).to.equal(false);

			anchor.target = '_top';
			expect(AnchorUtility.isInternalLink(anchor)).to.equal(false);
		});

		it('should check for external urls', () => {
			anchor.href = 'https://iizunats.com/link';
			anchor.target = '_blank';
			expect(AnchorUtility.isInternalLink(anchor)).to.equal(false);

			anchor.target = '_self';
			expect(AnchorUtility.isInternalLink(anchor)).to.equal(false);

			anchor.target = '';
			expect(AnchorUtility.isInternalLink(anchor)).to.equal(false);

			anchor.target = '_parent';
			expect(AnchorUtility.isInternalLink(anchor)).to.equal(false);

			anchor.target = 'some-frame-name';
			expect(AnchorUtility.isInternalLink(anchor)).to.equal(false);

			anchor.target = '_top';
			expect(AnchorUtility.isInternalLink(anchor)).to.equal(false);
		});
	});
});