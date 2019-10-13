import {AbstractComponent, Component, EventHelper, EventListener} from "iizuna";
import {AnchorUtility} from "../utilities/anchor-utility";

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
		//start transition process only when the link opens in the same window
		if (AnchorUtility.anchorOpensInSameWindow(element)) {
			event.preventDefault();
			EventHelper.triggerCustomEvent('page-transition.go-to', AnchorUtility.reduceAnchorToOptions(element));
		}
	}
}