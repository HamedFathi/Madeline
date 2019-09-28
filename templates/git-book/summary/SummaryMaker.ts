import { SourceFileInfo } from '../../../extractors/source-file/SourceFileInfo';
import { TemplateOptions } from '../../TemplateOptions';

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
*/

export class SummaryMaker {
  public make(sourceFiles: SourceFileInfo[], options: TemplateOptions): string {
    let lines: string[] = [];
    sourceFiles.forEach(source => {

    });
    return '';
  }
}