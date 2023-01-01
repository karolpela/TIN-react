import React from 'react';
import { useTranslation } from 'react-i18next';
import { getFormattedDate } from '../../helpers/dateHelper';

function CustomerDetailsData(props) {
  const { t } = useTranslation();
  const rental = props.custData;
  const rentalStartDate = getFormattedDate(rental.startDate);
  const rentalEndDate = rental.endDate ? getFormattedDate(rental.endDate) : '';
  return (
    <React.Fragment>
      <p>
        {t('customer.fields.firstName')}: {rental.customer.firstName}
      </p>
      <p>
        {t('customer.fields.lastName')}: {rental.customer.lastName}
      </p>
      <p>
        {t('rental.fields.equipment')}:
        {rental.equipment.type + ' ' + rental.equipment.purpose + ' ' + rental.equipment.size}
      </p>
      <p>
        {t('rental.fields.startDate')}: {rentalStartDate}
      </p>
      {rentalEndDate && (
        <p>
          {t('rental.fields.endDate')}: {rentalEndDate}
        </p>
      )}
    </React.Fragment>
  );
}

export default CustomerDetailsData;
