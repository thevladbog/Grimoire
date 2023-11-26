import { USER_ROLES } from '../../../shared/types.ts'

export interface IPageConfig {
  id: string;
  link: string;
  permission: USER_ROLES[];
  title: string;
}
