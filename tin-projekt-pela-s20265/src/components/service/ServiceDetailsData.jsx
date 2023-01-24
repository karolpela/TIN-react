import React from 'react';
import { useTranslation } from 'react-i18next';

function ServiceDetailsData(props) {
  const { t } = useTranslation();
  const service = props.custData;

  if (service.repairs.length !== 0) {
    return (
      <React.Fragment>
        <p>
          {t('service.fields.number')}: {service._id}
        </p>
        <p>
          {t('service.fields.equipment')}:{' '}
          {service.equipment.type + ' ' + service.equipment.purpose + ' ' + service.equipment.size}
        </p>
        <p>
          {t('service.fields.type')}: {service.type}
        </p>
        <h2>{t('service.form.repairs')}</h2>
        <table className="table-list">
          <thead>
            <tr>
              <th>{t('service.fields.repair')}</th>
              <th>{t('repair.fields.problem')}</th>
              <th>{t('repair.fields.status')}</th>
            </tr>
          </thead>
          <tbody>
            {service.repairs
              .sort((a, b) => {
                let order = ['w trakcie', 'zgloszona', 'zakonczona'];
                return order.indexOf(a.status) - order.indexOf(b.status);
              })
              .map((repair) => (
                <tr key={repair._id}>
                  <td>{repair._id}</td>
                  <td>{repair.problem}</td>
                  <td>{repair.status}</td>
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
          {t('service.fields.number')}: {service._id}
        </p>
        <p>
          {t('service.fields.equipment')}:{' '}
          {service.equipment.type + ' ' + service.equipment.purpose + ' ' + service.equipment.size}
        </p>
        <p>
          {t('service.fields.type')}: {service.type}
        </p>
        <h3>{t('repair.list.noData')}</h3>
      </React.Fragment>
    );
  }
}

export default ServiceDetailsData;
