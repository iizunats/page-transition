import {AbstractComponent, Component, GlobalEventListener} from "iizuna";
import {PageCourier} from "./page-courier";
import {AnchorOptionsInterface} from "./anchor-options.interface";

@Component({
	selector: 'page-transition'
})
export class PageTransitionComponent extends AbstractComponent {

	@GlobalEventListener('page-transition.go-to')
	async loadPage(element: any, event: { value: AnchorOptionsInterface }) {
		const targetContent = await PageCourier.loadPageContentCached(event.value.href);
		if (targetContent === null) {
			//start emergency page load (browser will load the target page)
			window.location.href = event.value.href;
		}
		// @todo: now replace the current page with the loaded new page
	}
}