import {PageCourierHeaders} from "./page-courier-headers";

export interface PageCourierData {
	requestUrl: string;
	responseDocument: Document;
	relevantNode: Element;
	responseHeader: PageCourierHeaders;
	title: string;
}