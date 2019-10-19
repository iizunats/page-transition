import {AbstractComponent, Component, EventHelper, EventListener} from 'iizuna';
import {AnchorOptions} from '../anchor-options';
import {GoToEvent} from "../events/go-to.event";

/**
 * @description
 * This component is registered automatically by the page-transition component.
 * Every Element with the href Attribute (normally just anchor elements) get a listener attached.
 *
 * This component does not include untested behaviour.
 */
@Component({
	selector: 'href'
	// We can't restrict this to anchor elements, because link elements are also allowed to have href attributes.
})
export class HrefComponent extends AbstractComponent {

	/**
	 * @description
	 * attaches a click listener which triggers the navigation process
	 * when the elected element was a anchor and opens in the same window.
	 * @param {HTMLAnchorElement} element
	 * @param event
	 */
	@EventListener()
	click(element: HTMLAnchorElement, event: any) {
		const options = new AnchorOptions(element);
		if (options.isAnchorElement && options.isInternalLink()) {
			event.preventDefault(); // Prevent browser default, because we are managing the page load
			EventHelper.triggerCustomEvent(GoToEvent.eventName, options);
		}
	}
}