import { SourceFileInfo } from '../../../extractors/source-file/SourceFileInfo';
import { TemplateOptions } from '../../TemplateOptions';
import { InterfaceInfo } from '../../../extractors/interface/InterfaceInfo';

export class InterfaceMaker {
    public make(interfaces: InterfaceInfo[], options: TemplateOptions): string {
        const lines: string[] = [];
        interfaces.forEach(i => {});
        return '';
    }
}
