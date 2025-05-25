import { IssuePriority, IssuePriorityColors } from "../constant/issue.const";


export class IssuePriorityIcon {
  icon: string;
  value: IssuePriority;
  color: string;

  constructor(issuePriority: IssuePriority) {
    const lowerPriorities = [IssuePriority.LOW, IssuePriority.LOWEST];
    this.value = issuePriority;
    this.icon = lowerPriorities.includes(issuePriority) ? 'arrow-down' : 'arrow-up';
    this.color = IssuePriorityColors[issuePriority];
  }
}
