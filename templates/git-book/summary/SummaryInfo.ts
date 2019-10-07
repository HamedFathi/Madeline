export interface SummaryInfo {
    id: string | undefined;
    level: number;
    title: string;
    baseUrl?: string;
    url: string;
    extension?: string;
    parent: string | undefined;
    scope: string;

}
