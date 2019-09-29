import { SourceFile } from 'ts-morph';
import { ExportInfo } from './ExportInfo';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';

export class ExportExtractor {
    public extract(sourceFile: SourceFile): ExportInfo[] | undefined {
        const result = sourceFile.getExportDeclarations().map(x => {
            return {
                text: x.getText(),
                hasComment:
                    new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length !== 0 ||
                    new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length !== 0,
                trailingComments:
                    new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()).length === 0
                        ? void 0
                        : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                leadingComments:
                    new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                        ? void 0
                        : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                moduleSpecifier: x.getModuleSpecifierValue(),
                hasAsterisk: x.getNamedExports().length === 0,
                namedExports:
                    x.getNamedExports().length === 0
                        ? void 0
                        : x.getNamedExports().map(y => {
                              return {
                                  name: y.getName(),
                                  alias: y.getSymbol() === void 0 ? void 0 : y.getSymbolOrThrow().getName(),
                              };
                          }),
            };
        });
        return result.length === 0 ? void 0 : result;
    }
}
