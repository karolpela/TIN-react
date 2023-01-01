import React from 'react';
import { useTranslation } from 'react-i18next';
import { getFormattedDate } from '../../helpers/dateHelper';

function CustomerDetailsData(props) {
  const { t } = useTranslation();
  const customer = props.custData;

  if (customer.rentals.length !== 0) {
    return (
      <React.Fragment>
        <p>
          {t('customer.fields.firstName')}: {customer.firstName}
        </p>
        <p>
          {t('customer.fields.lastName')}: {customer.lastName}
        </p>
        <p>
          {t('customer.fields.phoneNo')}: {customer.phoneNo}
        </p>
        <h2>{t('customer.form.rentals')}</h2>
        <table className="table-list">
          <thead>
            <tr>
              <th>{t('rental.fields.equipment')}</th>
              <th>{t('equipment.fields.size')}</th>
              <th>{t('rental.fields.startDate')}</th>
              <th>{t('rental.fields.endDate')}</th>
            </tr>
          </thead>
          <tbody>
            {customer.rentals.map((rental) => (
              <tr key={rental._id}>
                <td>{rental.equipment.type}</td>
                <td>{rental.equipment.size}</td>
                <td>{getFormattedDate(rental.startDate)}</td>
                <td>{rental.endDate ? getFormattedDate(rental.endDate) : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>
          {t('customer.fields.firstName')}: {customer.firstName}
        </p>
        <p>
          {t('customer.fields.lastName')}: {customer.lastName}
        </p>
        <p>
          {t('customer.fields.phoneNo')}: {customer.phoneNo}
        </p>
        <h3>{t('rental.list.noData')}</h3>
      </React.Fragment>
    );
  }
}

export default CustomerDetailsData;
