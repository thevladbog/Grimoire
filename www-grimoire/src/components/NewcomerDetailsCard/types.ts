import { ICorporateInfo, IRelatedEmployee, IRelatedRequest } from 'src/types/types.ts';

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
  CorporateInfo?: ICorporateInfo
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

