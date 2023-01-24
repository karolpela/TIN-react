import ServiceListTableRow from './ServiceListTableRow';
import { useTranslation } from 'react-i18next';

function ServiceListTable(props) {
  const { t } = useTranslation();
  const services = props.services;
  return (
    <table className="table-list">
      <thead>
        <tr>
          <th>{t('service.fields.number')}</th>
          <th>{t('service.fields.equipment')}</th>
          <th>{t('service.fields.type')}</th>
          <th>{t('list.actions.title')}</th>
        </tr>
      </thead>
      <tbody>
        {services.map((service) => (
          <ServiceListTableRow serviceData={service} key={service._id} />
        ))}
      </tbody>
    </table>
  );
}

export default ServiceListTable;
