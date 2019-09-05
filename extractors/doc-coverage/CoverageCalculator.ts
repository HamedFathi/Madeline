import { CoverageExtractorInfo } from './CoverageExtractorInfo';
import { CoverageCalculatorInfo } from './CoverageCalculatorInfo';

export class CoverageCalculator {
    constructor(private extractorInfo: CoverageExtractorInfo[]) {}

    public calculate(): CoverageCalculatorInfo {
        const all = this.extractorInfo.length;
        let docCounter = 0;
        let leadingCounter = 0;
        let trailingCounter = 0;
        let jsDocCounter = 0;
        let unLeadingCounter = 0;
        let unTrailingCounter = 0;
        let unJsDocCounter = 0;
        this.extractorInfo.forEach(x => {
            const hasDoc = x.hasLeadingComment || x.hasTrailingComment || x.hasJsDoc;
            const hasLeadingDoc = x.hasLeadingComment;
            const hasTrailingDoc = x.hasTrailingComment;
            const hasJsDoc = x.hasJsDoc;
            if (hasDoc) {
                docCounter++;
            }
            if (hasLeadingDoc) {
                leadingCounter++;
            } else {
                unLeadingCounter++;
            }
            if (hasTrailingDoc) {
                trailingCounter++;
            } else {
                unTrailingCounter++;
            }
            if (hasJsDoc) {
                jsDocCounter++;
            } else {
                unJsDocCounter++;
            }
        });

        const docPercent = (docCounter * 100) / all;
        const unDocPercent = 100 - docPercent;

        return {
            items: all,
            documented: {
                count: docCounter,
                jsDoc: jsDocCounter,
                leading: leadingCounter,
                trailing: trailingCounter,
                percent: docPercent,
            },
            undocumented: {
                count: all - docCounter,
                jsDoc: unJsDocCounter,
                leading: unLeadingCounter,
                trailing: unTrailingCounter,
                percent: unDocPercent,
            },
        };
    }
}
