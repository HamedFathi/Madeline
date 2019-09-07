import { DestructuringElementInfo } from "./DestructuringElementInfo";
export interface DestructuringInfo {
    isArrayDestructuring: boolean;
    elements: DestructuringElementInfo[];
    defaultValue: string | undefined;
}
