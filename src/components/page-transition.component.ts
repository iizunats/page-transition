import {AbstractComponent, Component, ComponentFactory, GlobalEventListener} from "iizuna";
import {PageCourier} from "../page-courier/page-courier";
import {AnchorOptionsInterface} from "../utilities/anchor-options.interface";
import {HrefComponent} from "./href.component";

@Component({
	selector: 'page-transition'
})
export class PageTransitionComponent extends AbstractComponent {

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
			const _class = new item();
			return _class.__options.selector !== 'page-transition';
		});
		return components
	}

	/**
	 * @description
	 * This listener starts the complete transition process based by the passed AnchorOptionsInterface as event value
	 * @param element
	 * @param {{value: AnchorOptionsInterface}} event
	 * @return {Promise<void>}
	 */
	@GlobalEventListener('page-transition.go-to')
	async loadPage(element: any, event: { value: AnchorOptionsInterface }) {
		const targetContent = await PageCourier.loadPageContentCached(event.value.href);

		// either the ajax call was unsuccessful or the relevantNode was not found on the target page.
		if (targetContent === null || typeof targetContent.relevantNode === "undefined") {
			//start emergency page load (browser will load the target page)
			window.location.href = event.value.href;
		}

		this.element.innerHTML = targetContent.relevantNode.innerHTML;
		ComponentFactory.registerComponents(PageTransitionComponent.components, this.element);

		window.history.pushState(null, '', event.value.href);
		window.document.title = targetContent.title; // Changing the page title based by target
	}
}