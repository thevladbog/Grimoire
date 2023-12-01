import { ReactNode, useState } from 'react';
import {
  Icon,
  TextInput,
  Card,
  Button,
  Select,
  TextArea,
  Text,
} from '@gravity-ui/uikit';
import { DatePicker } from '@gravity-ui/date-components';
import { dateTime, DateTime } from '@gravity-ui/date-utils';
import { useToaster } from '@gravity-ui/uikit';
import { customAlphabet } from 'nanoid';
import { EquipmentOptions } from 'src/components/Forms/configs/equipment.ts';

import {
  At,
  Smartphone,
  CirclePlus,
  CircleMinus,
  Display,
  Key,
  PersonWorker,
} from '@gravity-ui/icons';

import styles from './HrNewcomersForm.module.scss';
import { AccessesOptions } from 'src/components/Forms/configs/accesses.ts';
import axios, { AxiosError, AxiosResponse } from 'axios';

const FORMAT: string = 'YYYY-MM-DDTHH:mm:ssZ';

interface IAccess {
  id: string;
  name?: string;
  type?: string;
  comment?: string;
}

interface IEquipment {
  id: string;
  name?: string;
  comment?: string;
  qty?: number;
}

interface IFormData {
  name: string;
  surname?: string;
  middleName: string;
  email: string;
  mobile: string;
  jobTitle: string;
  startDate: string;
  manager?: string;
  recruiter?: string;
  equipment?: IEquipment[];
  accesses?: IAccess[];
}

const InitialData: IFormData = {
  name: '',
  surname: '',
  middleName: '',
  email: '',
  mobile: '',
  jobTitle: '',
  startDate: dateTime().format(FORMAT),
  manager: '',
  recruiter: '',
  equipment: undefined,
  accesses: undefined,
};

export const HrNewcomersForm = () => {
  const [formData, setFormData] = useState<IFormData>(InitialData);
  const [equipmentList, setEquipmentList] = useState<string[]>([]);
  const [accessesList, setAccessesList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOP', 8);
  const { add } = useToaster();

  const addItem = (target: 'equipment' | 'accesses'): void => {
    if (target === 'equipment') {
      const equipmentId = 'EQUIP' + nanoid();
      const newItem: IEquipment = { id: equipmentId };
      const tempArray: IEquipment[] | undefined = formData.equipment || [];
      tempArray.push(newItem);

      setEquipmentList((prev) => [...prev, equipmentId]);

      setFormData((prev: IFormData) => ({ ...prev, equipment: tempArray }));
    }

    if (target === 'accesses') {
      const accessesId = 'ACCESS' + nanoid();
      const newItem: IAccess = { id: accessesId };
      const tempArray: IAccess[] | undefined = formData.accesses || [];
      tempArray.push(newItem);

      setAccessesList((prev) => [...prev, accessesId]);

      setFormData((prev: IFormData) => ({
        ...prev,
        accesses: tempArray,
      }));
    }
  };

  const changeItem = (
    id: string,
    value: string | number,
    target: string,
    list: 'equipment' | 'accesses',
  ): void => {
    if (list === 'equipment') {
      const oldArray: IEquipment[] = formData.equipment || [];

      const changedConfig: IEquipment | undefined = oldArray.find(
        (config) => config.id === id,
      );

      if (!changedConfig) return;

      const index: number = oldArray.indexOf(changedConfig);

      const newConfig: IEquipment = { ...changedConfig, [target]: value };
      oldArray.splice(index, 1, newConfig);

      setFormData((prev: IFormData) => ({ ...prev, equipment: oldArray }));
    }

    if (list === 'accesses') {
      const oldArray: IAccess[] = formData.accesses || [];

      const changedConfig: IAccess | undefined = oldArray.find(
        (config) => config.id === id,
      );

      if (!changedConfig) return;

      const index: number = oldArray.indexOf(changedConfig);

      const newConfig: IAccess = { ...changedConfig, [target]: value };
      oldArray.splice(index, 1, newConfig);

      setFormData((prev: IFormData) => ({ ...prev, accesses: oldArray }));
    }
  };

  const deleteItem = (id: string, list: 'equipment' | 'accesses') => {
    if (list === 'equipment') {
      const index: number = equipmentList.indexOf(id);
      if (index > -1) {
        const tempArray = equipmentList;
        tempArray.splice(index, 1);
        setEquipmentList(tempArray);

        const oldEquipmentArray: IEquipment[] = formData.equipment || [];

        const deletedConfig: IEquipment | undefined = oldEquipmentArray.find(
          (config) => config.id === id,
        );
        if (!deletedConfig) return;

        const configIndex: number = oldEquipmentArray.indexOf(deletedConfig);
        oldEquipmentArray.splice(configIndex, 1);
        setFormData((prev: IFormData) => ({
          ...prev,
          equipment: oldEquipmentArray,
        }));
      }
    }

    if (list === 'accesses') {
      const index: number = accessesList.indexOf(id);
      if (index > -1) {
        const tempArray = accessesList;
        tempArray.splice(index, 1);
        setAccessesList(tempArray);

        const oldAccessesArray: IAccess[] = formData.accesses || [];

        const deletedConfig: IAccess | undefined = oldAccessesArray.find(
          (config) => config.id === id,
        );
        if (!deletedConfig) return;

        const configIndex: number = oldAccessesArray.indexOf(deletedConfig);
        oldAccessesArray.splice(configIndex, 1);
        setFormData((prev: IFormData) => ({
          ...prev,
          accesses: oldAccessesArray,
        }));
      }
    }
  };

  const clearForm = () => {
    window.location.reload();
  };

  const submitForm = async () => {
    setLoading(true);
    const url: string =
      import.meta.env.VITE_BACKEND_URL || 'https://sins.v-b.tech';
    await axios
      .post(`${url}/newcomers`, formData)
      .then((res: AxiosResponse) => {
        console.log(res);
        add({
          title: `Newcomer has been created with ID #${res.data}`,
          name: 'success',
          autoHiding: 5000,
          isClosable: true,
          type: 'success',
        });
      })
      .catch((error: AxiosError) => {
        console.log(error);
        add({
          title: `Something went wrong. Error ${error?.message}`,
          name: 'error',
          autoHiding: 5000,
          isClosable: true,
          type: 'error',
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Card view="raised" type="container" className={styles.card}>
      <div className={styles.wrapper}>
        <div className={styles.group}>
          <TextInput
            placeholder="Igor"
            pin="round-brick"
            label="Name:"
            id="name"
            hasClear={true}
            onUpdate={(value: string) =>
              setFormData((prevState: IFormData) => ({
                ...prevState,
                name: value,
              }))
            }
          />
          <TextInput
            placeholder="Maksimovich"
            pin="brick-brick"
            label="Middle name:"
            id="middleName"
            hasClear={true}
            onUpdate={(value: string) =>
              setFormData((prevState: IFormData) => ({
                ...prevState,
                middleName: value,
              }))
            }
          />
          <TextInput
            placeholder="Glinka"
            pin="brick-round"
            label="Surname:"
            id="surname"
            hasClear={true}
            onUpdate={(value: string) =>
              setFormData((prevState: IFormData) => ({
                ...prevState,
                surname: value,
              }))
            }
          />
        </div>
        <div className={styles.group}>
          <TextInput
            placeholder="Igor.Glinka@type.me"
            label="E-mail:"
            id="email"
            hasClear={true}
            leftContent={<Icon data={At} />}
            onUpdate={(value: string) =>
              setFormData((prevState: IFormData) => ({
                ...prevState,
                email: value,
              }))
            }
          />
          <TextInput
            placeholder="+7 (900) 256-63-95"
            label="Mobile:"
            id="mobile"
            hasClear={true}
            leftContent={<Icon data={Smartphone} />}
            onUpdate={(value: string) =>
              setFormData((prevState: IFormData) => ({
                ...prevState,
                mobile: value,
              }))
            }
          />
          <TextInput
            placeholder="Software engineer"
            label="Job Title:"
            id="jobTitle"
            hasClear={true}
            leftContent={<Icon data={PersonWorker} />}
            onUpdate={(value: string) =>
              setFormData((prevState: IFormData) => ({
                ...prevState,
                jobTitle: value,
              }))
            }
          />
        </div>
        <div className={styles.group}>
          <DatePicker
            id="startDate"
            format="DD MMMM YYYY"
            className={styles.datePicker}
            label="First date:"
            onUpdate={(value: DateTime | null) => {
              if (value === null) {
                setFormData((prevState: IFormData) => ({
                  ...prevState,
                  startDate: 'undefined',
                }));
              } else {
                const startDate: string = dateTime({ input: value }).format(
                  FORMAT,
                );
                setFormData((prevState: IFormData) => ({
                  ...prevState,
                  startDate,
                }));
              }
            }}
          />
          <TextInput
            placeholder="Borisov Sergey Vladimirovich"
            label="Manager: "
            id="manager"
            hasClear={true}
            onUpdate={(value: string) =>
              setFormData((prevState: IFormData) => ({
                ...prevState,
                manager: value,
              }))
            }
          />
          <TextInput
            placeholder="Begovaya Olesya Maksimovna"
            label="Recruiter: "
            id="recruiter"
            hasClear={true}
            onUpdate={(value: string) =>
              setFormData((prevState: IFormData) => ({
                ...prevState,
                recruiter: value,
              }))
            }
          />
        </div>
      </div>

      <div className={styles.group}>
        <Card view="raised" type="container" className={styles.cardGroup}>
          <div className={styles.equipmentHeader}>
            <h2>
              <Icon data={Display} size={20} /> Equipment:
            </h2>
            <Button
              view="outlined-success"
              size="m"
              onClick={() => addItem('equipment')}
            >
              <Icon data={CirclePlus} /> Add new item
            </Button>
          </div>
          <div className={styles.subheader}>
            <Text ellipsis={false} variant="body-2">
              If a new employee requires equipment, select the required
              configuration by clicking on the "Add" button. If the equipment is
              not required for an employee’s profile, do not forget to indicate
              a detailed business justification and other useful information in
              the “Comment” field. Without this information, the period for
              issuing equipment will be extended.
            </Text>
          </div>
          <div>
            {equipmentList.map((item): ReactNode => {
              return (
                <div key={item} className={styles.equipmentGroup}>
                  <Select
                    id={item}
                    label="Type: "
                    className={styles.select}
                    onUpdate={(value) => {
                      changeItem(item, value[0], 'name', 'equipment');
                    }}
                  >
                    {
                      // prettier-ignore
                      (Object.keys(EquipmentOptions) as (keyof typeof EquipmentOptions)[])
                        .map((key) => {
                      return (
                        <Select.Option
                          key={key}
                          value={key}
                          content={EquipmentOptions[key]}
                        />
                      );
                    })
                    }
                  </Select>
                  <TextInput
                    placeholder="1"
                    label="Count:"
                    id="equipmentCount"
                    hasClear={true}
                    type="number"
                    className={styles.countText}
                    onUpdate={(value) => {
                      changeItem(item, +value, 'count', 'equipment');
                    }}
                  />
                  <TextArea
                    className={styles.textArea}
                    placeholder="Please type business justification or another helpful information"
                    size="m"
                    hasClear={true}
                    onUpdate={(value) => {
                      changeItem(item, value, 'comment', 'equipment');
                    }}
                  />
                  <Button
                    onClick={() => deleteItem(item, 'equipment')}
                    view="outlined-danger"
                  >
                    <Icon data={CircleMinus} /> Delete
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className={styles.group}>
        <Card view="raised" type="container" className={styles.cardGroup}>
          <div className={styles.accessHeader}>
            <h2>
              <Icon data={Key} size={20} /> Accesses:
            </h2>
            <Button
              view="outlined-success"
              size="m"
              onClick={() => addItem('accesses')}
            >
              <Icon data={CirclePlus} /> Add new item
            </Button>
          </div>
          <div className={styles.subheader}>
            <Text ellipsis={false} variant="body-2">
              If a new employee requires access to information systems, add them
              by clicking on the "Add" button. For each system, the required
              level of rights must be specified, as well as a detailed business
              case.{' '}
              <p>
                {' '}
                <b>Please note the following:</b>
              </p>
              <ul>
                <li>
                  access “By analogy with another employee” is not granted!
                </li>
                <li>
                  the list contains information systems that can be accessed on
                  the first working day. For the rest, the employee requests
                  access independently in the first working days;
                </li>
                <li>
                  when selecting “Other”, the issuance of access rights on the
                  first working day is not guaranteed.
                </li>
              </ul>
            </Text>
          </div>
          <div>
            {accessesList.map((item): ReactNode => {
              return (
                <div key={item} className={styles.accessGroup}>
                  <Select
                    id={item}
                    label="System: "
                    className={styles.select}
                    onUpdate={(value) => {
                      changeItem(item, value[0], 'name', 'accesses');
                    }}
                  >
                    {
                      // prettier-ignore
                      (Object.keys(AccessesOptions) as (keyof typeof AccessesOptions)[])
                        .map((key) => {
                          return (
                            <Select.Option
                              key={key}
                              value={key}
                              content={AccessesOptions[key]}
                            />
                          );
                        })
                    }
                  </Select>
                  <TextInput
                    placeholder="Licence"
                    label="Type of access:"
                    id="accessType"
                    hasClear={true}
                    className={styles.listText}
                    onUpdate={(value) => {
                      changeItem(item, value, 'type', 'accesses');
                    }}
                  />
                  <TextArea
                    className={styles.textArea}
                    placeholder="Please type business justification or another helpful information"
                    size="m"
                    hasClear={true}
                    onUpdate={(value) => {
                      changeItem(item, value, 'comment', 'accesses');
                    }}
                  />
                  <Button
                    onClick={() => deleteItem(item, 'accesses')}
                    view="outlined-danger"
                  >
                    <Icon data={CircleMinus} /> Delete
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className={styles.group}>
        <div className={styles.submitButtons}>
          <Button
            view="action"
            size="l"
            className={styles.submitButton}
            onClick={submitForm}
            loading={loading}
          >
            Create new employee
          </Button>
          <Button view="outlined-danger" size="l" onClick={clearForm}>
            Clear all (reload page)
          </Button>
        </div>
      </div>
    </Card>
  );
};
