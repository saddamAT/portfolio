export interface MetricItem {
  label: string;
  value: string;
  subtext?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  role: string;
  company: string;
  period: string;
  flagshipBadge?: string;
  techStack: string[];
  problem: string;
  contributions: string[];
  architectureFlow: {
    step: string;
    description: string;
    subtext: string;
  }[];
  impact: {
    metric: string;
    label: string;
  }[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  active?: boolean;
  bulletPoints: string[];
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
}

export interface ActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  submissionId?: string;
}

export interface PipelineStep {
  step: number;
  name: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'PASSED' | 'FLAGGED';
  latencyMs: number;
  details: string;
}

export interface PipelineExecutionResult {
  executionId: string;
  status: string;
  totalLatencyMs: number;
  steps: PipelineStep[];
  summary: string;
}
