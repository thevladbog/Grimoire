export interface IDetailedData {
  id: number
  name: string
  middleName: string
  surname: string
  email: string
  mobile: string
  jobTitle: string
  firstDay: string
  createdAt: string
  updatedAt: string
  RelatedEmployees?: IRelatedEmployee[]
  Equipments?:IEquipment[]
  Accesses?: IAccess[]
  RelatedRequests?: IRelatedRequest[]
}

export interface IRelatedEmployee {
  id: number
  type?: string
  name: string
  newcId: number
  createdAt: string
  updatedAt: string
}

export interface IEquipment {
  id: number
  type?: string
  qty?: number
  comment?: string
  internalId: string
  requestId?: string
  requestStatus?: string
  newcId: number
  createdAt: string
  updatedAt: string
}

export interface IAccess {
  id: number
  system?: string
  role?: string
  comment?: string
  internalId: string
  requestId?: string
  requestStatus?: string
  newcId: number
  createdAt: string
  updatedAt: string
}

export interface IRelatedRequest {
  id: number
  type: string
  requestId: string
  requestStatus: string
  title: string
  lastModified: string
  newcId: number
  createdAt: string
  updatedAt: string
}
