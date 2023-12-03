import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import axios, { AxiosResponse } from "axios";
import { dateTimeParse } from "@gravity-ui/date-utils";
import { Card, Button, Icon, Tabs, Label, Table, TableColumnConfig, Link, Skeleton } from '@gravity-ui/uikit';
import { formatPhoneNumberIntl } from 'react-phone-number-input'

import { ChevronsDown, Book, At, Smartphone, Calendar, PersonWorker, MagicWand } from '@gravity-ui/icons';
import { IAccess, IDetailedData, IEquipment} from "src/components/NewcomerDetailsCard/types.ts";

import styles from './NewcomerDetailsCard.module.scss';
import { IRelatedEmployee } from 'src/types/types.ts';


enum Statuses {
  toCreate = 'outlined-success',
  created = 'outlined-warning',
  rejected = 'outlined-danger'
}

enum TabsId {
  first = 'first',
  second = 'second',
  third = 'third',
  forth = 'forth',
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

interface MainRequestsTable extends IEquipment, IAccess {}

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
  const [ buttonStatuses, setButtonStatuses ] = useState<IButtonStatuses>(InitialButtonStatuses);
  const [ activeTab, setActiveTab ] = useState<TabsId>(TabsId.first);
  const [ detailedData, setDetailedData ] = useState<IDetailedData | undefined>(undefined);
  const [ mainRequests, setMainRequests ] = useState<MainRequestsTable[]>([]);
  const [ pageLoading, setPageLoading ] = useState<boolean>(false);
  const { id } = useParams();
  
  const additionalRequestsTable: TableColumnConfig<IDataOfRequests>[] = [
    {
      id: 'id',
      name: 'Запрос #',
    },
    {
      id: 'title',
      name: 'Заголовок',
    },
    {
      id: 'status',
      name: 'Статус',
      template: (item) => <Label>{ item.status }</Label>,
    },
    {
      id: 'lastModified',
      name: 'Последнее изм.',
      align: 'right',
      template: (item) => dateTimeParse(item.lastModified)?.format('HH:mm DD.MM.YYYY'),
    },
  ];
  
  const mainRequestsTable: TableColumnConfig<MainRequestsTable>[] = [
    {
      id: 'requestId',
      name: 'Запрос #',
      width: '15%',
    },
    {
      id: 'title',
      name: 'Заголовок',
      width: '55%',
      template: (item) => <p>[{ item.internalId }] { item.system || item.type }</p>,
    },
    {
      id: 'status',
      name: 'Статус',
      template: (item) => <Label>{ item.requestStatus || 'Не создана' }</Label>,
    },
    {
      id: 'lastModified',
      name: 'Последнее изм.',
      width: '23%',
      align: 'right',
      template: (item) => dateTimeParse(item.updatedAt)?.format('DD.MM.YYYY'),
    },
  ];
  
  useEffect(() => {
    setPageLoading(true);
    
    const url: string =
      import.meta.env.VITE_BACKEND_URL || 'https://sins.v-b.tech';
    const endpointUrl: URL = new URL(`/newcomers/${ id }`, url);
    axios.get<IDetailedData>(endpointUrl.href)
         .then((res: AxiosResponse<IDetailedData>) => {
             setDetailedData(res.data);
             
             const accessesRequests: MainRequestsTable[] | undefined = res.data.Accesses;
             const equipmentsRequests: MainRequestsTable[] | undefined = res.data.Equipments;
             const newMainRequestsData: MainRequestsTable[] = [];
             
             if (accessesRequests) {
               newMainRequestsData.push(...accessesRequests);
             }
             if (equipmentsRequests) {
               newMainRequestsData.push(...equipmentsRequests);
             }
             setMainRequests((newMainRequestsData));
           },
         ).finally(() => setPageLoading(false));
    
    setButtonStatuses(InitialButtonStatuses);
  }, [ id ]);
  
  let manager: IRelatedEmployee | undefined = undefined;
  if (detailedData && detailedData.RelatedEmployees) {
    manager = (detailedData.RelatedEmployees).find((item: IRelatedEmployee) => item.type === 'manager');
  }
  
  let recruiter: IRelatedEmployee | undefined = undefined;
  if (detailedData && detailedData.RelatedEmployees) {
    recruiter = (detailedData.RelatedEmployees).find((item: IRelatedEmployee) => item.type === 'recruiter');
  }
  
  return (
    <>
      { !pageLoading && <>
        { detailedData &&
          <>
            <h1>{ detailedData?.surname } { detailedData?.name } { detailedData?.middleName }'s details</h1>
            <div className={ styles.wrapper }>
              <div className={ styles.label }>
                <Label theme='info' type='copy' copyText={ `NewcomerID=${ id }` }
                       icon={ <Icon data={ Book } size={ 16 } /> }>Page
                  #{ id }</Label>
              </div>
              <Card view='raised' type='container'>
                <div className={ styles.mainData }>

                  <div className={ styles.leftContent }>
                    <div className={ styles.description }>Имя:</div>
                    <div className={ styles.mainNewcomerData }>{ detailedData?.name }</div>
                    <div className={ styles.description }>Отчество:</div>
                    <div className={ styles.mainNewcomerData }>{ detailedData?.middleName }</div>
                    <div className={ styles.description }>Фамилия:</div>
                    <div className={ styles.mainNewcomerData }>{ detailedData?.surname }</div>
                    <div className={ styles.description }>Должность:</div>
                    <div className={ styles.mainNewcomerData }>{ detailedData?.jobTitle }</div>
                    <div className={ styles.description }><Icon data={ Calendar } /> Первый день:</div>
                    <div
                      className={ styles.mainNewcomerData }>{ dateTimeParse(detailedData?.firstDay)?.format('DD.MM.YYYY') }</div>
                    <div className={ styles.description }><Icon data={ At } /> E-mail:</div>
                    <div className={ styles.mainNewcomerData }><Link
                      href={ `mailto:${ detailedData?.email }` }>{ detailedData?.email }</Link></div>
                    { detailedData?.mobile && <>
                      <div className={ styles.description }><Icon data={ Smartphone } /> Номер телефона:</div>
                      <div className={ styles.mainNewcomerData }><Link
                        href={ `tel:${ detailedData?.mobile }` }>{ formatPhoneNumberIntl(detailedData?.mobile) }</Link>
                      </div>
                    </> }
                    <div className={ styles.description }><Icon data={ PersonWorker } /> Руководитель:</div>
                    <div className={ styles.mainNewcomerData }>
                      { manager && manager.name }
                    </div>
                    <div className={ styles.description }><Icon data={ MagicWand } /> Рекрутер</div>
                    <div className={ styles.mainNewcomerData }>
                      { recruiter && recruiter.name }
                    </div>
                  </div>

                  <div className={ styles.rightContent }>
                    <div className={ styles.statusButton }>
                      <Button width='max' pin='circle-circle' view={ buttonStatuses.finalForm }
                              disabled={ buttonStatuses.finalFormDisabled }>
                        Send finalist form
                      </Button>
                    </div>
                    <div className={ styles.statusIcon }>
                      <Icon data={ ChevronsDown } size={ 20 } />
                    </div>
                    <div className={ styles.statusButton }>
                      <Button width='max' pin='circle-circle' view={ buttonStatuses.secCheck }
                              disabled={ buttonStatuses.secCheckDisabled }>
                        Security check and Compliance check
                      </Button>
                    </div>
                    <div className={ styles.statusIcon }>
                      <Icon data={ ChevronsDown } size={ 20 } />
                    </div>
                    <div className={ styles.statusButton }>
                      <Button width='max' pin='circle-circle' view={ buttonStatuses.account }
                              disabled={ buttonStatuses.accountDisabled }>
                        Create an Account and Coordinate equipment
                      </Button>
                    </div>
                    <div className={ styles.statusIcon }>
                      <Icon data={ ChevronsDown } size={ 20 } />
                    </div>
                    <div className={ styles.statusButton }>
                      <Button width='max' pin='circle-circle' view={ buttonStatuses.equipment }
                              disabled={ buttonStatuses.equipmentDisabled }>
                        Prepare equipment and access
                      </Button>
                    </div>
                    <div className={ styles.statusIcon }>
                      <Icon data={ ChevronsDown } size={ 20 } />
                    </div>
                    <div className={ styles.statusButton }>
                      <Button width='max' pin='circle-circle' view={ buttonStatuses.done }
                              disabled={ buttonStatuses.doneDisabled }>
                        The employee arrived, the equipment was issued
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <div className={ styles.additionalData }>
                <Card view='raised' type='container'>
                  <div className={ styles.tabs }>
                    <Tabs
                      size='xl'
                      activeTab={ activeTab }
                      onSelectTab={ (tabId: TabsId) => {
                        setActiveTab(tabId);
                      } }
                      items={ [
                        { id: 'first', title: 'Личная информация' },
                        { id: 'second', title: 'Корпоративная информация' },
                        { id: 'third', title: 'Запросы' },
                        { id: 'fourth', title: 'История', disabled: true },
                      ] }
                    />
                  </div>
                  { activeTab === TabsId.first &&
                    <div className={ styles.detailedData }>
                      <div className={ styles.detailedBlock }>
                        <h3>Паспорт</h3>
                        <p>Серия: <Label theme='clear' type='copy' copyText={ `0304` }>03 04</Label></p>
                        <p>Номер: </p>
                        <p>Кем выдан: </p>
                        <p>Дата выдачи: </p>
                      </div>
                      <div className={ styles.detailedBlock }>
                        <h3>СНИЛС</h3>
                        <p>Номер: 158-369-365 03</p>
                      </div>
                      <div className={ styles.detailedBlock }>
                        <h3>ИНН</h3>
                        <p>Номер: </p>
                      </div>
                    </div>
                  }
                  
                  { activeTab === TabsId.second &&
                    <div className={ styles.detailedData }>
                      <div className={ styles.detailedBlock }>
                        <h3>Корпоративные данные</h3>
                        <p>Логин: </p>
                        <p>Домен: </p>
                        <p>Электронный адрес: </p>
                      </div>
                    </div>
                  }
                  
                  { activeTab === TabsId.third &&
                    <div className={ styles.statusesTable }>
                      <div className={ styles.tablesBlock }>
                        <div className={ styles.tablesBlockMain }>
                          <h3>Основные запросы</h3>

                          <Table
                            columns={ mainRequestsTable }
                            data={ mainRequests }
                            wordWrap={ true }
                          /></div>
                      </div>

                      <div className={ styles.tablesBlock }>
                        <h3>Дополнительные запросы</h3>
                        <Table
                          columns={ additionalRequestsTable }
                          data={ MockRequests }
                        />
                      </div>
                    </div>
                  }
                </Card>
              </div>
            </div>
          </>
        }
        
        { !detailedData &&
          <>
            <h1>Oops! Something went wrong</h1>
            <h2>Shoo! Shoo!</h2>
          </>
        }
      </> }
      {pageLoading && <div className={styles.skeleton}>
        <Skeleton className={styles.skeletonName} />
        <Skeleton className={styles.skeletonItem} />
        <Skeleton className={styles.skeletonItem} />
      </div>}
    </>
  );
};
