export enum EventState {
  APPROVED = 'APPROVED',
  EVALUATE_APPROVAL = 'EVALUATE_APPROVAL',
  UNKNOWN = 'UNKNOWN'
}

export interface EvaluationItem {
  org: string,
  repo: string,
  id: number,
  commit: string,
  status?: EventState;
}
