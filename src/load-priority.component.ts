import {AbstractComponent, Component, ElementAttribute, EventHelper, EventListener, OnReady} from "iizuna";
import {AnchorOptionsInterface} from "./anchor-options.interface";
import {PageCache} from "./page-cache";

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
			PageCache.queueAutomaticPageLoad(LoadPriorityComponent.reduceElementToOptions(this.element));
		}, loadDelay);
	}

	@EventListener()
	click() {
		// @todo: just trigger the event when the target is not blank
		EventHelper.triggerCustomEvent(
			'page-transition.go-to',
			LoadPriorityComponent.reduceElementToOptions(this.element)
		);
	}

	/**
	 * @description
	 * returns just the properties needed for the event
	 * @param {HTMLAnchorElement} element
	 * @return {AnchorOptionsInterface}
	 */
	private static reduceElementToOptions(element: HTMLAnchorElement): AnchorOptionsInterface {
		const options: AnchorOptionsInterface = {
			href: element.href,
			target: element.target
		};
		return options;
	}
}