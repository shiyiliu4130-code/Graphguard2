
export enum PageType {
  OVERVIEW = 'system-overview',
  FRAUD_DETECT = 'fraud-detect',
  MANAGE = 'system-manage'
}

export interface RiskLevelInfo {
  type: string;
  class: string;
  confidence: string;
  description: string;
}

export interface FeatureStepInfo {
  title: string;
  desc: string;
  features: number[];
}
