import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, EnumDeclaration, InterfaceDeclaration } from 'ts-morph';
import { InterfaceInfo } from '../../../extractors/interface/InterfaceInfo';
import { StringUtils } from '../../../utilities/StringUtils';
import { InterfaceExtractor } from '../../../extractors/interface/InterfaceExtractor';

const interfaceSample = `
export default interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
export interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
    set(name: string,obj: {a:'A'}): number;
}
interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}
interface Circle {
    new(n: string): Shape;
}
`;


describe('Interface Extractor', function () {
    it('should return correct InterfaceInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", interfaceSample);
        let actualResult: InterfaceInfo[] = [];
        let expectedResult: InterfaceInfo[] = [];

        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.InterfaceDeclaration:
                    let interfaceEx = new InterfaceExtractor();
                    let interfaces = interfaceEx.extract(<InterfaceDeclaration>x);
                    actualResult.push(interfaces);
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});