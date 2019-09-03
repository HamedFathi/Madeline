import { AssignmentInfo } from './AssignmentInfo';
import { GetAccessorInfo } from '../get-accessor/GetAccessorInfo';
import { SetAccessorInfo } from '../set-accessor/SetAccessorInfo';
import { MethodInfo } from '../method/MethodInfo';
export interface VariableObjectLiteralInfo {
    assignments: AssignmentInfo[] | undefined;
    getAccessors: GetAccessorInfo[] | undefined;
    setAccessors: SetAccessorInfo[] | undefined;
    methods: MethodInfo[] | undefined;
}
