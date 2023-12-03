import { USER_ROLES } from '../../../shared/types.ts';

export interface IPageConfig {
  id: string;
  link: string;
  permission: USER_ROLES[];
  title: string;
}

export interface IListOfNewcomers {
  id: number
  name: string
  middleName: string
  surname: string
  email: string
  mobile: string
  jobTitle: string
  firstDay: string
  externalId: string
  createdAt: string
  updatedAt: string
  RelatedEmployees?: IRelatedEmployee[]
  CorporateInfo?: ICorporateInfo,
  RelatedRequests?: IRelatedRequest[]
}

export interface IRelatedEmployee {
  id: string
  type: string
  name: string
  newcId: number
  createdAt: string
  updatedAt: string
}

export interface ICorporateInfo {
  id: string
  nameEn: string
  corporateEmail: string
  domain: string
  login: string
  newcId: number
  createdAt: string
  updatedAt: string
}

export enum RequestsType {
  equipment = 'equipment',
  accesses = 'accesses',
  sec_check = 'sec_check',
  main = 'main',
  other = 'other',
}

export interface IRelatedRequest {
  id: string
  type: RequestsType
  requestId: string
  requestStatus: string
  title: string
  lastModified: string
  newcId: number
  createdAt: string
  updatedAt: string
}

