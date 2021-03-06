import {ResponseHeader} from './response-header';

/**
 * @description
 * A wrapper class for all headers returned by the server.
 * It makes working with these header a little bit easier.
 */
export class ResponseHeaders {
	constructor(private headers: Headers, private epoch: Date = new Date()) {
	}

	/**
	 * @description
	 * Creates a new ResponseHeader object based by the header key.
	 * This method replaces the "get" method when advanced functionality is needed.
	 * @param {string} key
	 * @return {ResponseHeader}
	 */
	public getHeader(key: string): ResponseHeader {
		return new ResponseHeader(this, key);
	}

	/**
	 * @description
	 * Simply calls the get method of the headers.
	 * @param {string} key
	 * @return {string}
	 */
	public get(key: string) {
		return this.headers.get(key);
	}

	/**
	 * @description
	 * Returns true if the caching time is still valid.
	 * @return {boolean}
	 */
	public validForCache(): boolean {
		const secondsSinceRequest: number = (this.epoch.getTime() - Date.now()) / 1000;

		return this.getMaxAge() > secondsSinceRequest;
	}

	/**
	 * maxAge contains the maximum amount of seconds this resource is considered "fresh".
	 * @type {number}
	 */
	public getMaxAge(): number {
		const cacheControlHeader = this.getHeader('Cache-Control');

		// If caching is disabled for this file
		if (cacheControlHeader.contains('no-cache') || cacheControlHeader.contains('no-store')) {
			return 0;
		}

		const maxAge = cacheControlHeader.getValue('max-age');
		if (maxAge !== '') { // If a max-age header was found
			return +maxAge;
		}
		/**
		 * The Expires header contains the date/time after which the response is considered stale.
		 * @type {number}
		 */
		const expires: Date = new Date(this.headers.get('Expires')); // Get the expires header
		const expireInSeconds = (expires.getTime() - this.epoch.getTime()) / 1000;

		if (expireInSeconds < 0) {
			return 0; // Don't show negative seconds
		}
		return Math.ceil(expireInSeconds); // Return 0 when in past and otherwise the diff in seconds
	}
}