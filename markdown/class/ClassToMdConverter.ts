import * as json2md from 'json2md';
import { ClassInfo } from '../../extractors/class/ClassInfo';

export class ClassToMdConverter {
    public convert(classInfo: ClassInfo): string {
        const md = json2md([
            {
                h2: classInfo.name,
            },
        ]);
        return md;
    }
}

