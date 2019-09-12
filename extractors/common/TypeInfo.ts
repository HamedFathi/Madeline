import { TypeDetailInfo } from './TypeDetailInfo';
export interface TypeInfo {
    text: string;
    fullText: string;
    details: TypeDetailInfo[] | undefined;
}
