import { CoverageExtractorInfo } from '../doc-coverage/CoverageExtractorInfo';
import { CoverageResult } from '../doc-coverage/CoverageResult';
export interface SourceFileCoverageInfo {
    details: CoverageExtractorInfo[];
    items: number;
    documented: CoverageResult;
    undocumented: CoverageResult;
}
