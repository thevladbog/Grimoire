import React, { FC, useState, useRef, useEffect } from 'react';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Icon } from '@gravity-ui/uikit';
import {
  AsideHeader,
  AsideHeaderTopAlertProps,
  FooterItem,
} from '@gravity-ui/navigation';
import { cn } from 'src/utils/cn.ts';
import { ClassNameFormatter } from '@bem-react/classname';

import {
  CheckInPageConfig,
  EquipmentPageConfig,
  HrNewcomersPageConfig,
  HrNewNewcomersPageConfig,
  LabelsPageConfig,
  SdNewcomersPageConfig,
  SdNewNewcomersPageConfig,
  SendSmsPageConfig,
  SmsLogsPageConfig,
} from 'src/configs/pages.config.ts';

import {
  Bug,
  CircleCheck,
  Comment,
  Comments,
  Display,
  Gear,
  PersonMagnifier,
  Plus,
  Printer,
} from '@gravity-ui/icons';
import LogoIcon from 'src/assets/img/Grimoire_icon.svg';

import './MainLayout.scss';
import { ActionBarSingleSection } from 'src/components/ActionBar/ActionBarWithBreadcrumbs.tsx';

enum Panel {
  ProjectSettings = 'projectSettings',
  Search = 'search',
  UserSettings = 'userSettings',
  Components = 'components',
}

interface AsideHeaderShowcaseProps {
  multipleTooltip?: boolean;
  initialCompact?: boolean;
}

const ASIDE_HEADER_ICON_SIZE: number = 18;

const b: ClassNameFormatter = cn('aside-header-showcase');

export const AsideHeaderShowcase: FC<AsideHeaderShowcaseProps> = ({
  multipleTooltip = false,
  initialCompact = false,
}) => {
  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  //const [subheaderPopupVisible, setSubheaderPopupVisible] = React.useState<boolean>(false);
  const [visiblePanel, setVisiblePanel] = useState<Panel>();
  const [compact, setCompact] = useState<boolean>(initialCompact);
  const [currentItem, setCurrentItem] = useState<string>();

  const topAlert: AsideHeaderTopAlertProps = {
    view: 'filled',
    message: 'The site is under development',
    centered: true,
    dense: true,
    theme: 'danger',
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentItem(location.pathname);
  }, [location.pathname]);

  return (
    <nav className={b()}>
      <AsideHeader
        ref={ref}
        logo={{
          text: () => <p className="main__logo-text">Grimoire</p>,
          iconSrc: LogoIcon,
          href: '/',
          iconSize: 40,
          onClick: () => alert('click on logo'),
        }}
        headerDecoration={true}
        menuItems={[
          {
            id: SdNewcomersPageConfig.id,
            title: SdNewcomersPageConfig.title,
            current: SdNewcomersPageConfig.link === currentItem,
            icon: PersonMagnifier,
            onItemClick() {
              navigate(SdNewcomersPageConfig.link);
            },
          },
          {
            id: SmsLogsPageConfig.id,
            title: SmsLogsPageConfig.title,
            current: SmsLogsPageConfig.link === currentItem,
            icon: Comments,
            onItemClick() {
              navigate(SmsLogsPageConfig.link);
            },
          },
          {
            id: EquipmentPageConfig.id,
            title: EquipmentPageConfig.title,
            current: EquipmentPageConfig.link === currentItem,
            icon: Display,
            onItemClick() {
              navigate(EquipmentPageConfig.link);
            },
          },
          {
            id: LabelsPageConfig.id,
            title: LabelsPageConfig.title,
            current: LabelsPageConfig.link === currentItem,
            icon: Printer,
            onItemClick() {
              navigate(LabelsPageConfig.link);
            },
          },
          {
            id: CheckInPageConfig.id,
            title: CheckInPageConfig.title,
            current: CheckInPageConfig.link === currentItem,
            icon: CircleCheck,
            onItemClick() {
              navigate(CheckInPageConfig.link);
            },
          },
          {
            id: SdNewNewcomersPageConfig.id,
            title: SdNewNewcomersPageConfig.title,
            type: 'action',
            icon: Plus,
            afterMoreButton: true,
            onItemClick() {
              navigate(SdNewNewcomersPageConfig.link);
            },
          },
          {
            id: 'hrDivider',
            title: '-',
            type: 'divider',
          },
          {
            id: HrNewcomersPageConfig.id,
            title: HrNewcomersPageConfig.title,
            current: HrNewcomersPageConfig.link === currentItem,
            icon: PersonMagnifier,
            onItemClick() {
              navigate(HrNewcomersPageConfig.link);
            },
          },
          {
            id: HrNewNewcomersPageConfig.id,
            title: HrNewNewcomersPageConfig.title,
            type: 'action',
            icon: Plus,
            afterMoreButton: true,
            onItemClick() {
              navigate(HrNewNewcomersPageConfig.link);
            },
          },
          {
            id: 'smsDivider',
            title: '-',
            type: 'divider',
          },
          {
            id: SendSmsPageConfig.id,
            title: SendSmsPageConfig.title,
            current: SendSmsPageConfig.link === currentItem,
            icon: Comment,
            onItemClick() {
              navigate(SendSmsPageConfig.link);
            },
          },
        ]}
        subheaderItems={[]}
        compact={compact}
        topAlert={topAlert}
        multipleTooltip={multipleTooltip}
        renderFooter={({ compact, asideRef }) => (
          <React.Fragment>
            <FooterItem
              compact={compact}
              item={{
                id: 'infra',
                icon: Gear,
                current: popupVisible,
                title: (
                  <div className={b('infra-text')}>
                    <span className={b('infra-label')}>Minor issue</span>
                    <span className={b('infra-period')}>Now</span>
                  </div>
                ),
                tooltipText: 'Minor issue (Now)',
                onItemClick: () => {
                  setVisiblePanel(undefined);
                  setPopupVisible(!popupVisible);
                },
              }}
              enableTooltip={false}
              popupVisible={popupVisible}
              popupAnchor={asideRef}
              popupPlacement={['right-end']}
              popupOffset={[-20, 10]}
              onClosePopup={() => setPopupVisible(false)}
              popupKeepMounted={true}
              renderPopupContent={() => {
                return (
                  <div className={b('settings')}>
                    <ul className={b('settings-ul')}>
                      <li>Set 1</li>
                      <li>Set 2</li>
                      <li>Set 3</li>
                      <li>Set 4</li>
                    </ul>
                  </div>
                );
              }}
            />
            <FooterItem
              item={{
                id: 'project-settings',
                title: 'Settings with panel',
                tooltipText: (
                  <div>
                    <b>Settings with panel</b>
                  </div>
                ),
                current: visiblePanel === Panel.ProjectSettings,
                itemWrapper: (params, makeItem) =>
                  makeItem({
                    ...params,
                    icon: <Icon data={Bug} size={ASIDE_HEADER_ICON_SIZE} />,
                  }),
                onItemClick: () => {
                  setVisiblePanel(
                    visiblePanel === Panel.ProjectSettings
                      ? undefined
                      : Panel.ProjectSettings,
                  );
                },
              }}
              bringForward
              compact={compact}
            />
            <FooterItem
              item={{
                id: 'user-settings',
                icon: Gear,
                title: 'User Settings with panel',
                tooltipText: 'User Settings with panel',
                current: visiblePanel === Panel.UserSettings,
                onItemClick: () => {
                  setVisiblePanel(
                    visiblePanel === Panel.UserSettings
                      ? undefined
                      : Panel.UserSettings,
                  );
                },
              }}
              compact={compact}
            />
          </React.Fragment>
        )}
        renderContent={() => {
          return (
            <>
              <ActionBarSingleSection />
              <Outlet />
            </>
          );
        }}
        panelItems={[
          {
            id: 'search',
            content: <div className={b('search-panel')}>Search panel</div>,
            visible: visiblePanel === Panel.Search,
          },
          {
            id: 'project-settings',
            content: (
              <div className={b('settings-panel')}>Project Settings</div>
            ),
            visible: visiblePanel === Panel.ProjectSettings,
          },
          {
            id: 'user-settings',
            content: <div className={b('settings-panel')}>User Settings</div>,
            visible: visiblePanel === Panel.UserSettings,
          },
          {
            id: 'components',
            content: <div className={b('components-panel')}>Components</div>,
            visible: visiblePanel === Panel.Components,
          },
        ]}
        onClosePanel={() => setVisiblePanel(undefined)}
        onChangeCompact={(v) => {
          setCompact(v);
        }}
      />
    </nav>
  );
};
