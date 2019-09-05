import { CoverageResult } from './CoverageResult';

export interface CoverageCalculatorInfo {
    items: number;
    documented: CoverageResult;
    undocumented: CoverageResult;
}
