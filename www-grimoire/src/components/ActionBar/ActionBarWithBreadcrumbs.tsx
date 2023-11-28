import { Breadcrumbs, ClipboardButton } from '@gravity-ui/uikit';
import { ActionBar } from '@gravity-ui/navigation';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFirstBreadcrumb } from 'src/utils/getFirstBreadcrumb.ts';

export function ActionBarSingleSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const firstBreadcrumb = getFirstBreadcrumb(location);

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
}
