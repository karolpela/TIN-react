import React from 'react';
import { useTranslation } from 'react-i18next';

function RepairDetailsData(props) {
  const { t } = useTranslation();
  const repair = props.custData;
  return (
    <React.Fragment>
      <p>
        {t('repair.fields.service')}:{' '}
        {t('service.fields.number') + ' ' + repair.service._id + ' ' + repair.service.type}
      </p>
      <p>
        {t('repair.fields.employee')}: {repair.employee.firstName + ' ' + repair.employee.lastName}
      </p>
      <p>
        {t('repair.fields.problem')}: {repair.problem}
      </p>
      <p>
        {t('repair.fields.status')}: {repair.status}
      </p>
    </React.Fragment>
  );
}

export default RepairDetailsData;
