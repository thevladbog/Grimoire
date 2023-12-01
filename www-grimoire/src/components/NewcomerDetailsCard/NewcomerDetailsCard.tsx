import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { Card, Button, Icon, Tabs, Label, Table, TableColumnConfig } from '@gravity-ui/uikit';

import { ChevronsDown, Book } from '@gravity-ui/icons';
import styles from './NewcomerDetailsCard.module.scss';
import { dateTimeParse } from "@gravity-ui/date-utils";


enum Statuses {
  toCreate = 'outlined-success',
  created = 'outlined-warning',
  rejected = 'outlined-danger'
}

enum TabsId {
  first = 'first',
  second = 'second',
  third = 'third',
  forth = 'forth'
}
interface IButtonStatuses {
  finalForm: Statuses,
  finalFormDisabled: boolean,
  secCheck: Statuses,
  secCheckDisabled: boolean,
  account: Statuses,
  accountDisabled: boolean,
  equipment: Statuses,
  equipmentDisabled: boolean,
  done: Statuses
  doneDisabled: boolean
}

interface IDataOfRequests {
  id: string,
  title: string,
  status: string,
  lastModified: Date
}

const InitialButtonStatuses: IButtonStatuses = {
  finalForm: Statuses.toCreate,
  finalFormDisabled: false,
  secCheck: Statuses.toCreate,
  secCheckDisabled: true,
  account: Statuses.toCreate,
  accountDisabled: true,
  equipment: Statuses.toCreate,
  equipmentDisabled: true,
  done: Statuses.toCreate,
  doneDisabled: true
}

const MockRequests: IDataOfRequests[] = [
  {
    id: 'EQUIPMENT-123',
    title: 'Подготовка оборудования',
    status: 'В работе',
    lastModified: new Date()
  },
  {
    id: 'ACCESSES-25',
    title: 'Доступ в Jira Atlassian',
    status: 'Готово',
    lastModified: new Date()
  }
]

export const NewcomerDetailsCard = () => {
  const [buttonStatuses, setButtonStatuses] = useState<IButtonStatuses>(InitialButtonStatuses)
  const [activeTab, setActiveTab] = useState<TabsId>(TabsId.first)
  const { id } = useParams();
  
  const columns: TableColumnConfig<IDataOfRequests>[] = [
    {
      id: 'id',
      name: 'Request #',
    },
    {
      id: 'title',
      name: 'Title',
    },
    {
      id: 'status',
      name: 'Status',
      template: (item) => <Label>{item.status}</Label>,
    },
    {
      id: 'lastModified',
      name: 'Last Modified',
      template: (item) => dateTimeParse(item.lastModified)?.format('HH:mm DD.MM.YYYY'),
    },
  ];
  
  useEffect(() => {
    setButtonStatuses(InitialButtonStatuses)
  }, []);

  return (
    <>
      <h1>Newcomer's details</h1>
      <div className={styles.wrapper}>
        <div className={styles.label}>
          <Label theme="info" type="copy" copyText={`NewcomerID=${id}`} icon={<Icon data={Book} size={16} />} >Page #{id}</Label>
        </div>
        <Card view="raised" type="container">
          <div className={styles.mainData}>

            <div className={styles.leftContent}>
              <div className={styles.description}>Name:</div>
              <div className={styles.mainNewcomerData}>Иван</div>
              <div className={styles.description}>Middle name:</div>
              <div className={styles.mainNewcomerData}>Сергеевич</div>
              <div className={styles.description}>Surname:</div>
              <div className={styles.mainNewcomerData}>Курило</div>
              <div className={styles.description}>Job title:</div>
              <div className={styles.mainNewcomerData}>Разработчик</div>
              <div className={styles.description}>Start date:</div>
              <div className={styles.mainNewcomerData}>22.05.2024</div>
              <div className={styles.description}>Manager:</div>
              <div className={styles.mainNewcomerData}>
                Борисенков Иван Сергеевич
              </div>
              <div className={styles.description}>Recruiter</div>
              <div className={styles.mainNewcomerData}>
                Колющая Марагарита Павловна
              </div>
            </div>

            <div className={styles.rightContent}>
              <div className={styles.statusButton}>
                <Button width="max" pin="circle-circle" view={buttonStatuses.finalForm} disabled={buttonStatuses.finalFormDisabled}>
                  Send finalist form
                </Button>
              </div>
              <div className={styles.statusIcon}>
                <Icon data={ChevronsDown} size={20} />
              </div>
              <div className={styles.statusButton}>
                <Button width="max" pin="circle-circle" view={buttonStatuses.secCheck} disabled={buttonStatuses.secCheckDisabled}>
                  Security check and Compliance check
                </Button>
              </div>
              <div className={styles.statusIcon} >
                <Icon data={ChevronsDown} size={20} />
              </div>
              <div className={styles.statusButton}>
                <Button width="max" pin="circle-circle" view={buttonStatuses.account} disabled={buttonStatuses.accountDisabled}>
                  Create an Account and Coordinate equipment
                </Button>
              </div>
              <div className={styles.statusIcon}>
                <Icon data={ChevronsDown} size={20} />
              </div>
              <div className={styles.statusButton}>
                <Button width="max" pin="circle-circle" view={buttonStatuses.equipment} disabled={buttonStatuses.equipmentDisabled}>
                  Prepare equipment and access
                </Button>
              </div>
              <div className={styles.statusIcon}>
                <Icon data={ChevronsDown} size={20} />
              </div>
              <div className={styles.statusButton}>
                <Button width="max" pin="circle-circle" view={buttonStatuses.done} disabled={buttonStatuses.doneDisabled} >
                  The employee arrived, the equipment was issued
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className={styles.additionalData}>
          <Card view="raised" type="container">
            <div className={styles.tabs}>
              <Tabs
                size="xl"
                activeTab={activeTab}
                onSelectTab={(tabId: TabsId) => {setActiveTab(tabId)}}
                items={[
                 {id: 'first', title: 'Details'},
                 {id: 'second', title: 'Corporate data'},
                 {id: 'third', title: 'Requests'},
                 {id: 'fourth', title: 'History', disabled: true},
                ]}
              />
            </div>
            {activeTab === TabsId.first &&
              <div className={styles.detailedData}>
                <div className={styles.detailedBlock}>
                  <h3>Паспорт</h3>
                  <p>Серия: <Label theme="clear" type="copy" copyText={`0304`} >03 04</Label></p>
                  <p>Номер: </p>
                  <p>Кем выдан: </p>
                  <p>Дата выдачи: </p>
                </div>
                <div className={styles.detailedBlock}>
                  <h3>СНИЛС</h3>
                  <p>Номер: 158-369-365 03</p>
                </div>
                <div className={styles.detailedBlock}>
                  <h3>ИНН</h3>
                  <p>Номер: </p>
                </div>
              </div>
            }
            
            {activeTab === TabsId.second &&
              <div className={styles.detailedData}>
                <div className={styles.detailedBlock}>
                  <h3>Корпоративные данные</h3>
                  <p>Логин: </p>
                  <p>Домен: </p>
                  <p>Электронный адрес: </p>
                </div>
              </div>
            }
            
            {activeTab === TabsId.third &&
              <div className={styles.statusesTable}>
                <Table
                  columns={columns}
                  data={MockRequests}
                />
              </div>
            }
          </Card>
        </div>
      </div>
    </>
  );
};
