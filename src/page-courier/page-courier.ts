import {Promise as p} from "es6-promise";
import {PageCacheUtility} from "../utilities/page-cache-utility";
import {HtmlElementUtility} from "iizuna";
import {PageCourierData} from "./page-courier-data";
import {PageCourierHeaders} from "./page-courier-headers";

/**
 * @description
 * This class handles page request and caching of those pages.
 * It acts like a low level service worker for the page-transition component.
 */
export abstract class PageCourier {

	/**
	 * @description
	 * First searches for the target url in the cache and then polls it if the cache was empty
	 * @param {string} url
	 * @return {Promise<PageCourierData>}
	 */
	public static async loadPageContentCached(url: string): p<PageCourierData | null> {
		const data = await PageCacheUtility.getDataForUrl(url);
		if (data === null) {
			return PageCourier.loadPageContent(url);
		}
		return data;
	}

	/**
	 * @description
	 * Fetches the target page and tries to identify the page-transition element as relevantNode for content.
	 * @param {string} url
	 * @return {Promise<PageCourierData>}
	 */
	public static async loadPageContent(url: string): p<PageCourierData | null> {
		const target = await fetch(url);
		const html = await target.text();
		const doc = new DOMParser().parseFromString(html, "text/html");
		const titleTag = doc.querySelector('head>title') as HTMLTitleElement;
		const content = {
			requestUrl: url,
			responseDocument: doc,
			relevantNode: HtmlElementUtility.querySelectByAttribute('page-transition', doc),
			title: titleTag.text,
			responseHeader: new PageCourierHeaders(target.headers)
		};

		PageCacheUtility.setDataForUrl(url, content); // Store new data in cache

		return content;
	}
}