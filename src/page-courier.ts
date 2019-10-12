import {Promise as p} from "es6-promise";
import {PageCache} from "./page-cache";

export interface PageCourierData {
	requestUrl: string;
	response: string;
	responseHeader: any
}

export abstract class PageCourier {

	public static async loadPageContentCached(url: string): p<PageCourierData | null> {
		const data = await PageCache.getDataForUrl(url);
		if (data === null) {
			return PageCourier.loadPageContent(url);
		}
		return data;
	}

	public static async loadPageContent(url: string): p<PageCourierData | null> {
		// @todo: implement page receiving process (complete html!)

		return {
			requestUrl: url,
			response: '<span>Hello!</span>',
			responseHeader: null // @todo: pass header for caching control
		};
	}
}