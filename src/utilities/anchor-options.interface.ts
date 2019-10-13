export const TARGET_BLANK = '_blank';
export const TARGET_SELF = '_self';
export type TARGET_SELF = '_self';
export type TARGET_BLANK = '_blank';
export type TARGET_NONE = '';
export type TARGET = TARGET_BLANK | TARGET_NONE | TARGET_SELF;

export interface AnchorOptionsInterface {
	href: string;
	target: TARGET;
}