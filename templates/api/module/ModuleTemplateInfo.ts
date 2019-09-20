import { TemplateOptions } from '../../TemplateOptions';

export interface ModuleTemplateInfo {
    name: string;
    type: string;
    modifiers: string[] | undefined;
    description: string[] | undefined;
    text: string;
    option?: TemplateOptions;
}
