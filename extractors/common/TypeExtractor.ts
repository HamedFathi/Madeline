import { ImportInfo } from './../import/ImportInfo';
import { TypeInfo } from './TypeInfo';
import { Type, TypeNode, TypeGuards, Node } from 'ts-morph';
import { FromTypeInfo } from './FromTypeInfo';
import { removeFirstAndLastQuote } from '../../utilities/StringUtils';

export class TypeExtractor {
    private getAllRelatedImports(type: Type): string {
        const intersectionTypes = type.getIntersectionTypes().map(x => x.getText());
        const tupleTypes = type.getTupleElements().map(x => x.getText());
        const unionTypes = type.getUnionTypes().map(x => x.getText());
        const allRelatedImports = intersectionTypes.join(' ') + ' ' + tupleTypes.join(' ') + ' ' + unionTypes.join(' ');
        return allRelatedImports;
    }
    private getInvolvedTypesAsString(node: Node): string[] {
        const result: string[] = [];
        const types = new Set<Type>();
        node.forEachDescendant(descendant => {
            if (TypeGuards.isTypedNode(descendant) || TypeGuards.isIdentifier(descendant))
                types.add(descendant.getType());
            else if (TypeGuards.isReturnTypedNode(descendant)) types.add(descendant.getReturnType());
        });
        types.forEach(type => {
            if (!type.isAny() && !type.isUnknown() && !type.isNull() && !type.isNullable()) {
                result.push(type.getText());
            }
        });
        return result;
    }

    private getInvolvedTypes(node: Node): Type[] {
        const result: Type[] = [];
        const types = new Set<Type>();
        node.forEachDescendant(descendant => {
            if (TypeGuards.isTypedNode(descendant) || TypeGuards.isIdentifier(descendant))
                types.add(descendant.getType());
            else if (TypeGuards.isReturnTypedNode(descendant)) types.add(descendant.getReturnType());
        });
        types.forEach(type => {
            if (!type.isAny() && !type.isUnknown() && !type.isNull() && !type.isNullable()) {
                result.push(type);
            }
        });
        return result;
    }

    private getInvolvedTypesAsFromTypeInfo(node: Node): FromTypeInfo[] | undefined {
        const data = this.getInvolvedTypesAsString(node);
        const result = this.getFromTypeInfo(data);
        return result;
    }
    private getFromTypeInfo(typeText: string[]): FromTypeInfo[] | undefined {
        const result: FromTypeInfo[] = [];
        const text = typeText.join(' ');
        const regex = /import\((.+?)\)\.([^;>,\[\]\)\(<{}&!\s]+)/gm;
        const allImports = text.match(regex);
        if (allImports) {
            allImports.forEach(imp => {
                const rgx = /import\((.+?)\)\.(.+)/g;
                const groups = rgx.exec(imp);
                if (groups) {
                    const gr0: string = removeFirstAndLastQuote(groups[0] as string);
                    const gr1: string = removeFirstAndLastQuote(groups[1] as string);
                    const gr2: string = removeFirstAndLastQuote(groups[2] as string);
                    const dir: string = gr1.substring(0, gr1.lastIndexOf('/'));
                    const file: string = gr1.replace(dir, '').substring(1);
                    const from: FromTypeInfo = {
                        import: gr0,
                        path: gr1,
                        type: gr2,
                        directory: dir,
                        file: file,
                        importAliases: undefined,
                    };
                    result.push(from);
                }
            });
        }
        return result.length === 0 ? undefined : result;
    }

    public extract(
        type: Type,
        typeNode: TypeNode | undefined,
        typeReference: string | undefined,
        imports: ImportInfo[] | undefined,
    ): TypeInfo {
        let value = '';
        const regex = /import\((.+?)\)\.([^;>,\[\]\)\(<{}&!\s]+)/gm;
        const text = type.getText();
        const typeNodeText = typeNode === void 0 ? void 0 : typeNode.getText();
        const fromAll: FromTypeInfo[] = [];
        const allImports = (text + ' ' + this.getAllRelatedImports(type)).match(regex);
        // Priorities
        // 1. typeReference
        // 2. typeNodeText
        // 3. text
        if (typeReference) {
            value = typeReference;
        } else if (typeNodeText) {
            value = typeNodeText;
        } else {
            value = text.replace(regex, '');
        }
        if (allImports) {
            allImports.forEach(imp => {
                const rgx = /import\((.+?)\)\.(.+)/g;
                const groups = rgx.exec(imp);
                if (groups) {
                    const gr0: string = removeFirstAndLastQuote(groups[0] as string);
                    const gr1: string = removeFirstAndLastQuote(groups[1] as string);
                    const gr2: string = removeFirstAndLastQuote(groups[2] as string);
                    const dir: string = gr1.substring(0, gr1.lastIndexOf('/'));
                    const file: string = gr1.replace(dir, '').substring(1);
                    const importAliases: string[] = [];
                    if (imports) {
                        const aliases = imports.filter(x => x.name === gr2 && x.alias);
                        if (aliases && aliases.length > 0) {
                            aliases.forEach(item => {
                                importAliases.push(item.alias as string);
                            });
                        }
                    }
                    const from: FromTypeInfo = {
                        import: gr0,
                        path: gr1,
                        type: gr2,
                        directory: dir,
                        file: file,
                        importAliases: importAliases.length === 0 ? void 0 : importAliases,
                    };
                    const isIncluded = fromAll.filter(x => x.import === gr0).length > 0;
                    if (!isIncluded) {
                        fromAll.push(from);
                    }
                }
            });
        }
        return {
            value: value,
            text: text,
            typeNodeText: typeNodeText,
            typeReference: typeReference,
            from: fromAll.length === 0 ? void 0 : fromAll,
        };
    }
}
