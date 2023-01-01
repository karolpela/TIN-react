import React from 'react';
import { useTranslation } from 'react-i18next';
import { getFormattedDate } from '../../helpers/dateHelper';

function EquipmentDetailsData(props) {
  const { t } = useTranslation();
  const equipment = props.equipmentData;

  if (equipment.rentals.length !== 0) {
    return (
      <React.Fragment>
        <p>
          {t('equipment.fields.type')}: {equipment.type}
        </p>
        <p>
          {t('equipment.fields.purpose')}: {equipment.purpose}
        </p>
        <p>
          {t('equipment.fields.size')}:{equipment.size}
        </p>
        <h2>{t('equipment.form.rentals')}</h2>
        <table className="table-list">
          <thead>
            <tr>
              <th>{t('customer.fields.firstName')}</th>
              <th>{t('customer.fields.lastName')}</th>
              <th>{t('rental.fields.startDate')}</th>
              <th>{t('rental.fields.endDate')}</th>
            </tr>
          </thead>
          <tbody>
            {equipment.rentals.map((rental) => (
              <tr key={rental._id}>
                <td>{rental.customer.firstName}</td>
                <td>{rental.customer.lastName}</td>
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
          {t('equipment.fields.type')}: {equipment.type}
        </p>
        <p>
          {t('equipment.fields.purpose')}: {equipment.purpose}
        </p>
        <p>
          {t('equipment.fields.size')}: {equipment.size}
        </p>
        <h3>{t('rental.list.noData')}</h3>
      </React.Fragment>
    );
  }
}

export default EquipmentDetailsData;
