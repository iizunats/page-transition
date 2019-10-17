import {AbstractComponent, Component, ElementAttribute, OnReady} from "iizuna";
import {PageCacheUtility} from "../utilities/page-cache-utility";
import {AnchorUtility} from "../utilities/anchor-utility";

/**
 * @description
 * This offset is used to delay the page load of low priority anchors.
 * This value is multiplied by the priority to determine the offset.
 * e.g. PRIORITY_LOADING_OFFSET(150) * 5 = 750ms delay before target is getting queued
 * @type {number}
 */
const PRIORITY_LOADING_OFFSET = 150;// in ms

/**
 * @description
 * This attribute can be attached to any anchor element to register it for page-pre-loading.
 * The request to the page is being pushed in a request queue based by the loading priority.
 *
 * If two elements have the same priority, the first element in the DOM will be loaded first.
 */
@Component({
	selector: 'load-priority',
	restrict: 'a'
})
export class LoadPriorityComponent extends AbstractComponent implements OnReady {
	/**
	 * @description
	 * We know that this element can only be a AnchorElement because of the component restriction.
	 */
	element: HTMLAnchorElement;

	/**
	 * @description
	 * A Numeric representation of the loading priority. The higher the number, the lower the priority!
	 * @type {string}
	 */
	@ElementAttribute('LoadPriorityComponent.loadPriority')
	public loadPriority: string = '0';

	/**
	 * @description
	 * Pre-loads the target page and writes it into the cache for faster page loadings.
	 */
	public onReady() {
		const loadDelay = +this.loadPriority * PRIORITY_LOADING_OFFSET;
		setTimeout(() => {
			PageCacheUtility.queueAutomaticPageLoad(AnchorUtility.reduceAnchorToOptions(this.element));
		}, loadDelay);
	}
}