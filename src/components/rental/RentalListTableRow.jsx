import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getFormattedDate } from '../../helpers/dateHelper';
import { isEmployee } from '../../helpers/authHelper';

function RentalListTableRow(props) {
  const { t } = useTranslation();
  const rental = props.rentalData;

  return (
    <tr>
      <td>{rental.customer.firstName + ' ' + rental.customer.lastName}</td>
      <td>
        {rental.equipment.type + ' ' + rental.equipment.purpose + ' ' + rental.equipment.size}
      </td>
      <td>{getFormattedDate(rental.startDate)}</td>
      <td>{rental.endDate ? getFormattedDate(rental.endDate) : ''}</td>
      <td>
        <ul className="list-actions">
          <li>
            <Link to={`/rentals/details/${rental._id}`} className="list-actions-button-details">
              {t('list.actions.details')} <span className="material-symbols-outlined">info</span>
            </Link>
          </li>
          {isEmployee() && (
            <>
              <li>
                <Link to={`/rentals/edit/${rental._id}`} className="list-actions-button-edit">
                  {t('list.actions.edit')} <span className="material-symbols-outlined">edit</span>
                </Link>
              </li>
              <li>
                <Link to={`/rentals/delete/${rental._id}`} className="list-actions-button-delete">
                  {t('list.actions.delete')}{' '}
                  <span className="material-symbols-outlined">delete</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </td>
    </tr>
  );
}

export default RentalListTableRow;
