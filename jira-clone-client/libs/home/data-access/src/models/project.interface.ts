export interface ProjectResponse {
  _id: string;
  name: string;
  owner: string;
  url?: string;
  description?: string;
  category?: string;
  users: string[];
  issues: string[];
  status: string;
  priority: string;
  budget?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectRequest {
  name: string;
  owner: string;
  url?: string;
  description?: string;
  category?: string;
  users: string[];
  issues: string[];
  status: string;
  priority: string;
  budget?: string;
  endDate?: string;
}

export interface ListProjectResponse {
  projects: ProjectResponse[];
  total: number;
}
