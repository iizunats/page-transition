import {AnchorOptionsInterface, TARGET, TARGET_BLANK, TARGET_SELF} from "./anchor-options.interface";

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
	 * returns just the properties needed for the event
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
	 * Just returns allowed targets. returns a empty string if none is matching.
	 * @param {string} target
	 * @return {TARGET}
	 */
	private static getUnifiedElementTarget(target: string): TARGET {
		switch (target) {
			case TARGET_BLANK:
				return TARGET_BLANK;
			case TARGET_SELF:
				return TARGET_SELF;
			default:
				return '';
		}
	}
}