import { User } from "./user.interface";

export interface IssueCreate {
  _id?: string;
  title: string;
  description: string;
  type: string;
  status: string;
  priority: string;
  listPosition: number;
  projectId: string;
  reporterId: string;
  userIds: User[];
}
