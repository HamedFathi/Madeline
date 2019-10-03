import { exportAssignmentSummaryMaker } from './ExportAssignmentSummaryMaker';
import { destructuringSummaryMaker } from './DestructuringSummaryMaker';
import { functionSummaryMaker } from './FunctionSummaryMaker';
import { classSummaryMaker } from './ClassSummaryMaker';
import * as _ from 'lodash';
import { ExportedSourceFileInfo } from '../../../extractors/source-file/ExportedSourceFileInfo';
import { SummaryInfo } from './SummaryInfo';
import { tab } from '../../../utilities/StringUtils';
import { SummaryDetailInfo } from './SummaryDetailInfo';
import { SummaryCategory } from './SummaryCategory';
import { PathInfo } from '../../../utilities/PathInfo';
import { interfaceSummaryMaker } from './InterfaceSummaryMaker';
import { enumSummaryMaker } from './EnumSummaryMaker';
import { typeAliasSummaryMaker } from './TypeAliasSummaryMaker';
import { literalSummaryMaker } from './LiteralSummaryMaker';
import { variableSummaryMaker } from './VariableSummaryMaker';

/*
# Table of contents
* [Why Aurelia](README.md)
* [Kernel](kernel/README.md)
  * [DI](kernel/di/README.md)
    * [Enums](kernel/di/enums/README.md)
      * [ResolverStrategy](kernel/di/enums/resolverstrategy.md)
    * [Functions](kernel/di/functions/README.md)
      * [createResolver](kernel/di/functions/createresolver.md)
      * [transientDecorator](kernel/di/functions/transientdecorator.md)
  * [Event Aggregator](kernel/eventaggregator/README.md)
    * [Type Aliases](kernel/eventaggregator/type-aliases/README.md)
      * [EventAggregatorCallback](kernel/eventaggregator/type-aliases/eventaggregatorcallback.md)
      
https://gitbook-18.gitbook.io/au/kernel/di/functions/transientdecorator

* package (kernel)
  * category (class, enum, ...)
    * item1
    * item2
    * item3

'Sorted alphabetically'

*** Use `export` blocks for filling the below information and of course, sort alphabetically.

* classes => (Table of content - list of all items with URL) 
  * items here (comment, constructor, type, type-parameter, module, decorator)
    * get-accessors (Table of content - list of all items with URL) 
      * items here (comment, constructor, type, type-parameter, decorator)
    * set-accessors (Table of content - list of all items with URL)  
      * items here (comment, type, type-parameter, decorator)
    * methods (Table of content - list of all items with URL) 
      * items here (comment, type, type-parameter, decorator)
    * properties (Table of content - list of all items with URL) 
      * items here (comment, type, decorator)
* variables (Table of content - list of all with URL)
  * 'all common items here'
  * literals (Table of content - list of 'literals' with URL)
    * 'object and array items here'
  * destructuring (Table of content - list of 'destructuring' with URL)
    * items here
* enums (Table of content - list of all items with URL) 
  * items here (comment, type, module)
* export-assignments (Table of content - list of all items with URL) 
  * items here (comment, type, module)
* functions (Table of content - list of all items with URL) 
  * items here (comment, constructor, type, type-parameter, decorator)
* interfaces (Table of content - list of all items with URL) 
  * items [property,method,call signature,indexer,constructor] here (comment, type, type-parameter, decorator)
* type-aliases (Table of content - list of all items with URL)
  * items here (comment, type, type-parameter, decorator)
---------------------
- comment
- coverage (separated product)
- decorator
- type
- type-parameter
- module

*/

export class SummaryMaker {
    private getSummaryDetailInfo(
        sourceFile: ExportedSourceFileInfo,
        map: (
            id: string,
            pathInfo: PathInfo,
            category: SummaryCategory,
            mdFileName: string,
            baseUrl?: string,
        ) => SummaryDetailInfo,
        baseUrl?: string,
    ): SummaryDetailInfo[] {
        const summaryDetailInfo: SummaryDetailInfo[] = [];
        if (sourceFile.classes) {
            const classes = classSummaryMaker(sourceFile.classes, map, baseUrl);
            for (const iterator of classes) {
                summaryDetailInfo.push(iterator);
            }
        }
        if (sourceFile.interfaces) {
            const interfaces = interfaceSummaryMaker(sourceFile.interfaces, map, baseUrl);
            for (const iterator of interfaces) {
                summaryDetailInfo.push(iterator);
            }
        }
        if (sourceFile.enums) {
            const enums = enumSummaryMaker(sourceFile.enums, map, baseUrl);
            for (const iterator of enums) {
                summaryDetailInfo.push(iterator);
            }
        }
        if (sourceFile.typeAliases) {
            const typeAliases = typeAliasSummaryMaker(sourceFile.typeAliases, map, baseUrl);
            for (const iterator of typeAliases) {
                summaryDetailInfo.push(iterator);
            }
        }
        if (sourceFile.functions) {
            const functions = functionSummaryMaker(sourceFile.functions, map, baseUrl);
            for (const iterator of functions) {
                summaryDetailInfo.push(iterator);
            }
        }
        if (sourceFile.variables) {
            const variables = variableSummaryMaker(sourceFile.variables, map, baseUrl);
            for (const iterator of variables) {
                summaryDetailInfo.push(iterator);
            }
        }
        if (sourceFile.literals) {
            const literals = literalSummaryMaker(sourceFile.literals, map, baseUrl);
            for (const iterator of literals) {
                summaryDetailInfo.push(iterator);
            }
        }
        if (sourceFile.destructuring) {
            const destructuring = destructuringSummaryMaker(sourceFile.destructuring, map, baseUrl);
            for (const iterator of destructuring) {
                summaryDetailInfo.push(iterator);
            }
        }
        if (sourceFile.exportAssignments) {
            const assigns = exportAssignmentSummaryMaker(sourceFile.exportAssignments, map, baseUrl);
            for (const iterator of assigns) {
                summaryDetailInfo.push(iterator);
            }
        }
        return summaryDetailInfo;
    }

    private beatifyName(name: string): string {
        if (name.length <= 3) {
            return name.toUpperCase();
        } else {
            return _.startCase(name.replace(/-/g, ' ')).replace(/\s+/g, '');
        }
    }

    public make(
        sourceFile: ExportedSourceFileInfo,
        map: (
            id: string,
            pathInfo: PathInfo,
            category: SummaryCategory,
            mdFileName: string,
            baseUrl?: string,
        ) => SummaryDetailInfo,
        fileExtension = '.md',
        baseUrl?: string,
    ): SummaryInfo[] {
        const result: SummaryInfo[] = [];
        const summaryDetailInfo = this.getSummaryDetailInfo(sourceFile, map, baseUrl);
        const summaryGroup = _(summaryDetailInfo)
            .sortBy(x => x.folders)
            .groupBy(x => x.folders)
            .values()
            .value();
        for (const summaryInfo of summaryGroup) {
            const parents = summaryInfo[0].folders;
            result.push({
                id: undefined,
                baseUrl: baseUrl,
                level: parents.length - 1,
                extension: fileExtension,
                title: this.beatifyName(parents[parents.length - 1]),
                url: parents.join('/') + '/README' + fileExtension,
            });
            const sortedSummaryInfo = _(summaryInfo)
                .sortBy(x => x.category, x => x.mdFileName)
                .groupBy(x => x.category)
                .values()
                .value();
            for (const summary of sortedSummaryInfo) {
                const category = summary[0].category;
                result.push({
                    id: undefined,
                    baseUrl: baseUrl,
                    level: parents.length,
                    extension: fileExtension,
                    title: category,
                    url: parents.join('/') + '/' + category + '/README' + fileExtension,
                });
                for (const s of summary) {
                    result.push({
                        id: s.id,
                        baseUrl: baseUrl,
                        level: parents.length + 1,
                        extension: fileExtension,
                        title: s.mdFileName,
                        url: s.path + fileExtension,
                    });
                }
            }
        }
        return result;
    }

    public write(summaryInfo: SummaryInfo[], titles?: string[], baseUrl?: string): string {
        const result: string[] = [];
        if (titles) {
            for (const title of titles) {
                result.push(title);
            }
        }
        for (const summary of summaryInfo) {
            const url = baseUrl ? `${baseUrl}/${summary.url}` : `${summary.url}`;
            result.push(`${tab(summary.level)}* [${summary.title}](${url})`);
        }
        const output = result.join('\n');
        return output;
    }
}
