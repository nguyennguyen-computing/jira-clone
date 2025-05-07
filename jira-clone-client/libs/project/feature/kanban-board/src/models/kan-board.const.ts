export enum IssueStatus {
  BACKLOG = 'Backlog',
  SELECTED = 'Selected',
  IN_PROGRESS = 'InProgress',
  DONE = 'Done',
}

export const IssueStatusDisplay = {
  [IssueStatus.BACKLOG]: 'Backlog',
  [IssueStatus.SELECTED]: 'Selected for Development',
  [IssueStatus.IN_PROGRESS]: 'In progress',
  [IssueStatus.DONE]: 'Done',
};
