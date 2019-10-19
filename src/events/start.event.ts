import {PAGE_TRANSITION_NAME} from "../components/page-transition.component";

/**
 * @description
 * This Event is being triggered when the page load starts
 */
export class StartEvent {
	public value: undefined;
	public static eventName: string = PAGE_TRANSITION_NAME + '.start';
}