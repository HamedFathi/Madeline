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
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getTrailingCommentRanges()),
                leadingComments:
                    new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()).length === 0
                        ? undefined
                        : new TypescriptCommentExtractor().extract(x.getLeadingCommentRanges()),
                moduleSpecifier: x.getModuleSpecifierValue(),
                namedExports:
                    x.getNamedExports().length === 0
                        ? undefined
                        : x.getNamedExports().map(y => {
                              return {
                                  name: y.getName(),
                                  alias: y.getSymbol() === undefined ? undefined : y.getSymbolOrThrow().getName(),
                              };
                          }),
            };
        });
        return result.length === 0 ? undefined : result;
    }
}
