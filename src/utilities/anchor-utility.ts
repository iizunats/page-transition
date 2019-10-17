import {
	AnchorOptionsInterface,
	TARGET,
	TARGET_BLANK,
	TARGET_PARENT,
	TARGET_SELF,
	TARGET_TOP
} from "./anchor-options.interface";

export abstract class AnchorUtility {

	/**
	 * @description
	 * Simply checks for the tag name of the element
	 * @param {Element} element
	 * @return {boolean}
	 */
	public static isAnchorElement(element: Element) {
		return element.tagName.toLowerCase() === 'a';
	}

	/**
	 * @description
	 * Checks whether a anchor is linking to an internal page or not
	 * @param {HTMLAnchorElement} element
	 * @return {boolean}
	 */
	public static isInternalLink(element: HTMLAnchorElement) {
		const checkDomain = (url: string) => {
			if (url.indexOf('//') === 0) { // Add protocol if missing
				url = location.protocol + url;
			}
			return url.toLowerCase().replace(/([a-z])?:\/\//, '$1').split('/')[0];
		};

		const relativeLink = element.href.indexOf(':') <= -1 && element.href.indexOf('//') <= -1;  // If the url does not contain a colon or double slash
		const sameDomain = checkDomain(location.href) === checkDomain(element.href); // If the target is the same domain

		return this.anchorOpensInSameWindow(element) && (relativeLink || sameDomain);
	}

	/**
	 * @description
	 * Returns true if the target attribute of the passed element is either empty or TARGET_SELF.
	 * @param {HTMLAnchorElement} element
	 * @return {boolean}
	 */
	public static anchorOpensInSameWindow(element: HTMLAnchorElement) {
		const elementOptions = AnchorUtility.reduceAnchorToOptions(element);
		return elementOptions.target === TARGET_SELF || elementOptions.target === ''
	}

	/**
	 * @description
	 * returns just the properties needed for the event.
	 * @param {HTMLAnchorElement} element
	 * @return {AnchorOptionsInterface}
	 */
	public static reduceAnchorToOptions(element: HTMLAnchorElement): AnchorOptionsInterface {
		return {
			href: element.href,
			target: AnchorUtility.getUnifiedElementTarget(element.target)
		};
	}

	/**
	 * @description
	 * Just returns allowed targets.
	 * Returns a empty string if none is matching.
	 * @param {string} target
	 * @return {TARGET}
	 */
	private static getUnifiedElementTarget(target: string): TARGET {
		switch (target) {
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
}