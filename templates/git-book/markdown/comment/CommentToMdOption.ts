import { AlternativeTagOptions } from './AlternativeTagOptions';

export interface CommentToMdOption {
    append: boolean;
    removeAtSign: boolean;
    alternatives?: AlternativeTagOptions[];
}
