import { GetAccessorInfo } from '../get-accessor/GetAccessorInfo';
import { SetAccessorInfo } from '../set-accessor/SetAccessorInfo';
import { MethodInfo } from '../method/MethodInfo';
import { LiteralAssignmentInfo } from './LiteralAssignmentInfo';
export interface LiteralExpressionInfo {
    assignments: LiteralAssignmentInfo[] | undefined;
    getAccessors: GetAccessorInfo[] | undefined;
    setAccessors: SetAccessorInfo[] | undefined;
    methods: MethodInfo[] | undefined;
    text: string;
    isObjectLiteral: boolean;
}
