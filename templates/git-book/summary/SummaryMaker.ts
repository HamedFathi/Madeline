import { ItemKind } from './ItemKind';
import { exportAssignmentSummaryMaker } from './ExportAssignmentSummaryMaker';
import { destructuringSummaryMaker } from './DestructuringSummaryMaker';
import { functionSummaryMaker } from './FunctionSummaryMaker';
import { classSummaryMaker } from './ClassSummaryMaker';
import * as _ from 'lodash';
import { ExportedSourceFileInfo } from '../../../extractors/source-file/ExportedSourceFileInfo';
import { SummaryInfo } from './SummaryInfo';
import { tab } from '../../../utilities/StringUtils';
import { SummaryMapInfo } from './SummaryMapInfo';
import { TypeCategory } from '../../../extractors/common/TypeCategory';
import { PathInfo } from '../../../utilities/PathInfo';
import { interfaceSummaryMaker } from './InterfaceSummaryMaker';
import { enumSummaryMaker } from './EnumSummaryMaker';
import { typeAliasSummaryMaker } from './TypeAliasSummaryMaker';
import { literalSummaryMaker } from './LiteralSummaryMaker';
import { variableSummaryMaker } from './VariableSummaryMaker';
import { ExportedSourceFileToMdConverter } from '../markdown/source/ExportedSourceFileToMdConverter';
import * as fse from 'fs-extra';
import { NodeToMdConverter } from './NodeToMdConverter';
import { typeMapper } from '../markdown/type/TypeMapper';

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
    private exportedSourceFileToMdConverter: ExportedSourceFileToMdConverter = new ExportedSourceFileToMdConverter();

    private getSummaryDetailInfo(
        sourceFile: ExportedSourceFileInfo,
        map: (
            id: string,
            pathInfo: PathInfo,
            category: TypeCategory,
            mdFileName: string,
            baseUrl?: string,
        ) => SummaryMapInfo,
        baseUrl?: string,
    ): SummaryMapInfo[] {
        const SummaryMapInfo: SummaryMapInfo[] = [];
        if (sourceFile.classes) {
            const classes = classSummaryMaker(sourceFile.classes, map, baseUrl);
            for (const iterator of classes) {
                SummaryMapInfo.push(iterator);
            }
        }
        if (sourceFile.interfaces) {
            const interfaces = interfaceSummaryMaker(sourceFile.interfaces, map, baseUrl);
            for (const iterator of interfaces) {
                SummaryMapInfo.push(iterator);
            }
        }
        if (sourceFile.enums) {
            const enums = enumSummaryMaker(sourceFile.enums, map, baseUrl);
            for (const iterator of enums) {
                SummaryMapInfo.push(iterator);
            }
        }
        if (sourceFile.typeAliases) {
            const typeAliases = typeAliasSummaryMaker(sourceFile.typeAliases, map, baseUrl);
            for (const iterator of typeAliases) {
                SummaryMapInfo.push(iterator);
            }
        }
        if (sourceFile.functions) {
            const functions = functionSummaryMaker(sourceFile.functions, map, baseUrl);
            for (const iterator of functions) {
                SummaryMapInfo.push(iterator);
            }
        }
        if (sourceFile.variables) {
            const variables = variableSummaryMaker(sourceFile.variables, map, baseUrl);
            for (const iterator of variables) {
                SummaryMapInfo.push(iterator);
            }
        }
        if (sourceFile.literals) {
            const literals = literalSummaryMaker(sourceFile.literals, map, baseUrl);
            for (const iterator of literals) {
                SummaryMapInfo.push(iterator);
            }
        }
        if (sourceFile.destructuring) {
            const destructuring = destructuringSummaryMaker(sourceFile.destructuring, map, baseUrl);
            for (const iterator of destructuring) {
                SummaryMapInfo.push(iterator);
            }
        }
        if (sourceFile.exportAssignments) {
            const assigns = exportAssignmentSummaryMaker(sourceFile.exportAssignments, map, baseUrl);
            for (const iterator of assigns) {
                SummaryMapInfo.push(iterator);
            }
        }
        return SummaryMapInfo;
    }

    private beautifyName(name: string): string {
        if (name.length <= 3) {
            return name.toUpperCase();
        } else {
            return _.startCase(name.replace(/-/g, ' ')).replace(/\s+/g, '');
        }
    }

    public getSummaryGroup(
        sourceFile: ExportedSourceFileInfo,
        map: (
            id: string,
            pathInfo: PathInfo,
            category: TypeCategory,
            mdFileName: string,
            baseUrl?: string,
        ) => SummaryMapInfo,
        baseUrl?: string,
    ): SummaryMapInfo[][] {
        const SummaryMapInfo = this.getSummaryDetailInfo(sourceFile, map, baseUrl);
        const summaryGroup = _(SummaryMapInfo)
            .sortBy(x => x.folders)
            .groupBy(x => x.folders)
            .values()
            .value();
        return summaryGroup;
    }

    public make(
        sourceFile: ExportedSourceFileInfo,
        baseUrl: string,
        map: (
            id: string,
            pathInfo: PathInfo,
            category: TypeCategory,
            mdFileName: string,
            baseUrl?: string,
        ) => SummaryMapInfo,
        fileExtension = '.md',
        generalMdName = 'README',
    ): SummaryInfo[] {
        let result: SummaryInfo[] = [];
        const summaryGroup = this.getSummaryGroup(sourceFile, map, baseUrl);
        for (const summaryInfo of summaryGroup) {
            const parents = summaryInfo[0].folders;
            const parentsInfo = parents.join('/').toLowerCase();
            const title = this.beautifyName(parents[parents.length - 1]);
            const x =
                parents.length <= 1
                    ? undefined
                    : [...parents]
                        .splice(0, parents.length - 1)
                        .join('/')
                        .toLowerCase();
            const summaryInfoData = {
                id: undefined,
                parent: x,
                baseUrl: baseUrl,
                level: parents.length - 1,
                extension: fileExtension,
                title: title,
                scope: parentsInfo,
                url: parents.join('/') + '/' + generalMdName,
                itemKind: parents.length <= 1 ? ItemKind.Root : ItemKind.MiddleItems,
                node: undefined,
                markdownText: undefined,
            };
            result.push(summaryInfoData);
            const sortedSummaryInfo = _(summaryInfo)
                .sortBy(x => x.category, x => x.mdFileName)
                .groupBy(x => x.category)
                .values()
                .value();
            for (const summary of sortedSummaryInfo) {
                const category = summary[0].category;
                const parentsWithCategoryInfo = [...parents, category].join('/').toLowerCase();
                const sortedSummaryInfoData = {
                    id: undefined,
                    parent: parentsInfo,
                    baseUrl: baseUrl,
                    level: parents.length,
                    extension: fileExtension,
                    title: category,
                    scope: parentsWithCategoryInfo,
                    url: parents.join('/') + '/' + category.toLowerCase() + '/' + generalMdName,
                    itemKind: ItemKind.MiddleItems,
                    node: undefined,
                    markdownText: undefined,
                };
                result.push(sortedSummaryInfoData);
                for (const s of summary) {
                    const summaryData = {
                        id: s.id,
                        parent: parentsWithCategoryInfo,
                        baseUrl: baseUrl,
                        level: parents.length + 1,
                        extension: fileExtension,
                        title: s.mdFileName,
                        scope: [parentsWithCategoryInfo, s.mdFileName].join('/').toLowerCase(),
                        url: s.path,
                        itemKind: ItemKind.LastItem,
                        node: s.node,
                        markdownText: NodeToMdConverter(s.node, sourceFile, typeMapper, baseUrl),
                    };
                    result.push(summaryData);
                }
            }
        }
        result.forEach(node => {
            node.children = result.filter(x => x.parent === node.scope);
        });
        result = result.filter(x => !x.parent);
        return result;
    }

    public createSummary(summaryInfos: SummaryInfo[]): string {
        let summaryMD = '';
        summaryInfos.forEach(el => {
            summaryMD += this.convertToMD(el);
        });

        const baseUrl = summaryInfos[0].baseUrl as string;
        const regex = new RegExp(baseUrl, `g`);

        return summaryMD.replace(regex, '');
    }
    private convertToMD(summary: SummaryInfo): string {
        let result = '';
        const url = `${summary.level ? summary.baseUrl : ''}${summary.url}`;
        result = `${tab(summary.level)}* [${summary.title}](${url})\n`;

        if (summary.children && summary.children.length > 0) {
            for (const child of summary.children) {
                summary.markdownText = (summary.markdownText || '') + this.convertToMD(child);
                if (child.itemKind !== 2) {
                    result += summary.markdownText || '';
                }
            }
        }

        return `${result}`;
    }

    public save(summaryInfos: SummaryInfo[]) {
        summaryInfos.forEach(el => {
            this.saveMdFiles(el);
        });
    }
    private saveMdFiles(summary: SummaryInfo) {
        fse.outputFileSync(`packages/${summary.url}.md`, summary.markdownText);

        if (summary.children) {
            for (const child of summary.children) {
                this.saveMdFiles(child);
            }
        }
    }
}
