import { TypeInfo } from '../common/TypeInfo';

export interface AssignmentInfo {
    name: string;
    type: TypeInfo;
    value: any;
    isShorthand: boolean;
    isSpread: boolean;
}