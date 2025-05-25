import { IssuePriority, IssueStatus, IssueType } from "../constant/issue.const";
import { User } from "./user.interface";

export interface CommentHistory {
  id: string;
  body: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  issueId: string;
  user: User;
  body: string;
  createdAt: string;
  updatedAt: string;
  history?: CommentHistory[]; // Optional for @for example
}
export interface IssueCreate {
  _id?: string;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  priority: IssuePriority;
  listPosition: number;
  projectId: string;
  reporterId: User;
  userIds: User[];
  comments?: Comment[];
  createdAt?: string;
  updatedAt?: string;
}
