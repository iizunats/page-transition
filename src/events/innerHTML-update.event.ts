import {PAGE_TRANSITION_NAME} from "../components/page-transition.component";

/**
 * @description
 * This event is triggered when the content of the loaded page is replaced.
 */
export class InnerHTMLUpdateEvent {
	public static eventName: string = PAGE_TRANSITION_NAME + '.innerHTML-update';

	constructor(public value: Element) {
	}
}