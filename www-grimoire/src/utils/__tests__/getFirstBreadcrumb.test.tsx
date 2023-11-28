import { Location } from 'react-router-dom';
import {
  getFirstBreadcrumb,
  IFirstBreadcrumb,
} from 'src/utils/getFirstBreadcrumb.ts';
import { EquipmentPageConfig } from 'src/configs/pages.config.ts';

it('Get first breadcrumb', () => {
  const mockLocation: Location = {
    hash: '',
    key: 'uqgfy9v5',
    pathname: '/sd/equipment',
    search: '',
    state: null,
  };

  const mockResult: IFirstBreadcrumb = {
    title: EquipmentPageConfig.title,
    link: EquipmentPageConfig.link,
  };

  expect(getFirstBreadcrumb(mockLocation)).toEqual(mockResult);
});
