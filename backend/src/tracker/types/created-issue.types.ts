export interface ICreatedIssue {
  self: string
  id: string
  key: string
  version: number
  summary: string
  statusStartTime: string
  updatedBy: UpdatedBy
  statusType: any
  description: string
  type: Type
  priority: Priority
  createdAt: string
  createdBy: CreatedBy
  commentWithoutExternalMessageCount: number
  votes: number
  commentWithExternalMessageCount: number
  queue: Queue
  updatedAt: string
  status: Status
  parent: Parent
  favorite: boolean
}

export interface UpdatedBy {
  self: string
  id: string
  display: string
  cloudUid: string
}

export interface Type {
  self: string
  id: string
  key: string
  display: string
}

export interface Priority {
  self: string
  id: string
  key: string
  display: string
}

export interface CreatedBy {
  self: string
  id: string
  display: string
  cloudUid: string
}

export interface Queue {
  self: string
  id: string
  key: string
  display: string
}

export interface Status {
  self: string
  id: string
  key: string
  display: string
}

export interface Parent {
  self: string
  id: string
  key: string
  display: string
}
