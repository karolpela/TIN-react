import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper';

function ServiceListTableRow(props) {
  const { t } = useTranslation();
  const service = props.serviceData;
  return (
    <tr>
      <td>{service._id}</td>
      <td>
        {service.equipment.type + ' ' + service.equipment.purpose + ' ' + service.equipment.size}
      </td>
      <td>{service.type}</td>
      <td>{service.status}</td>
      {/* TODO add state */}
      {isAuthenticated() && (
        <td>
          <ul className="list-actions">
            <li>
              <Link to={`/services/details/${service._id}`} className="list-actions-button-details">
                {t('list.actions.details')} <span className="material-symbols-outlined">info</span>
              </Link>
            </li>
            <li>
              <Link to={`/services/edit/${service._id}`} className="list-actions-button-edit">
                {t('list.actions.edit')} <span className="material-symbols-outlined">edit</span>
              </Link>
            </li>
            <li>
              <Link to={`/services/delete/${service._id}`} className="list-actions-button-delete">
                {t('list.actions.delete')} <span className="material-symbols-outlined">delete</span>
              </Link>
            </li>
          </ul>
        </td>
      )}
    </tr>
  );
}

export default ServiceListTableRow;
