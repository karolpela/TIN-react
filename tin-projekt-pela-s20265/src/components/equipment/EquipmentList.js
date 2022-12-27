import { Link } from 'react-router-dom';
import { getEquipmentApiCall } from '../../apiCalls/equipmentApiCalls';

function EquipmentList() {
  const equipmentList = getEquipmentApiCall();
  return (
    <main>
      <h2>eq list</h2>
      <table className="table-list">
        <thead>
          <tr>
            <th>tp</th>
            <th>pr</th>
            <th>sz</th>
            <th>ac</th>
          </tr>
        </thead>
        <tbody>
          {equipmentList.map((eq) => (
            <tr key={eq._id}>
              <td>{eq.type}</td>
              <td>{eq.purpose}</td>
              <td>{eq.size}</td>
              <td>
                <ul className="list-actions">
                  <li>
                    <Link className="list-actions-button-details">dt</Link>
                  </li>
                  <li>
                    <Link className="list-actions-button-edit">ed</Link>
                  </li>
                  <li>
                    <Link className="list-actions-button-delete">del</Link>
                  </li>
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="section-buttons">
        <Link to="/equipments/add" className="button-add">
          add
        </Link>
      </p>
    </main>
  );
}

export default EquipmentList;
