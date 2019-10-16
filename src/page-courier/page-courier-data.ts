import {PageCourierHeaders} from "./page-courier-headers";

/**
 * @description
 * This object is returned by the PageCourier class and contains all necessary information to show and cache the page.
 */
export interface PageCourierData {
	/**
	 * @description
	 * This is the url that was requested by the PageCourier
	 */
	requestUrl: string;
	/**
	 * @description
	 * The complete document received from the server based by the requestUrl
	 */
	responseDocument: Document;
	/**
	 * @description
	 * The Node, that was possibly found by the search for the page-transition component of the responseDocument
	 */
	relevantNode: Element;
	/**
	 * @description
	 * The header of the server response
	 */
	responseHeader: PageCourierHeaders;
	/**
	 * @description
	 * The page title. This information is gathered by selecting for head>title
	 */
	title: string;
}