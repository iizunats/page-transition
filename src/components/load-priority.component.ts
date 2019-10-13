import {AbstractComponent, Component, ElementAttribute, OnReady} from "iizuna";
import {PageCacheUtility} from "../utilities/page-cache-utility";
import {AnchorUtility} from "../utilities/anchor-utility";

@Component({
	selector: 'load-priority',
	restrict: 'a'
})
export class LoadPriorityComponent extends AbstractComponent implements OnReady {
	element: HTMLAnchorElement;

	@ElementAttribute('LoadPriorityComponent.loadPriority')
	public loadPriority: string = '0';

	/**
	 * @description
	 * Pre-loads the target page and writes it into the cache for faster page loadings
	 */
	public onReady() {
		const loadDelay = +this.loadPriority * 150;
		setTimeout(() => {
			PageCacheUtility.queueAutomaticPageLoad(AnchorUtility.reduceAnchorToOptions(this.element));
		}, loadDelay);
	}
}