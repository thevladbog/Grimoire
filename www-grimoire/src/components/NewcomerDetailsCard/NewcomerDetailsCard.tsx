import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from "axios";
import { dateTimeParse } from "@gravity-ui/date-utils";
import { Card, Button, Icon, Tabs, Label, Table, TableColumnConfig, Link, Skeleton } from '@gravity-ui/uikit';
import { formatPhoneNumberIntl } from 'react-phone-number-input'

import { ChevronsDown, Book, At, Smartphone, Calendar, PersonWorker, MagicWand, LogoYandexTracker } from '@gravity-ui/icons';

import { IAccess, IDetailedData, IEquipment} from "src/components/NewcomerDetailsCard/types.ts";
import { IRelatedEmployee, IRelatedRequest } from 'src/types/types.ts';

import styles from './NewcomerDetailsCard.module.scss';


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

export const NewcomerDetailsCard: FC = () => {
  const [ buttonStatuses, setButtonStatuses ] = useState<IButtonStatuses>(InitialButtonStatuses);
  const [ activeTab, setActiveTab ] = useState<TabsId>(TabsId.first);
  const [ detailedData, setDetailedData ] = useState<IDetailedData | undefined>(undefined);
  const [ mainRequests, setMainRequests ] = useState<MainRequestsTable[]>([]);
  const [ relatedRequests, setRelatedRequests ] = useState<IDataOfRequests[]>([]);
  const [ pageLoading, setPageLoading ] = useState<boolean>(false);
  
  const { id } = useParams();
  
  const additionalRequestsTable: TableColumnConfig<IDataOfRequests>[] = [
    {
      id: 'id',
      name: 'Запрос #',
      width: '30%',
      template: (item: IDataOfRequests) => <Label  icon={ <Icon data={ LogoYandexTracker } size={ 16 } /> } theme='unknown' onClick={() => window.open(`https://tracker.yandex.ru/${item.id}`, "_blank", "noreferrer")}>{ item.id }</Label>,
    },
    {
      id: 'title',
      name: 'Заголовок',
      width: '50%',
      template: (item: IDataOfRequests) => <div className={styles.text_with_dots}>{ item.title }</div>,
    },
    {
      id: 'status',
      name: 'Статус',
      template: (item: IDataOfRequests) => <Label>{ item.status }</Label>,
    },
    {
      id: 'lastModified',
      name: 'Последнее изм.',
      align: 'right',
      width: '30%',
      template: (item: IDataOfRequests) => dateTimeParse(item.lastModified)?.format('DD.MM.YYYY'),
    },
  ];
  
  const mainRequestsTable: TableColumnConfig<MainRequestsTable>[] = [
    {
      id: 'requestId',
      name: 'Запрос #',
      width: '15%',
      template: (item: MainRequestsTable) => item.requestId && <Label icon={ <Icon data={ LogoYandexTracker } size={ 16 } /> } theme='unknown' onClick={() => window.open(`https://tracker.yandex.ru/${item.requestId}`, "_blank", "noreferrer")}>{ item.requestId }</Label>,
    },
    {
      id: 'title',
      name: 'Заголовок',
      width: '55%',
      template: (item: MainRequestsTable) => <p>[{ item.internalId }] { item.system || item.type }</p>,
    },
    {
      id: 'status',
      name: 'Статус',
      template: (item: MainRequestsTable) => <Label>{ item.requestStatus || 'Не создана' }</Label>,
    },
    {
      id: 'lastModified',
      name: 'Последнее изм.',
      width: '23%',
      align: 'right',
      template: (item: MainRequestsTable) => dateTimeParse(item.updatedAt)?.format('DD.MM.YYYY'),
    },
  ];
  
  useEffect(() => {
    setPageLoading(true);
    
    const url: string =
      import.meta.env.VITE_BACKEND_URL || 'https://sins.v-b.tech';
    const endpointUrl: URL = new URL(`/newcomers/${ id }`, url);
    axios.get<IDetailedData>(endpointUrl.href)
         .then((res: AxiosResponse<IDetailedData>): void => {
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
             
             const foundRelatedRequests: IRelatedRequest[] | undefined = res.data.RelatedRequests
           const relatedRequestsArray: IDataOfRequests [] = []
           foundRelatedRequests?.forEach((issue: IRelatedRequest) => {
             relatedRequestsArray.push({
               id: issue.requestId,
               title: issue.title,
               status: issue.requestStatus,
               lastModified: new Date(issue.lastModified)
             })
           })
           setRelatedRequests(relatedRequestsArray)
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
  
  const mainIssue: IRelatedRequest | undefined = detailedData?.RelatedRequests?.find((issue: IRelatedRequest): boolean => {
    return issue.type === 'main'
  })
  
  return (
    <>
      { !pageLoading && <>
        { detailedData &&
          <>
            <h1>{ detailedData?.surname } { detailedData?.name } { detailedData?.middleName }</h1>
            <div className={ styles.wrapper }>
              <div className={ styles.label }>
                { mainIssue && <Label theme='unknown' value={ mainIssue.requestId }
                                      onClick={ () => window.open(`https://tracker.yandex.ru/${ mainIssue.requestId }`, '_blank', 'noreferrer') }
                                      icon={ <Icon data={ LogoYandexTracker } size={ 16 } /> }>
                  Main issue</Label> }
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
                          data={ relatedRequests }
                          wordWrap={ true }
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
      { pageLoading && <div className={ styles.skeleton }>
        <Skeleton className={ styles.skeletonName } />
        <Skeleton className={ styles.skeletonItem } />
        <Skeleton className={ styles.skeletonItem } />
      </div> }
    </>
  );
};
