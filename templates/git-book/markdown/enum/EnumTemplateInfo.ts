import { EnumMemberTemplateInfo } from './EnumMemberTemplateInfo';

export interface EnumTemplateInfo {
    name: string;
    text: string;
    modifiers: string[] | undefined;
    members: EnumMemberTemplateInfo[];
    description: string[] | undefined;
    modules: string[] | undefined;
    hasComment: boolean;
}
