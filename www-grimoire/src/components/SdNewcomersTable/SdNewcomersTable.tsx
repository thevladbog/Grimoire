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

import { mockData } from './mock.ts';

import styles from './SdNewcomersTable.module.scss';

export interface IDataOfNewcomers {
  id: string;
  nameEn: string;
  nameRu: string;
  domainName: string;
  email: string;
  startDate: string;
  request: string;
}

interface IPaginationConfig {
  page: number;
  pageSize: number;
}

export const SdNewcomersTable = () => {
  const [rawData, setRawData] = useState<IDataOfNewcomers[]>([]);
  const [filteredData, setFilteredData] = useState<IDataOfNewcomers[]>([]);
  const [paginatedData, setPaginatedData] = useState<IDataOfNewcomers[]>([]);
  const [paginationConfig, setPaginationConfig] = useState<IPaginationConfig>({
    page: 1,
    pageSize: 10,
  });
  const [rerenderFilteredData, setRerenderFilteredData] =
    useState<boolean>(false);
  const [filterParams, setFilterParams] = useState<string>('');
  const [totalItems, setTotalItems] = useState<number>(0);

  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) => {
    setPaginationConfig((prevState: IPaginationConfig) => ({
      ...prevState,
      page,
      pageSize,
    }));
    setRerenderFilteredData(true);
  };

  const changeDataWhenSearch = (text: string) => {
    const filteredRawData: IDataOfNewcomers[] = [];
    rawData.forEach((item: IDataOfNewcomers) => {
      for (const key in item) {
        console.log(
          'search',
          item,
          item[key as keyof typeof item],
          text,
          String(text),
        );
        if (
          item[key as keyof typeof item].toLowerCase().includes(String(text))
        ) {
          filteredRawData.push(item);
          return;
        }
      }
    });

    setFilteredData(filteredRawData);
    changeDataWhenPaginate(filteredRawData);
    setTotalItems(filteredRawData.length);

    console.log('RAW', rawData);
    console.log('filteredData', filteredData);
    console.log('paginatedData', paginatedData);
  };

  const changeDataWhenPaginate = (data: IDataOfNewcomers[]): void => {
    const firstIteration: IDataOfNewcomers[] = data.slice(
      paginationConfig.pageSize * (paginationConfig.page - 1),
      paginationConfig.pageSize * paginationConfig.page,
    );

    console.log(firstIteration);

    if (firstIteration.length <= paginationConfig.pageSize) {
      setPaginatedData(firstIteration);
      return;
    }
    const secondIteration: IDataOfNewcomers[] = firstIteration.slice(
      paginationConfig.pageSize * paginationConfig.page,
    );

    setPaginatedData(secondIteration);
    return;
  };

  useEffect(() => {
    setRawData(mockData);
    setFilteredData(mockData);
  }, []);

  useEffect(() => {
    setTotalItems(filteredData.length);
    changeDataWhenSearch(filterParams);
    setRerenderFilteredData(false);
  }, [rawData, rerenderFilteredData]);

  useEffect(() => {
    changeDataWhenSearch(filterParams);
  }, [filterParams, paginationConfig]);

  const MyTable = withTableActions<IDataOfNewcomers>(Table);
  const columns: TableColumnConfig<IDataOfNewcomers>[] = [
    {
      id: 'nameRu',
      name: 'Name RU',
      width: '20%',
    },
    {
      id: 'nameEn',
      name: 'Name EN ',
      width: '20%',
    },
    {
      id: 'domainName',
      name: 'Domain Name',
      width: '15%',
    },
    {
      id: 'email',
      name: 'Email',
      width: '20%',
    },
    {
      id: 'startDate',
      name: 'Start Date',
      width: '10%',
    },
    {
      id: 'request',
      name: 'Request #',
      width: '15%',
    },
  ];

  const getRowActions = (
    item: IDataOfNewcomers,
    index: number,
  ): TableActionConfig<IDataOfNewcomers>[] => {
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
      <MyTable
        data={paginatedData}
        className={styles.table}
        columns={columns}
        onRowClick={(
          item: IDataOfNewcomers,
          index: number,
          event: React.MouseEvent<HTMLTableRowElement>,
        ) => {
          console.log(item, index, event);
        }}
        getRowActions={getRowActions}
        wordWrap={true}
      />
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
