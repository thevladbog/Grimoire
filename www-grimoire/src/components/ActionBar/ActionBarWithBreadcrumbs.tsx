import { Breadcrumbs, ClipboardButton } from '@gravity-ui/uikit';
import { ActionBar } from '@gravity-ui/navigation';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getFirstBreadcrumb,
  IFirstBreadcrumb,
} from 'src/utils/getFirstBreadcrumb.ts';
import { FC } from 'react';
import { NavigateFunction } from 'react-router';

export const ActionBarSingleSection: FC = () => {
  const location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const firstBreadcrumb: IFirstBreadcrumb = getFirstBreadcrumb(location);

  return (
    <ActionBar>
      <ActionBar.Section type="primary">
        <ActionBar.Group>
          <ActionBar.Item>
            <Breadcrumbs
              lastDisplayedItemsCount={1}
              items={[
                {
                  text: firstBreadcrumb.title,
                  action() {
                    navigate(firstBreadcrumb.link);
                  },
                },
                { text: 'Under development', action() {} },
              ]}
              firstDisplayedItemsCount={1}
            />
          </ActionBar.Item>

          <ActionBar.Item spacing={false}>
            <ClipboardButton size={16} text={'Under development'} />
          </ActionBar.Item>
        </ActionBar.Group>
      </ActionBar.Section>
    </ActionBar>
  );
};
