export type WorkloadStatus = 'detected' | 'inferred' | 'confirmed';

export interface WorkloadItem {
  id: string;
  name: string;
  type: string;
  runtime: string;
  rps: string;
  status: WorkloadStatus;
  entrypoint: string;
  evidence: {
    file: string;
    line?: number;
    match: string;
  };
  dependencies: string[];
  specs: {
    cpu: string;
    memory: string;
    port: number;
    scaling: string;
  };
}

export interface ArchitectureCandidate {
  id: 'cost' | 'balanced' | 'perf';
  name: string;
  tagline: string;
  recommended?: boolean;
  monthlyCost: number;
  availability: string;
  scalability: string;
  performance: string;
  complexity: string;
  security: string;
  computeType: string;
  databaseType: string;
  caching: string;
  ingress: string;
  whyExplanation: {
    workloadFit: string;
    requirementsAlignment: string;
    budgetReasoning: string;
    operationalComplexity: string;
    alternativesRejected: string[];
  };
}

export interface CostCategoryItem {
  category: string;
  serviceName: string;
  baseCost: number;
  scale5xCost: number;
  description: string;
}

export interface GeneratedFileItem {
  path: string;
  language: string;
  badge: string;
  content: string;
}

export interface ValidationItem {
  id: string;
  target: string;
  category: string;
  passed: boolean;
  message: string;
  details: string;
}

export interface BlockerItem {
  id: string;
  title: string;
  category: 'runtime' | 'config' | 'secret';
  severity: 'blocking' | 'warning';
  description: string;
  options: string[];
  resolvedOption?: string;
  resolved: boolean;
}
