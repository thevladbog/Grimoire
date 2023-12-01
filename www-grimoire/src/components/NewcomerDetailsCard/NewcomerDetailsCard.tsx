import { useState } from "react";
import { useParams } from 'react-router';
import { Card, Button, Icon, Label } from '@gravity-ui/uikit';

import { ChevronsDown, Book } from '@gravity-ui/icons';
import styles from './NewcomerDetailsCard.module.scss';

enum Statuses {
  toCreate = 'outlined-success',
  created = 'outlined-warning',
  rejected = 'outlined-danger'
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

export const NewcomerDetailsCard = () => {
  const [buttonStatuses, setButtonStatuses] = useState<IButtonStatuses>(InitialButtonStatuses)
  const { id } = useParams();

  return (
    <>
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
            <div></div>
          </Card>
        </div>
      </div>
    </>
  );
};
