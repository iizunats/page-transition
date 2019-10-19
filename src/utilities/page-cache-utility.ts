import {AnchorOptions} from '../anchor-options';
import {Promise as p} from 'es6-promise';
import {PageData} from '../page-data';
import {Facade} from 'iizuna';
import {CachingFacadeInterface} from 'iizuna/lib/facades/caching/caching-facade.interface';

/**
 * @description
 * This offset is used to delay the page load of low priority anchors.
 * This value is multiplied by the priority to determine the offset.
 * e.g. PRIORITY_LOADING_OFFSET(150) * 5 = 750ms delay before target is getting queued
 * @type {number}
 */
const PRIORITY_LOADING_OFFSET = 150;// in ms

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
	private static queue: AnchorOptions[] = [];


	/**
	 * @description
	 * First searches for the target url in the cache and then polls it if the cache was empty.
	 * @param {string} url
	 * @return {Promise<PageData>}
	 */
	public static async loadPageContentCached(url: string): Promise<PageData | null> {
		const data = await this.getDataForUrl(url);
		if (data === null) {
			const target = await fetch(url);
			return await new PageData(target, url, await target.text());
		}
		return data;
	}

	/**
	 * @description
	 * Returns the caching facade with the currently highest priority.
	 * @return {CachingFacadeInterface<string, PageData>}
	 */
	private static getCachingFacade(): CachingFacadeInterface<string, PageData> {
		return Facade.get('cache') as any as CachingFacadeInterface<string, PageData>;
	}

	/**
	 * @description
	 * Either returns the stored document or:
	 * - null if the url was not found in the cache
	 * - null if the file in the cache is now invalid for caching -> cache should be refreshed
	 * @param {string} url
	 * @return {Promise<PageData>}
	 */
	public static async getDataForUrl(url: string): p<PageData | null> {
		const data = await this.getCachingFacade().get(url);
		if (data !== null && data.responseHeader.validForCache()) {
			return data;
		}
		return null;
	}

	/**
	 * @description
	 * Stores the passed target into the cache if the document is valid for caching.
	 * @param {string} url
	 * @param {PageData} targetContent
	 * @return {Promise<void>}
	 */
	public static async setDataForUrl(url: string, targetContent: PageData): p<void> {
		if (targetContent.responseHeader.validForCache()) {
			return this.getCachingFacade().set(url, targetContent);
		}
	}

	/**
	 * @description
	 * Adds a AnchorOptions into the queue and then pulls the item if no queue-request is already in progress.
	 * @return {Promise<void>}
	 */
	public static async queueAutomaticPageLoad(element: HTMLAnchorElement, priority: number | string): p<void> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const options = new AnchorOptions(element);
				this.queue.push(options);
				if (!this.currentlyLoading) {
					this.loadNextQueueItem().then(resolve).catch(reject);
				} else {
					resolve();
				}
			}, this.calculateLoadDelay(priority));
		});
	}

	/**
	 * @description
	 * Multiplies the priority by the PRIORITY_LOADING_OFFSET constant.
	 * Returns 0 if the priority is NaN or lower than zero.
	 *
	 * This prevents the setTimeout function in the onReady method to act weird or to allow any kind of security issues.
	 * @param {number} priority
	 * @return {number}
	 */
	public static calculateLoadDelay(priority: number | string) {
		const convertedPriority: number = isNaN(priority as number) || priority < 0 ? 0 : +priority;
		return convertedPriority * PRIORITY_LOADING_OFFSET;
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
		this.currentlyLoading = true;
		await this.queue.shift().loadPageContentCached(); // Get the first item from the queue
		this.currentlyLoading = false;
		await this.loadNextQueueItem();
	}
}