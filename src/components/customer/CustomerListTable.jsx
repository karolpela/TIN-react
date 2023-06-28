import CustomerListTableRow from './CustomerListTableRow';
import { useTranslation } from 'react-i18next';

function CustomerListTable(props) {
  const { t } = useTranslation();
  const customers = props.customers;
  return (
    <table className="table-list">
      <thead>
        <tr>
          <th>{t('customer.fields.firstName')}</th>
          <th>{t('customer.fields.lastName')}</th>
          <th>{t('customer.fields.phoneNo')}</th>
          <th>{t('list.actions.title')}</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <CustomerListTableRow customerData={customer} key={customer._id} />
        ))}
      </tbody>
    </table>
  );
}

export default CustomerListTable;
