import { User } from "./user.interface";

export class JComment {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  issueId: string;
  userId: string;
  user: User;

  constructor(issueId: string, user: User) {
    const now = new Date();
    this.id = `${now.getTime()}`;
    this.issueId = issueId;
    this.user = user;
    this.createdAt = now.toISOString();
    this.updatedAt = now.toISOString();
    this.body = '';
    this.userId = user._id;
  }
}
