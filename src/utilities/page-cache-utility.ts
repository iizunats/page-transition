import {AnchorOptionsInterface} from "./anchor-options.interface";
import {PageCourier} from "../page-courier/page-courier";
import {Promise as p} from "es6-promise";
import {PageCourierData} from "../page-courier/page-courier-data";
import {Facade} from "iizuna";
import {CachingFacadeInterface} from "iizuna/lib/facades/caching/caching-facade.interface";

/**
 * @description
 * A Utility class that manages caching for us.
 * It used the CachingFacadeInterface of iizuna.
 */
export abstract class PageCacheUtility {
	/**
	 * @description
	 * This variable is used to check if a page load is currently in progress.
	 * @type {boolean}
	 */
	private static currentlyLoading = false;
	/**
	 * @description
	 * The queue contains all pages that should be loaded one by one.
	 * The array is sorted by request ordering.
	 * @type {Array}
	 */
	private static queue: AnchorOptionsInterface[] = [];

	/**
	 * @description
	 * Returns the caching facade with the currently highest priority.
	 * @return {CachingFacadeInterface<string, PageCourierData>}
	 */
	private static getCachingFacade(): CachingFacadeInterface<string, PageCourierData> {
		return Facade.get('cache') as any as CachingFacadeInterface<string, PageCourierData>;
	}

	/**
	 * @description
	 * Either returns the stored document or:
	 * - null if the url was not found in the cache
	 * - null if the file in the cache is now invalid for caching -> cache should be refreshed
	 * @param {string} url
	 * @return {Promise<PageCourierData>}
	 */
	public static async getDataForUrl(url: string): p<PageCourierData | null> {
		const data = await this.getCachingFacade().get(url);
		if (typeof data !== 'undefined' && data.responseHeader.validForCache()) {
			return data;
		}
		return null;
	}

	/**
	 * @description
	 * Stores the passed target into the cache if the document is valid for caching.
	 * @param {string} url
	 * @param {PageCourierData} targetContent
	 * @return {Promise<void>}
	 */
	public static async setDataForUrl(url: string, targetContent: PageCourierData): p<void> {
		if (targetContent.responseHeader.validForCache()) {
			return this.getCachingFacade().set(url, targetContent);
		}
	}

	/**
	 * @description
	 * Adds a AnchorOptionsInterface into the queue and then pulls the item if no queue-request is already in progress.
	 * @param {AnchorOptionsInterface} options
	 * @return {Promise<void>}
	 */
	public static async queueAutomaticPageLoad(options: AnchorOptionsInterface): p<void> {
		this.queue.push(options);
		if (!this.currentlyLoading) {
			await this.loadNextQueueItem();
		}
	}

	/**
	 * @description
	 * Loads the next item of the queue (if not empty) and then calls itself.
	 * @return {Promise<void>}
	 */
	private static async loadNextQueueItem(): p<void> {
		if (this.queue.length === 0) {
			return;
		}
		const nextItem = this.queue.shift(); // Get the first item from the queue
		this.currentlyLoading = true;
		await PageCourier.loadPageContentCached(nextItem.href);
		this.currentlyLoading = false;
		await this.loadNextQueueItem();
	}
}