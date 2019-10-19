import {expect} from 'chai';
import 'mocha';
import {AnchorOptions} from '../../src/anchor-options';


describe('AnchorOptions Class', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof AnchorOptions).to.equal('function');
	});

	it('should identify Anchor Elements', () => {
		expect((new AnchorOptions(document.createElement('a'))).isAnchorElement).to.equal(true);
		expect((new AnchorOptions(document.createElement('div') as any as HTMLAnchorElement)).isAnchorElement).to.equal(false);
		expect((new AnchorOptions(document.createElement('link') as any as HTMLAnchorElement)).isAnchorElement).to.equal(false);
	});

	it('should reduce the anchor to options', () => {
		const getOptionsTarget = (element: HTMLAnchorElement) => (new AnchorOptions(element)).target;
		const anchor = document.createElement('a');

		it('should detect the correct target', () => {
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

		it('should detect the correct href', () => {
			anchor.href = 'https://www.iizunats.com/';
			expect((new AnchorOptions(anchor)).href).to.equal('https://www.iizunats.com/');
		});
	});

	it('should detect internal links', () => {
		const anchor = document.createElement('a');

		it('should check for relative urls', () => {
			anchor.href = '/relative/link';
			anchor.target = '_blank';
			expect((new AnchorOptions(anchor)).isInternalLink()).to.equal(false);

			anchor.target = '_self';
			expect((new AnchorOptions(anchor)).isInternalLink()).to.equal(true);

			anchor.target = '';
			expect((new AnchorOptions(anchor)).isInternalLink()).to.equal(true);

			anchor.target = '_parent';
			expect((new AnchorOptions(anchor)).isInternalLink()).to.equal(false);

			anchor.target = 'some-frame-name';
			expect((new AnchorOptions(anchor)).isInternalLink()).to.equal(false);

			anchor.target = '_top';
			expect((new AnchorOptions(anchor)).isInternalLink()).to.equal(false);
		});

		it('should check for external urls', () => {
			anchor.href = 'https://iizunats.com/link';
			anchor.target = '_blank';
			expect((new AnchorOptions(anchor)).isInternalLink()).to.equal(false);

			anchor.target = '_self';
			expect((new AnchorOptions(anchor)).isInternalLink()).to.equal(false);

			anchor.target = '';
			expect((new AnchorOptions(anchor)).isInternalLink()).to.equal(false);

			anchor.target = '_parent';
			expect((new AnchorOptions(anchor)).isInternalLink()).to.equal(false);

			anchor.target = 'some-frame-name';
			expect((new AnchorOptions(anchor)).isInternalLink()).to.equal(false);

			anchor.target = '_top';
			expect((new AnchorOptions(anchor)).isInternalLink()).to.equal(false);
		});
	});
});