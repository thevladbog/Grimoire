import React, { FC, useState, useRef } from 'react'
import { Button, Radio, RadioButton, Modal, Icon } from '@gravity-ui/uikit'
import {
  AsideHeader,
  AsideHeaderTopAlertProps,
  FooterItem,
} from '@gravity-ui/navigation'
import { cn } from 'src/utils/cn.ts'
import { menuItemsShowcase, text as placeholderText } from './menu-items.tsx'
import { MenuItem } from '@gravity-ui/navigation'
import { ClassNameFormatter } from '@bem-react/classname'

import { Bug, Gear } from '@gravity-ui/icons'
import LogoIcon from 'src/assets/img/Grimoire_icon.svg'

import './MainLayout.scss'

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

const ASIDE_HEADER_ICON_SIZE: number = 18

const b: ClassNameFormatter = cn('aside-header-showcase')

const BOOLEAN_OPTIONS = {
  Yes: 'yes',
  No: 'no',
}

export const AsideHeaderShowcase: FC<AsideHeaderShowcaseProps> = ({
  multipleTooltip = false,
  initialCompact = false,
}) => {
  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  //const [subheaderPopupVisible, setSubheaderPopupVisible] = React.useState<boolean>(false);
  const [visiblePanel, setVisiblePanel] = useState<Panel>()
  const [compact, setCompact] = useState<boolean>(initialCompact)
  const [headerDecoration, setHeaderDecoration] = useState<string>(
    BOOLEAN_OPTIONS.Yes
  )
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    ...menuItemsShowcase,
    {
      id: 'components',
      title: 'Components',
      icon: Gear,
      current: visiblePanel === Panel.Components,
      onItemClick: () =>
        setVisiblePanel(
          visiblePanel === Panel.Components ? undefined : Panel.Components
        ),
    },
  ])
  const topAlert: AsideHeaderTopAlertProps = {
    view: 'filled',
    message: 'The site is under development',
    centered: true,
    dense: true,
    theme: 'danger',
  }

  return (
    <div className={b()}>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={b('content')}>
          <pre>{placeholderText}</pre>
        </div>
      </Modal>
      <AsideHeader
        ref={ref}
        logo={{
          text: () => <p className="main__logo-text">Grimoire</p>,
          iconSrc: LogoIcon,
          href: '/',
          iconSize: 40,
          onClick: () => alert('click on logo'),
        }}
        headerDecoration={headerDecoration === BOOLEAN_OPTIONS.Yes}
        onMenuItemsChanged={setMenuItems}
        menuItems={menuItems}
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
                  setVisiblePanel(undefined)
                  setPopupVisible(!popupVisible)
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
                )
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
                      : Panel.ProjectSettings
                  )
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
                      : Panel.UserSettings
                  )
                },
              }}
              compact={compact}
            />
          </React.Fragment>
        )}
        renderContent={() => {
          return (
            <div className={b('content')}>
              <pre>{placeholderText}</pre>
              <RadioButton
                value={headerDecoration}
                onChange={(event) => {
                  setHeaderDecoration(event.target.value)
                }}
              >
                <Radio value={BOOLEAN_OPTIONS.No}>No</Radio>
                <Radio value={BOOLEAN_OPTIONS.Yes}>Yes</Radio>
              </RadioButton>
              <br />
              <br />
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            </div>
          )
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
          setCompact(v)
        }}
      />
    </div>
  )
}
