import {AbstractComponent, Component, EventHelper, EventListener} from "iizuna";
import {AnchorUtility} from "../utilities/anchor-utility";

/**
 * @description
 * This component is registered automatically by the page-transition component.
 * Every Element with the href Attribute (normally just anchor elements) get a listener attached
 */
@Component({
	selector: 'href'
	// We cant restrict this to anchor elements, because link elements are also allowed to have href attributes
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
		if (AnchorUtility.isAnchorElement(element) && AnchorUtility.anchorOpensInSameWindow(element)) {
			event.preventDefault(); // Prevent browser default, because we are managing the page load
			EventHelper.triggerCustomEvent('page-transition.go-to', AnchorUtility.reduceAnchorToOptions(element));
		}
	}
}