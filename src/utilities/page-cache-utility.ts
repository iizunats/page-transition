import {AnchorOptionsInterface} from "./anchor-options.interface";
import {PageCourier} from "../page-courier/page-courier";
import {Promise as p} from "es6-promise";
import {PageCourierData} from "../page-courier/page-courier-data";

interface CacheData {
	[key: string]: PageCourierData
}

export abstract class PageCacheUtility {
	private static data: CacheData = {};

	public static async getDataForUrl(url: string): p<PageCourierData | null> {
		// @todo: load it directly from the localstorage. not from the local object
		return this.data[url] || null;
	}

	public static async setDataForUrl(url: string, targetContent: PageCourierData): p<void> {
		this.data[url] = targetContent;
		// @todo: add local storage save
	}

	public static async queueAutomaticPageLoad(options: AnchorOptionsInterface): p<void> {
		//@todo dont load all queued pages at one time! store them in an array and wait for the next free ajax call to load it
		await PageCourier.loadPageContentCached(options.href);
	}
}