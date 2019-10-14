import {PageCourierHeaders} from "./page-courier-headers";

export class PageCourierHeader {
	/**
	 * @description
	 * A unified value of the header
	 * @type {string}
	 */
	private value: string = this.get().toLowerCase();
	/**
	 * @description
	 * If the header value is a list of key value pairs its parsed into this list
	 * @type {string[]}
	 */
	private valueList: string[] = this.value
		.split(',') // Get The separate information
		.map(keyValuePair => keyValuePair.trim());// remove the possible trailing spaces

	constructor(private headers: PageCourierHeaders, private name: string) {
	}

	/**
	 * @description
	 * Returns the value of this header
	 * @return {string}
	 */
	public get() {
		return this.headers.get(this.name);
	}

	/**
	 * @description
	 * either returns the value of the header itself (if no key was passed)
	 * or returns the value of a ke value pair of values.
	 * An Empty string will be returned if the key was not found in this list
	 * @param {string} key
	 * @return {string}
	 */
	public getValue(key: string): string
	public getValue(key?: string): string {
		const passedKey = typeof key === 'undefined' ? '' : key.toLowerCase().trim();
		if (passedKey === '') { // Value directly from header because no or invalid key was passed
			return this.value;
		}

		return this.valueList
			.filter(value => value.substring(0, passedKey.length) === passedKey) // Removing all "not {key}" header
			.join() // Get the header as string
			.replace(passedKey + '=', '');
	}

	/**
	 * @description
	 * Check whether a header contains a specific value inside the value list
	 * @param {string} value
	 * @return {boolean}
	 */
	public contains(value: string): boolean {
		return this.valueList.indexOf(value) !== -1;
	}
}