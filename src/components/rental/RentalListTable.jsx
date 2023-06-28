import RentalListTableRow from './RentalListTableRow';
import { useTranslation } from 'react-i18next';

function RentalListTable(props) {
  const { t } = useTranslation();
  const rentals = props.rentals;
  return (
    <table className="table-list">
      <thead>
        <tr>
          <th>{t('rental.fields.customer')}</th>
          <th>{t('rental.fields.equipment')}</th>
          <th>{t('rental.fields.startDate')}</th>
          <th>{t('rental.fields.endDate')}</th>
          <th>{t('list.actions.title')}</th>
        </tr>
      </thead>
      <tbody>
        {rentals.map((rental) => (
          <RentalListTableRow rentalData={rental} key={rental._id} />
        ))}
      </tbody>
    </table>
  );
}

export default RentalListTable;
