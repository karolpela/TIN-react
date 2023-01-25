import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper';

function RepairListTableRow(props) {
  const { t } = useTranslation();
  const repair = props.repairData;
  return (
    <tr>
      <td>{t('service.fields.number') + ' ' + repair.service._id + ' ' + repair.service.type}</td>
      <td>{repair.employee.firstName + ' ' + repair.employee.lastName}</td>
      <td>{repair.problem}</td>
      <td>{repair.status}</td>
      {isAuthenticated() && (
        <td>
          <ul className="list-actions">
            <li>
              <Link to={`/repairs/details/${repair._id}`} className="list-actions-button-details">
                {t('list.actions.details')} <span className="material-symbols-outlined">info</span>
              </Link>
            </li>
            <li>
              <Link to={`/repairs/edit/${repair._id}`} className="list-actions-button-edit">
                {t('list.actions.edit')} <span className="material-symbols-outlined">edit</span>
              </Link>
            </li>
            <li>
              <Link to={`/repairs/delete/${repair._id}`} className="list-actions-button-delete">
                {t('list.actions.delete')} <span className="material-symbols-outlined">delete</span>
              </Link>
            </li>
          </ul>
        </td>
      )}
    </tr>
  );
}

export default RepairListTableRow;
