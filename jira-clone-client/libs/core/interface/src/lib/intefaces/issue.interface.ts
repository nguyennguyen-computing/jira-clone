import { IssueType } from "../constant/issue.const";
import { User } from "./user.interface";

export interface IssueCreate {
  _id?: string;
  title: string;
  description: string;
  type: IssueType;
  status: string;
  priority: string;
  listPosition: number;
  projectId: string;
  reporterId: User;
  userIds: User[];
}
