import { SourceFile } from 'ts-morph';
import { ExportInfo } from './ExportInfo';
import { TypescriptCommentExtractor } from '../comment/TypescriptCommentExtractor';
import { getPathInfo } from '../../utilities/PathUtils';
import { getSha256 } from '../../utilities/HashUtils';
export class ExportExtractor {
    public extract(sourceFile: SourceFile): ExportInfo[] | undefined {
        const result = sourceFile.getExportDeclarations().map(x => {
            const pathInfo = getPathInfo(x.getSourceFile().getFilePath());
            return {
                id: getSha256(x.getFullText() + pathInfo.path),
                path: pathInfo.path,
                directory: pathInfo.directory,
                file: pathInfo.file,
                extension: pathInfo.extension,
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
                                  alias:
                                      y.getSymbol() === void 0
                                          ? void 0
                                          : y.getName() === y.getSymbolOrThrow().getName()
                                          ? void 0
                                          : y.getSymbolOrThrow().getName(),
                              };
                          }),
            };
        });
        return result.length === 0 ? void 0 : result;
    }
}
