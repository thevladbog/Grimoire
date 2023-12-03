import { IListOfNewcomers, IRelatedEmployee } from 'src/types/types.ts';

export const findEmployeeByTitle = (
  title: string,
  newcomer: IListOfNewcomers,
): string => {
  let foundEmployee: IRelatedEmployee | undefined = undefined;
  if (newcomer && newcomer.RelatedEmployees) {
    foundEmployee = newcomer.RelatedEmployees.find(
      (item: IRelatedEmployee) => item.type === title,
    );

    if (foundEmployee) {
      return foundEmployee.name;
    }
  }
  return 'Не указан';
};
