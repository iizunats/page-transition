import {ResponseHeaders} from './response-headers';
import {HtmlElementUtility} from 'iizuna';
import {PageCacheUtility} from './utilities/page-cache-utility';
import {PAGE_TRANSITION_NAME} from "./components/page-transition.component";

/**
 * @description
 * This object is returned by the PageCourier class and contains all necessary information to show and cache the page.
 * Its properties and constructor declaration is ordered by call stack order.
 */
export class PageData {
	/**
	 * @description
	 * The complete document received from the server based by the requestUrl.
	 */
	public responseDocument: Document;
	/**
	 * @description
	 * The header of the server response.
	 */
	public responseHeader: ResponseHeaders;
	/**
	 * Selects the title element inside the response documents head.
	 * @type {Element}
	 */
	public titleNode: HTMLTitleElement | null;
	/**
	 * @description
	 * The page title. This information is gathered by selecting for head>title.
	 * If the titleNode was not found or was invalid it will contain the title of the current document.
	 */
	public title: string;
	/**
	 * @description
	 * The Node, that was possibly found by the search for the page-transition component of the responseDocument.
	 */
	public relevantNode: Element;

	/**
	 * Creates an PageData instance which register's itself in the PageCacheUtility.
	 * @param target The target of the triggering anchor element
	 * @param requestUrl This is the url that was requested by the PageCourier.
	 * @param html
	 */
	constructor(public target: Response, public requestUrl: string, public html: string) {
		PageCacheUtility.setDataForUrl(requestUrl, this);
		this.responseDocument = new DOMParser().parseFromString(this.html, 'text/html');
		this.responseHeader = new ResponseHeaders(this.target.headers);
		this.titleNode = this.responseDocument.querySelector('head>title');
		this.title = this.titleNode === null || typeof this.titleNode.text !== 'string' ? document.title : this.titleNode.text;
		this.relevantNode = HtmlElementUtility.querySelectByAttribute(PAGE_TRANSITION_NAME, this.responseDocument);
	}
}