import {AnchorOptions} from '../anchor-options';
import {PAGE_TRANSITION_NAME} from "../components/page-transition.component";

/**
 * @description
 * This event is needed to trigger the page transition process
 * @todo: add more tests
 */
export class GoToEvent {
	public value: AnchorOptions;
	public href: string = '';
	public static eventName: string = PAGE_TRANSITION_NAME + '.go-to';

	constructor(private possibleInstance: GoToEvent) {
		this.value = possibleInstance.value;
		this.href = this.value.href;
	}

	public static makeInstance(possibleInstance: GoToEvent): GoToEvent {
		return new GoToEvent(possibleInstance);
	}

	public async loadPageContentCached() {
		return this.isValidHref() ? await this.value.loadPageContentCached() : null;
	}

	/**
	 * @description
	 * Changes the history based by the passed GoToEvent and the title of the document.
	 * @param {string} title
	 */
	public pushToHistoryWithTitle(title: string) {
		window.history.pushState(null, title, this.href);
		window.document.title = title; // Changing also the document title because it is not directly working by pushState
	}

	/**
	 * @description
	 * Checks currently only if the passed event contains a href property with at least a string.
	 * @todo: add additional checks for valid href values
	 * @return {boolean}
	 */
	public isValidHref() {
		return typeof this.href === 'string';
	}

	/**
	 * @description
	 * If the passed events value object does not contain a href property we are returning a href to the start of the page
	 * @return {string}
	 */
	public getHref(): string {
		return this.isValidHref() ? this.href : '/';
	}
}