import { ReactNode, useEffect, useState } from 'react';
import {
  Icon,
  TextInput,
  Card,
  Button,
  Select,
  TextArea,
} from '@gravity-ui/uikit';
import { DatePicker } from '@gravity-ui/date-components';
import { dateTime, DateTime } from '@gravity-ui/date-utils';
import { customAlphabet } from 'nanoid';
//import { DynamicField, dynamicConfig } from '@gravity-ui/dynamic-forms';
import { EquipmentOptions } from 'src/components/Forms/configs/equipment.ts';

import {
  At,
  Smartphone,
  CirclePlus,
  CircleMinus,
  Display,
} from '@gravity-ui/icons';

//import { EquipmentConfig } from './configs/equipment.ts';

import styles from './HrNewcomersForm.module.scss';

const FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';

interface IAccess {
  name: string;
  type: string;
  comment: string;
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
  startDate: string;
  manager?: string;
  equipment?: IEquipment[];
  listOfAccesses?: IAccess[];
}

const InitialData: IFormData = {
  name: '',
  surname: '',
  middleName: '',
  email: '',
  mobile: '',
  startDate: dateTime().format(FORMAT),
  manager: '',
  equipment: undefined,
  listOfAccesses: undefined,
};

export const HrNewcomersForm = () => {
  const [formData, setFormData] = useState<IFormData>(InitialData);
  const [equipmentList, setEquipmentList] = useState<string[]>([]);

  const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOP', 8);

  const addEquipment = (): void => {
    const equipmentId = 'EQUIP' + nanoid();
    const newItem: IEquipment = { id: equipmentId };
    const tempArray: IEquipment[] | undefined = formData.equipment || [];
    tempArray.push(newItem);

    setEquipmentList((prev) => [...prev, equipmentId]);

    setFormData((prev: IFormData) => ({ ...prev, equipment: tempArray }));
  };

  const changeEquipment = (
    id: string,
    value: string | number,
    target: string,
  ): void => {
    const oldArray: IEquipment[] = formData.equipment || [];

    const changedConfig: IEquipment | undefined = oldArray.find(
      (config) => config.id === id,
    );

    if (!changedConfig) return;

    const index: number = oldArray.indexOf(changedConfig);

    const newConfig: IEquipment = { ...changedConfig, [target]: value };
    oldArray.splice(index, 1, newConfig);

    setFormData((prev: IFormData) => ({ ...prev, equipment: oldArray }));
  };

  const deleteEquipment = (id: string) => {
    const index = equipmentList.indexOf(id);
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
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <Card theme="warning" className={styles.card}>
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
        </div>
        <div className={styles.group}>
          <DatePicker
            id="startDate"
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
        </div>
      </div>
      <div className={styles.group}>
        <Card theme="info" className={styles.cardGroup}>
          <div className={styles.equipmentHeader}>
            <h2>
              <Icon data={Display} size={20} /> Equipment:
            </h2>
            <Button view="outlined-success" size="m" onClick={addEquipment}>
              <Icon data={CirclePlus} /> Add new item
            </Button>
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
                      changeEquipment(item, value[0], 'name');
                    }}
                  >
                    {
                      /* eslint-disable */
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
                    className={styles.countText}
                    onUpdate={(value) => {
                      changeEquipment(item, value, 'count');
                    }}
                  />
                  <TextArea
                    className={styles.textArea}
                    placeholder="Please type business justification or another helpful information"
                    size="m"
                    onUpdate={(value) => {
                      changeEquipment(item, value, 'comment');
                    }}
                  />
                  <Button
                    onClick={() => deleteEquipment(item)}
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
      {/*<DynamicField name="test" spec={EquipmentConfig} config={dynamicConfig} />*/}
    </Card>
  );
};
