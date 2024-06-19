export interface TyInfo {
  title: string;
  description: string;
}

export enum Status {
  NONE,
  SUCCESS,
  WARN,
  ERROR,
}

export type OutcomeReport = {
  status: Status;
  description: string;
};
