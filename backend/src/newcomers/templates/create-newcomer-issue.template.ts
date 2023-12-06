import {
  AccessesForNewcomersDto,
  CreateNewcomersDto,
  EquipmentForNewcomersDto,
} from 'src/newcomers/dto/CreateNewcomers.dto'
import { dateTimeParse } from '@gravity-ui/date-utils'

export const CreateNewcomersIssue = (dto: CreateNewcomersDto): string => {
  return `
Начат новый процесс по выводу нового сотрудника в компанию.

---

Данные о сотруднике:

#|
||

Фамилия

|

${dto.surname}

||
||

Имя

|

${dto.name}

||
||

Отчество

|

${dto.middleName}

||
||

Должность

|

${dto.jobTitle}

||
||

E-mail

|

[${dto.email}](mailto:${dto.email})

||
||

Номер телефона

|

${dto.mobile}

||
||

Руководитель

|

${dto.manager}

||
||

Рекрутер

|

${dto.recruiter}

||
||

Дата выхода

|

${dateTimeParse(dto.startDate).format('DD.MM.YYYY')}

||
|#

Запрошенное оборудование:

#|
||

Тип

|

Количество

|

Комментарий

|

ID

${dto.equipment.map((item: EquipmentForNewcomersDto): string => {
  return `
||
||

${item.name}

|

${item.count}

|

${item.comment}

|

${item.id}`
})}

||
|#

Запрошенные доступы:

#|
||

Тип

|

Запрошенный доступ/роль

|

Комментарий

|

ID

${dto.accesses.map((item: AccessesForNewcomersDto): string => {
  return `
||
||

${item.name}

|

${item.type}

|

${item.comment}

|

${item.id}`
})}

||
|#

***

##### {red}(Внимание! Данная заявка будет считаться родительской для остальных. Не закрывай её, пока все связанные заявки не будут решены!)
`
}
