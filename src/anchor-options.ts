import {PageCacheUtility} from './utilities/page-cache-utility';

export const TARGET_BLANK = '_blank';
export const TARGET_SELF = '_self';
export type TARGET_SELF = '_self';
export const TARGET_PARENT = '_parent';
export type TARGET_PARENT = '_parent';
export const TARGET_TOP = '_top';
export type TARGET_TOP = '_top';
export type TARGET_BLANK = '_blank';
export type TARGET_NONE = '';
export type TARGET = TARGET_BLANK | TARGET_NONE | TARGET_SELF | TARGET_PARENT | TARGET_TOP;

/**
 * @description
 * This interface is used when a page transition should be started.
 * The page-transition.go-to event value has to be of this kind!
 */
export class AnchorOptions {
	constructor(private element: HTMLAnchorElement) {
	}

	/**
	 * @description
	 * The targets page href.
	 */
	public href: string = this.element.href;
	/**
	 * @description
	 * The target type (like _blank oder _self).
	 */
	public target: string = this.getUnifiedElementTarget();
	/**
	 * @description
	 * Simply checks for the tag name of the element.
	 * @type {boolean}
	 */
	public isAnchorElement: boolean = this.element.tagName.toLowerCase() === 'a';

	/**
	 * @description
	 * Just returns allowed targets.
	 * Returns a empty string if none is matching.
	 * @return {TARGET}
	 */
	private getUnifiedElementTarget(): TARGET {
		switch (this.element.target) {
			case TARGET_BLANK:
				return TARGET_BLANK;
			case TARGET_TOP:
				return TARGET_TOP;
			case '':
			case TARGET_SELF:
				return TARGET_SELF;
		}
		return TARGET_PARENT;
	}

	/**
	 * @description
	 * Checks whether a anchor is linking to an internal page or not.
	 * @return {boolean}
	 */
	public isInternalLink() {
		const checkDomain = (url: string) => {
			if (url.indexOf('//') === 0) { // Add protocol if missing
				url = location.protocol + url;
			}
			return url.toLowerCase().replace(/([a-z])?:\/\//, '$1').split('/')[0];
		};

		const relativeLink = this.element.href.indexOf(':') <= -1 && this.element.href.indexOf('//') <= -1;  // If the url does not contain a colon or double slash
		const sameDomain = checkDomain(location.href) === checkDomain(this.element.href); // If the target is the same domain

		return this.target === TARGET_SELF && (relativeLink || sameDomain);
	}

	public async loadPageContentCached() {
		return PageCacheUtility.loadPageContentCached(this.href);
	}
}