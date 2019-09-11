import * as json2md from 'json2md';
import { ModuleInfo } from '../../extractors/module/ModuleInfo';
import { PrettierUtils } from '../../utilities/PrettifierUtils';
import { Const } from '../Const';

export class ModuleToMdConverter {
    private readonly HYPHEN = '-';
    private readonly NAMESPACE = '`namespace`';
    private readonly MODULE = '`module`';
    private readonly SEPARATOR = ', ';
    private readonly TITLE = 'MODULE';
    private readonly SOURCE = 'Source';
    private readonly INFORMATION = 'Information';
    private readonly TS = 'ts';
    private readonly HEADERS = ['name', 'type', 'modifiers'];
    public convert(moduleInfo: ModuleInfo[]): string[] {
        const result: string[] = [];
        for (let index = moduleInfo.length - 1; index >= 0; index--) {
            const module = moduleInfo[index];
            const modifiers =
                module.modifiers === undefined
                    ? this.HYPHEN
                    : module.modifiers.map(x => '`' + x + '`').join(this.SEPARATOR);
            const type = module.isNamespace ? this.NAMESPACE : this.MODULE;
            const text = new PrettierUtils().prettify(module.text).split(/\r?\n/);
            const md = json2md([
                {
                    h3: this.TITLE,
                },
                {
                    h5: this.INFORMATION,
                },
                {
                    table: {
                        headers: this.HEADERS,
                        rows: [[module.name, type, modifiers]],
                    },
                },
                {
                    h5: this.SOURCE,
                },
                {
                    code: {
                        language: this.TS,
                        content: text,
                    },
                },
            ]);
            result.push(md);
        }
        return result;
    }
}
