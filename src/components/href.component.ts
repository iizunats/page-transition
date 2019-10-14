import {AbstractComponent, Component, EventHelper, EventListener} from "iizuna";
import {AnchorUtility} from "../utilities/anchor-utility";

/**
 * @description
 * This component is registered automatically by the page-transition component.
 * Every Element with the href Attribute (normally just anchor elements) get a listener attached
 */
@Component({
	selector: 'href'
})
export class HrefComponent extends AbstractComponent {

	/**
	 * @description
	 * attaches a click listener to all anchor elements which triggers the navigation process
	 * @param {HTMLAnchorElement} element
	 * @param event
	 */
	@EventListener()
	click(element: HTMLAnchorElement, event: any) {
		//start transition process only when the element is a anchor and the link opens in the same window
		if (element.tagName.toLowerCase() === 'a' && AnchorUtility.anchorOpensInSameWindow(element)) {
			event.preventDefault();
			EventHelper.triggerCustomEvent('page-transition.go-to', AnchorUtility.reduceAnchorToOptions(element));
		}
	}
}