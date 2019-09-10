import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, EnumDeclaration, FunctionDeclaration } from 'ts-morph';
import { FunctionInfo } from '../../../extractors/function/FunctionInfo';
import { FunctionExtractor } from '../../../extractors/function/FunctionExtractor';
import { StringUtils } from '../../../utilities/StringUtils';

const funcSample = `
function addNumbers(...numbers:number[]) {}
export function addNumbers() {}
function calculate(price:number,rate:number = 0.50) {}
export default function buildName(firstName: string, lastName?: string) {}
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {}
async function asyncCall() {}
`;

describe('Function Extractor', function () {
    it('should return correct FunctionInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", funcSample);
        let actualResult: FunctionInfo[] = [];
        let expectedResult: FunctionInfo[] = [];

        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.FunctionDeclaration:
                    let funcEx = new FunctionExtractor();
                    let func = funcEx.extract(<FunctionDeclaration>x);
                    actualResult.push(func);
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});

