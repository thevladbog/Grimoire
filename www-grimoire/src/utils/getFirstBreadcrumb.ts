import type { Location } from 'react-router-dom';
import { allPagesConfigs } from '../configs/pages.config.ts';
import { IPageConfig } from 'src/types/types.ts';

export interface IFirstBreadcrumb {
  title: string
  link: string
}
export const getFirstBreadcrumb = (location: Location): IFirstBreadcrumb => {
  const firstBreadcrumb: IFirstBreadcrumb = {  title: "",
    link: ""};

  allPagesConfigs.forEach((config: IPageConfig) => {
    if (config.link === location.pathname) {
      firstBreadcrumb.title = config.title;
      firstBreadcrumb.link = config.link;
      return;
    }
  });

  return firstBreadcrumb;
};
