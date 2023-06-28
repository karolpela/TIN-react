import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isAuthenticated, isEmployee } from '../../helpers/authHelper';

function EquipmentListTableRow(props) {
  const { t } = useTranslation();
  const equipment = props.equipmentData;
  return (
    <tr>
      <td>{equipment.type}</td>
      <td>{equipment.purpose}</td>
      <td>{equipment.size}</td>
      {isAuthenticated() && (
        <td>
          <ul className="list-actions">
            <li>
              <Link // make regular users only able to view details without history
                to={`/equipment/details/${equipment._id}`}
                className="list-actions-button-details"
              >
                {t('list.actions.details')} <span className="material-symbols-outlined">info</span>
              </Link>
            </li>
            {isEmployee() && (
              <>
                <li>
                  <Link
                    to={`/equipment/edit/${equipment._id}`}
                    className="list-actions-button-edit"
                  >
                    {t('list.actions.edit')} <span className="material-symbols-outlined">edit</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/equipment/delete/${equipment._id}`}
                    className="list-actions-button-delete"
                  >
                    {t('list.actions.delete')}{' '}
                    <span className="material-symbols-outlined">delete</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </td>
      )}
    </tr>
  );
}

export default EquipmentListTableRow;
