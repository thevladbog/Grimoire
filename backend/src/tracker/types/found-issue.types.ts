export interface IFoundIssue {
  self: string
  id: string
  key: string
  version: number
  statusStartTime: string
  components?: Component[]
  statusType: any
  sprint?: Sprint[]
  resolvedBy?: ResolvedBy
  project?: Project
  description?: string
  boards?: Board[]
  type: Type
  resolution?: Resolution
  previousStatusLastAssignee: PreviousStatusLastAssignee
  createdAt: string
  commentWithExternalMessageCount: number
  updatedAt: string
  storyPoints?: number
  summary: string
  updatedBy: UpdatedBy
  resolvedAt?: string
  priority: Priority
  createdBy: CreatedBy
  commentWithoutExternalMessageCount: number
  unique: string
  votes: number
  assignee: Assignee
  queue: Queue
  status: Status
  previousStatus?: PreviousStatus
  favorite: boolean
}

interface Component {
  self: string
  id: string
  display: string
}

interface Sprint {
  self: string
  id: string
  display: string
}

interface ResolvedBy {
  self: string
  id: string
  display: string
  cloudUid: string
  passportUid: number
}

interface Project {
  self: string
  id: string
  display: string
}

interface Board {
  id: number
}

interface Type {
  self: string
  id: string
  key: string
  display: string
}

interface Resolution {
  self: string
  id: string
  key: string
  display: string
}

interface PreviousStatusLastAssignee {
  self: string
  id: string
  display: string
  cloudUid: string
  passportUid: number
}

interface UpdatedBy {
  self: string
  id: string
  display: string
  cloudUid: string
  passportUid: number
}

interface Priority {
  self: string
  id: string
  key: string
  display: string
}

interface CreatedBy {
  self: string
  id: string
  display: string
  cloudUid: string
  passportUid: number
}

interface Assignee {
  self: string
  id: string
  display: string
  cloudUid: string
  passportUid: number
}

interface Queue {
  self: string
  id: string
  key: string
  display: string
}

interface Status {
  self: string
  id: string
  key: string
  display: string
}

interface PreviousStatus {
  self: string
  id: string
  key: string
  display: string
}

export interface IPayload {
  summary: string
  queue: string | number
  description: string
  parent?: string
}
