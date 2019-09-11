import { ClassDeclaration } from 'ts-morph';
import * as json2md from 'json2md';

export class ClassToMarkdown {
    public make(node: ClassDeclaration): string {
        const md = json2md([{ h1: '' }]);
        return '';
    }
}
