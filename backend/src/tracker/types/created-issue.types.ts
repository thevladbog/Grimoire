export interface ICreatedIssue {
  self: string;
  id: string;
  key: string;
  version: number;
  lastCommentUpdatedAt?: string;
  summary: string;
  parent?: Parent;
  aliases?: string[];
  updatedBy: UpdatedBy;
  description?: string;
  sprint?: Sprint[];
  type: Type;
  priority: Priority;
  createdAt: string;
  followers?: Follower[];
  createdBy: CreatedBy;
  votes: number;
  assignee?: Assignee;
  queue: Queue;
  updatedAt: string;
  status: Status;
  previousStatus?: PreviousStatus;
  favorite?: boolean;
}

export interface Parent {
  self: string;
  id: string;
  key: string;
  display: string;
}

export interface UpdatedBy {
  self: string;
  id: string;
  display: string;
}

export interface Sprint {
  self: string;
  id: string;
  display: string;
}

export interface Type {
  self: string;
  id: string;
  key: string;
  display: string;
}

export interface Priority {
  self: string;
  id: string;
  key: string;
  display: string;
}

export interface Follower {
  self: string;
  id: string;
  display: string;
}

export interface CreatedBy {
  self: string;
  id: string;
  display: string;
}

export interface Assignee {
  self: string;
  id: string;
  display: string;
}

export interface Queue {
  self: string;
  id: string;
  key: string;
  display: string;
}

export interface Status {
  self: string;
  id: string;
  key: string;
  display: string;
}

export interface PreviousStatus {
  self: string;
  id: string;
  key: string;
  display: string;
}
