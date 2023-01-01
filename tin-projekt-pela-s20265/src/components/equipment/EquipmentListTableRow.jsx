import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function EquipmentListTableRow(props) {
  const { t } = useTranslation();
  const equipment = props.equipmentData;
  return (
    <tr>
      <td>{equipment.type}</td>
      <td>{equipment.purpose}</td>
      <td>{equipment.size}</td>
      <td>
        <ul className="list-actions">
          <li>
            <Link
              to={`/equipment/details/${equipment._id}`}
              className="list-actions-button-details"
            >
              {t('list.actions.details')} <span className="material-symbols-outlined">info</span>
            </Link>
          </li>
          <li>
            <Link to={`/equipment/edit/${equipment._id}`} className="list-actions-button-edit">
              {t('list.actions.edit')} <span className="material-symbols-outlined">edit</span>
            </Link>
          </li>
          <li>
            <Link to={`/equipment/delete/${equipment._id}`} className="list-actions-button-delete">
              {t('list.actions.delete')} <span className="material-symbols-outlined">delete</span>
            </Link>
          </li>
        </ul>
      </td>
    </tr>
  );
}

export default EquipmentListTableRow;
