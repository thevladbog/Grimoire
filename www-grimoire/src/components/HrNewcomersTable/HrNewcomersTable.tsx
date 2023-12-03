import {
  Table,
  TableActionConfig,
  TableColumnConfig,
  withTableActions,
  Pagination,
  PaginationProps,
  TextInput,
} from '@gravity-ui/uikit';
import React, { useEffect, useState } from 'react';
import { dateTimeParse } from '@gravity-ui/date-utils';

import styles from './HrNewcomersTable.module.scss';
import axios, { AxiosResponse } from 'axios';
import {
  IListOfNewcomers,
  IRelatedRequest,
  RequestsType,
} from 'src/types/types.ts';
import { useNavigate } from 'react-router-dom';
import { findEmployeeByTitle } from 'src/utils/findEmployeeByTitle.ts';

export interface IDataOfHrNewcomers {
  id: string;
  nameRu: string;
  manager: string;
  recruiter: string;
  jobTitle: string;
  startDate: string;
  request: string;
}

interface IPaginationConfig {
  page: number;
  pageSize: number;
}

export const HrNewcomersTable = () => {
  const [rawData, setRawData] = useState<IDataOfHrNewcomers[]>([]);
  const [filteredData, setFilteredData] = useState<IDataOfHrNewcomers[]>([]);
  const [paginatedData, setPaginatedData] = useState<IDataOfHrNewcomers[]>([]);
  const [paginationConfig, setPaginationConfig] = useState<IPaginationConfig>({
    page: 1,
    pageSize: 10,
  });
  const [rerenderFilteredData, setRerenderFilteredData] =
    useState<boolean>(false);
  const [filterParams, setFilterParams] = useState<string>('');
  const [totalItems, setTotalItems] = useState<number>(0);

  const navigate = useNavigate();

  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) => {
    setPaginationConfig((prevState: IPaginationConfig) => ({
      ...prevState,
      page,
      pageSize,
    }));
    setRerenderFilteredData(true);
  };

  const changeDataWhenSearch = (text: string) => {
    const filteredRawData: IDataOfHrNewcomers[] = [];
    rawData.forEach((item: IDataOfHrNewcomers) => {
      for (const key in item) {
        if (
          item[key as keyof typeof item]
            .toLowerCase()
            .includes(String(text).toLowerCase())
        ) {
          filteredRawData.push(item);
          return;
        }
      }
    });

    setFilteredData(filteredRawData);
    changeDataWhenPaginate(filteredRawData);
    setTotalItems(filteredRawData.length);
  };

  const changeDataWhenPaginate = (data: IDataOfHrNewcomers[]): void => {
    const firstIteration: IDataOfHrNewcomers[] = data.slice(
      paginationConfig.pageSize * (paginationConfig.page - 1),
      paginationConfig.pageSize * paginationConfig.page,
    );

    if (firstIteration.length <= paginationConfig.pageSize) {
      setPaginatedData(firstIteration);
      return;
    }
    const secondIteration: IDataOfHrNewcomers[] = firstIteration.slice(
      paginationConfig.pageSize * paginationConfig.page,
    );

    setPaginatedData(secondIteration);
    return;
  };

  const getRawData = (): void => {
    const url: string =
      process.env.VITE_BACKEND_URL +
      '/newcomers/all?corporateInfo=false&relatedEmployees=true';
    axios
      .get<IListOfNewcomers[]>(url)
      .then((res: AxiosResponse<IListOfNewcomers[]>) => {
        console.log(res);
        const newData: IDataOfHrNewcomers[] = [...rawData];
        res.data.forEach((newcomer: IListOfNewcomers) => {
          const request: IRelatedRequest | undefined =
            newcomer.RelatedRequests?.find(
              (item: IRelatedRequest) => item.type === RequestsType.main,
            );

          const oneNewcomer: IDataOfHrNewcomers = {
            id: String(newcomer.id),
            nameRu: `${newcomer.surname} ${newcomer.name} ${newcomer.surname}`,
            manager: findEmployeeByTitle('manager', newcomer),
            recruiter: findEmployeeByTitle('recruiter', newcomer),
            jobTitle: newcomer.jobTitle,
            startDate: newcomer.firstDay,
            request: request?.requestId || 'Not found',
          };
          newData.push(oneNewcomer);
        });

        setRawData(newData);
        setFilteredData(newData);
      })
      .catch((e) => console.log(e))
      .finally(() => console.log('final'));
  };

  useEffect(() => {
    getRawData();
  }, []);

  useEffect(() => {
    setTotalItems(filteredData.length);
    changeDataWhenSearch(filterParams);
    setRerenderFilteredData(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawData, rerenderFilteredData]);

  useEffect(() => {
    changeDataWhenSearch(filterParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams, paginationConfig]);

  const MyTable = withTableActions<IDataOfHrNewcomers>(Table);
  const columns: TableColumnConfig<IDataOfHrNewcomers>[] = [
    {
      id: 'nameRu',
      name: 'Name',
      width: '25%',
    },
    {
      id: 'jobTitle',
      name: 'Job Title',
      width: '20%',
    },
    {
      id: 'manager',
      name: 'Manager',
      width: '17%',
    },
    {
      id: 'recruiter',
      name: 'Recruiter',
      width: '17%',
    },
    {
      id: 'startDate',
      name: 'Start Date',
      width: '15%',
      template: (item) => dateTimeParse(item.startDate)?.format('DD.MM.YYYY'),
    },
    {
      id: 'request',
      name: 'Request #',
      width: '15%',
    },
  ];

  const getHrRowActions = (
    item: IDataOfHrNewcomers,
    index: number,
  ): TableActionConfig<IDataOfHrNewcomers>[] => {
    return [
      {
        text: 'Print',
        handler: () => {
          console.log(item, index);
        },
      },
      {
        text: 'Remove',
        handler: () => {},
        theme: 'danger',
      },
    ];
  };

  return (
    <>
      <div className={styles.search}>
        <TextInput
          placeholder="Search ..."
          size="m"
          onUpdate={(value) => {
            setFilterParams(value);
          }}
          className={styles.search__input}
          hasClear={true}
        />
      </div>
      <div className={styles.table}>
        <MyTable
          data={paginatedData}
          columns={columns}
          onRowClick={(
            item: IDataOfHrNewcomers,
            index: number,
            event: React.MouseEvent<HTMLTableRowElement>,
          ) => {
            console.log(item, index, event);
            navigate(`/newcomer/${item.id}`);
          }}
          getRowActions={getHrRowActions}
          wordWrap={true}
        />
      </div>
      <Pagination
        page={paginationConfig.page}
        pageSize={paginationConfig.pageSize}
        total={totalItems}
        onUpdate={handleUpdate}
        compact={false}
        pageSizeOptions={[10, 15, 20, 30, 50]}
        showInput={true}
        className={styles.pagination}
      />
    </>
  );
};
