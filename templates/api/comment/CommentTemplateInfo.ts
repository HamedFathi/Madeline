import { CommentGroupInfo } from './CommentGroupInfo';
import { TemplateOptions } from '../../TemplateOptions';
export interface CommentTemplateInfo {
    description: string[] | undefined;
    details: CommentGroupInfo[] | undefined;
    options?: TemplateOptions;
}
