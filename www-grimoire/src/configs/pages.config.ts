import { IPageConfig } from 'src/types/types.ts'
import { USER_ROLES } from '../../../shared/types.ts'

export const MainPageConfig: IPageConfig = {
  id: 'main',
  link: '/',
  permission: [],
  title: 'Grimoire',
}

export const SdNewcomersPageConfig: IPageConfig = {
  id: 'sdNewcomers',
  link: '/sd/newcomers',
  title: 'Newcomers',
  permission: [
    USER_ROLES.ADMIN,
    USER_ROLES.SERVICE_DESK,
    USER_ROLES.SERVICE_DESK_ELEVATED,
  ],
}

export const SmsLogsPageConfig: IPageConfig = {
  id: 'sdSmsLogs',
  link: '/sd/sms-logs',
  title: 'SMS Logs',
  permission: [USER_ROLES.ADMIN, USER_ROLES.SERVICE_DESK_ELEVATED],
}

export const EquipmentPageConfig: IPageConfig = {
  id: 'equipment',
  link: '/sd/equipment',
  title: 'Equipment',
  permission: [
    USER_ROLES.ADMIN,
    USER_ROLES.SERVICE_DESK,
    USER_ROLES.SERVICE_DESK_ELEVATED,
  ],
}

export const LabelsPageConfig: IPageConfig = {
  id: 'labels',
  link: '/sd/print-labels',
  title: 'Print labels',
  permission: [
    USER_ROLES.ADMIN,
    USER_ROLES.SERVICE_DESK,
    USER_ROLES.SERVICE_DESK_ELEVATED,
  ],
}

export const CheckInPageConfig: IPageConfig = {
  id: 'checkIn',
  link: '/sd/check-in',
  title: 'Check-In',
  permission: [
    USER_ROLES.ADMIN,
    USER_ROLES.SERVICE_DESK,
    USER_ROLES.SERVICE_DESK_ELEVATED,
  ],
}

export const SdNewNewcomersPageConfig: IPageConfig = {
  id: 'sdNewNewcomers',
  link: '/sd/newcomers/new',
  title: '[SD] Create Newcomer',
  permission: [
    USER_ROLES.ADMIN,
    USER_ROLES.SERVICE_DESK,
    USER_ROLES.SERVICE_DESK_ELEVATED,
  ],
}

export const HrNewcomersPageConfig: IPageConfig = {
  id: 'hrNewcomers',
  link: '/hr/newcomers',
  title: 'Newcomers',
  permission: [
    USER_ROLES.ADMIN,
    USER_ROLES.STAFF_ADMIN,
    USER_ROLES.RECRUITER,
    USER_ROLES.RECRUITER_MANAGER,
  ],
}
export const HrNewNewcomersPageConfig: IPageConfig = {
  id: 'hrNewNewcomers',
  link: '/hr/newcomers/new',
  title: '[HR] Create Newcomer',
  permission: [
    USER_ROLES.ADMIN,
    USER_ROLES.RECRUITER,
    USER_ROLES.RECRUITER_MANAGER,
  ],
}

export const SendSmsPageConfig: IPageConfig = {
  id: 'sms',
  link: '/sms',
  title: 'Send SMS',
  permission: [
    USER_ROLES.ADMIN,
    USER_ROLES.STAFF_ADMIN,
    USER_ROLES.RECRUITER,
    USER_ROLES.RECRUITER_MANAGER,
    USER_ROLES.SERVICE_DESK,
    USER_ROLES.SERVICE_DESK_ELEVATED,
  ],
}
