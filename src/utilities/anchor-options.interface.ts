export const TARGET_BLANK = '_blank';
export const TARGET_SELF = '_self';
export type TARGET_SELF = '_self';
export const TARGET_PARENT = '_parent';
export type TARGET_PARENT = '_parent';
export const TARGET_TOP = '_top';
export type TARGET_TOP = '_top';
export type TARGET_BLANK = '_blank';
export type TARGET_NONE = '';
export type TARGET = TARGET_BLANK | TARGET_NONE | TARGET_SELF | TARGET_PARENT | TARGET_TOP;

/**
 * @description
 * This interface is used when a page transition should be started.
 * The page-transition.go-to event value has to be of this kind!
 */
export interface AnchorOptionsInterface {
	/**
	 * @description
	 * The targets page href
	 */
	href: string;
	/**
	 * @description
	 * The target type (like _blank oder _self)
	 */
	target: TARGET;
}