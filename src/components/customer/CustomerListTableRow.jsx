import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper';

function CustomerListTableRow(props) {
  const { t } = useTranslation();
  const customer = props.customerData;
  return (
    <tr>
      <td>{customer.firstName}</td>
      <td>{customer.lastName}</td>
      <td>{customer.phoneNo}</td>
      {isAuthenticated() && (
        <td>
          <ul className="list-actions">
            <li>
              <Link
                to={`/customers/details/${customer._id}`}
                className="list-actions-button-details"
              >
                {t('list.actions.details')} <span className="material-symbols-outlined">info</span>
              </Link>
            </li>
            <li>
              <Link to={`/customers/edit/${customer._id}`} className="list-actions-button-edit">
                {t('list.actions.edit')} <span className="material-symbols-outlined">edit</span>
              </Link>
            </li>
            <li>
              <Link to={`/customers/delete/${customer._id}`} className="list-actions-button-delete">
                {t('list.actions.delete')} <span className="material-symbols-outlined">delete</span>
              </Link>
            </li>
          </ul>
        </td>
      )}
    </tr>
  );
}

export default CustomerListTableRow;
