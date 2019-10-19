import {
	AbstractComponent,
	Component,
	ComponentFactory,
	ElementAttribute,
	EventHelper,
	GlobalEventListener
} from 'iizuna';
import {AnchorOptions} from '../anchor-options';
import {HrefComponent} from './href.component';
import {PageData} from '../page-data';
import {GoToEvent} from '../events/go-to.event';
import {StartEvent} from "../events/start.event";
import {EndEvent} from "../events/end.event";
import {MiddleEvent} from "../events/middle.event";
import {InnerHTMLUpdateEvent} from "../events/innerHTML-update.event";

export const PAGE_TRANSITION_NAME = 'page-transition';
// @todo: implement singleton component which can only be created once per page.
// @todo: if this element is found more than once per page an error is thrown and the second component gets not initialized.
@Component({
	selector: PAGE_TRANSITION_NAME
})
export class PageTransitionComponent extends AbstractComponent {

	@ElementAttribute('PageTransitionComponent.transitionMinDuration')
	transitionMinDuration: string = '';

	/**
	 * @description
	 * List of filtered components that are registered for every page load.
	 * @type {Array}
	 */
	private static components: any[] = [];

	/**
	 * @description
	 * The config method returns the passed components after all of them (except the PageTransitionComponent itself)
	 * are stored in a local variable.
	 *
	 * This method also pushes the HrefComponent (because the page transition wont work without it) into the list.
	 * @param {T} components
	 * @return {T}
	 */
	public static config<T extends any[]>(components: T): T {
		components.push(HrefComponent); // Add the HrefComponent to the list
		PageTransitionComponent.components = components.filter((item: any) => {
			const _class = new item(); // Creating new component to receive the component options.
			return _class.__options.selector !== PAGE_TRANSITION_NAME; // Remove the page-transition component from list (used to prevent complications)
		});
		return components
	}

	/**
	 * @description
	 * This listener starts the complete transition process based by the passed AnchorOptions as event value.
	 * @param element
	 * @param {{value: AnchorOptions}} event
	 * @return {Promise<void>}
	 */
	@GlobalEventListener(GoToEvent.eventName)
	public async loadPage(element: any, event: GoToEvent) {
		const goToEvent = GoToEvent.makeInstance(event);//@todo: replace with decorator?
		const targetContent = await PageTransitionComponent.triggerEventsPageLoad(goToEvent, this.getMinDuration());

		if (!PageTransitionComponent.isDataAndEventInvalid(targetContent, goToEvent)) {
			goToEvent.pushToHistoryWithTitle(targetContent.title);
			this.startComponentInitialization(targetContent);
		} else {
			window.location.href = goToEvent.getHref();
		}
	}

	/**
	 * @description
	 * checks if the passed data is not valid for preceding via javascript.
	 * @param {PageData} targetContent
	 * @param {GoToEvent} event
	 */
	public static isDataAndEventInvalid(targetContent: PageData, event: GoToEvent) {
		return targetContent === null ||
			typeof targetContent.relevantNode === 'undefined' ||
			event === null ||
			!event.isValidHref();
	}

	/**
	 * @description
	 * Replaces the content of this page transition component element with that of the targets components elements content.
	 * Registers possible iizuna components after that and triggers an event for other frameworks.
	 * @param {PageData} targetContent
	 */
	private startComponentInitialization(targetContent: PageData) {
		this.element.innerHTML = targetContent.relevantNode.innerHTML;
		ComponentFactory.registerComponents(PageTransitionComponent.components, this.element);
		EventHelper.triggerCustomEvent(InnerHTMLUpdateEvent.eventName, this.element);
	}

	/**
	 * @description
	 * Loads the targetContent from the passed event.
	 * Also emit the "page-transition.start" and "page-transition.end" before and after that.
	 * @param {GoToEvent} event
	 * @param minDur
	 * @return {Promise<PageData>}
	 */
	public static async triggerEventsPageLoad(event: GoToEvent, minDur: number): Promise<PageData | null> {
		const startTime = Date.now();
		EventHelper.triggerCustomEvent(StartEvent.eventName);
		setTimeout(() => {
			EventHelper.triggerCustomEvent(MiddleEvent.eventName); // @todo: make based by network duration (if network takes longer)
		}, minDur / 2);
		const targetContent = await event.loadPageContentCached();
		setTimeout(() => {
			EventHelper.triggerCustomEvent(EndEvent.eventName);
		}, minDur - (Date.now() - startTime));
		return targetContent;
	}

	private getMinDuration() {
		return isNaN(this.transitionMinDuration as any as number) || +this.transitionMinDuration < 0 ? 0 : +this.transitionMinDuration;
	}
}