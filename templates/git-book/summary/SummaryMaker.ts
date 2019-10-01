import { SourceFileInfo } from '../../../extractors/source-file/SourceFileInfo';
import { TemplateOptions } from '../../TemplateOptions';
import * as _ from 'lodash';
import { NamedExportInfo } from '../../../extractors/export/NamedExportInfo';
import { MergedSourceFileInfo } from '../../../extractors/source-file/MergedSourceFileInfo';
import { ClassSummaryMaker } from './ClassSummaryMaker';
import { PathInfo } from '../../../utilities/PathInfo';

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
    constructor(private classMaker = new ClassSummaryMaker()) {}

    public make(sourceFile: MergedSourceFileInfo, route: (path: PathInfo) => string): string {
        const lines: string[] = [];
        if (sourceFile.classes) {
            const classes = this.classMaker.make(sourceFile.classes, route);
            for (const c of classes) {
                lines.push(c);
            }
        }
        return lines.join('\n');
    }
}
