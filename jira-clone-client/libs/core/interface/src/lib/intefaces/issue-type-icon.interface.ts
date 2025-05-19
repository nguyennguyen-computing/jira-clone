import { IssueType } from '../constant/issue.const';
import { IssueUtil } from '@jira-clone/util';

export class IssueTypeWithIcon {
  value: IssueType;
  icon: string;

  constructor(issueType: IssueType) {
    this.value = issueType;
    this.icon = IssueUtil.getIssueTypeIcon(issueType);
  }
}
