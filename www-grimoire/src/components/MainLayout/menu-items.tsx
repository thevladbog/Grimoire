import { MenuItem } from '@gravity-ui/navigation'
import {
  CircleCheck,
  Comment,
  Comments,
  Display,
  PersonMagnifier,
  Plus,
  Printer,
} from '@gravity-ui/icons'
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
} from 'src/configs/pages.config.ts'

//import { USER_ROLES } from "../../../../shared/types.ts";

export const menuItemsShowcase: MenuItem[] = [
  {
    id: SdNewcomersPageConfig.id,
    title: SdNewcomersPageConfig.title,
    link: SdNewcomersPageConfig.link,
    icon: PersonMagnifier,
    onItemClick({ id, title, current }) {
      alert(JSON.stringify({ id, title, current }))
    },
  },
  {
    id: SmsLogsPageConfig.id,
    title: SmsLogsPageConfig.title,
    link: SmsLogsPageConfig.link,
    icon: Comments,
    onItemClick({ id, title, current }) {
      alert(JSON.stringify({ id, title, current }))
    },
  },
  {
    id: EquipmentPageConfig.id,
    title: EquipmentPageConfig.title,
    link: EquipmentPageConfig.link,
    icon: Display,
    onItemClick({ id, title, current }) {
      alert(JSON.stringify({ id, title, current }))
    },
  },
  {
    id: LabelsPageConfig.id,
    title: LabelsPageConfig.title,
    link: LabelsPageConfig.link,
    icon: Printer,
    onItemClick({ id, title, current }) {
      alert(JSON.stringify({ id, title, current }))
    },
  },
  {
    id: CheckInPageConfig.id,
    title: CheckInPageConfig.title,
    link: CheckInPageConfig.link,
    icon: CircleCheck,
    onItemClick({ id, title, current }) {
      alert(JSON.stringify({ id, title, current }))
    },
  },
  {
    id: SdNewNewcomersPageConfig.id,
    title: SdNewNewcomersPageConfig.title,
    type: 'action',
    link: SdNewNewcomersPageConfig.link,
    icon: Plus,
    afterMoreButton: true,
    onItemClick({ id, title, current }) {
      alert(JSON.stringify({ id, title, current }))
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
    link: HrNewcomersPageConfig.link,
    icon: PersonMagnifier,
    onItemClick({ id, title, current }) {
      alert(JSON.stringify({ id, title, current }))
    },
  },
  {
    id: HrNewNewcomersPageConfig.id,
    title: HrNewNewcomersPageConfig.title,
    link: HrNewNewcomersPageConfig.link,
    type: 'action',
    icon: Plus,
    afterMoreButton: true,
    onItemClick({ id, title, current }) {
      alert(JSON.stringify({ id, title, current }))
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
    link: SendSmsPageConfig.link,
    icon: Comment,
    onItemClick({ id, title, current }) {
      alert(JSON.stringify({ id, title, current }))
    },
  },
]

export const text: string = `
Did you attend? He sang by grove ripe -
The bard of love, the singer of his mourning.
When fields were silent by the early morning,
To sad and simple sounds of a pipe
Did you attend?

Did you behold in dark of forest leaf
The bard of love, the singer of his sadness?
The trace of tears, the smile, the utter paleness,
The quiet look, full of eternal grief,
Did you behold?

Then did you sigh when hearing how cries
The bard of love, the singer of his dole?
When in the woods you saw the young man, sole,
And met the look of his extinguished eyes,
Then did you sigh?
`
