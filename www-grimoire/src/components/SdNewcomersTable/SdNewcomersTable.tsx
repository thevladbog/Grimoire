import {
  Table,
  TableActionConfig,
  TableColumnConfig,
  withTableActions,
} from '@gravity-ui/uikit';
import React from 'react';

interface IDataOfNewcomers {
  id: string;
  nameEn: string;
  nameRu: string;
  domainName: string;
  email: string;
  startDate: string;
  request: string;
}

const mockData: IDataOfNewcomers[] = [
  {
    id: '1',
    domainName: 'test_name',
    nameEn: 'Ivan Ivaniv',
    nameRu: 'Иван Иванов Сергеевич',
    email: 'ivan.ivanov@company.com',
    request: 'NEWCOMERS-1',
    startDate: '22.12.2023',
  },
];

export const SdNewcomersTable = () => {
  const MyTable = withTableActions<IDataOfNewcomers>(Table);
  const columns: TableColumnConfig<IDataOfNewcomers>[] = [
    {
      id: 'nameRu',
      name: 'Name RU',
    },
    {
      id: 'nameEn',
      name: 'Name EN ',
    },
    {
      id: 'domainName',
      name: 'Domain Name',
    },
    {
      id: 'email',
      name: 'Email',
    },
    {
      id: 'startDate',
      name: 'Start Date',
    },
    {
      id: 'request',
      name: 'Request #',
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
      <MyTable
        data={mockData}
        columns={columns}
        onRowClick={(
          item: IDataOfNewcomers,
          index: number,
          event: React.MouseEvent<HTMLTableRowElement>,
        ) => {
          console.log(item, index, event);
        }}
        getRowActions={getRowActions}
      />
    </>
  );
};
