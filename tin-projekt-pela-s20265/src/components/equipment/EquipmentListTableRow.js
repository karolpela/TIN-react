import { Link } from 'react-router-dom';

function EquipmentListTableRow(props) {
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
              {' '}
              dt
            </Link>
          </li>
          <li>
            <Link to={`/equipment/edit/${equipment._id}`} className="list-actions-button-edit">
              ed
            </Link>
          </li>
          <li>
            <Link to={`/equipment/delete/${equipment._id}`} className="list-actions-button-delete">
              del
            </Link>
          </li>
        </ul>
      </td>
    </tr>
  );
}

export default EquipmentListTableRow;
