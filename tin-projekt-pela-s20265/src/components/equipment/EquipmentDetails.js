import { Link, useParams } from 'react-router-dom';
import { getEquipmentByIdApiCall } from '../../apiCalls/equipmentApiCalls';
import { getFormattedDate } from '../../helpers/dateHelper';

function EquipmentDetails() {
  let { eqId } = useParams();
  eqId = parseInt(eqId);
  const eq = getEquipmentByIdApiCall(eqId);

  return (
    <main>
      <h2>eq det</h2>
      <p>tp: {eq.type}</p>
      <p>pr: {eq.purpose}</p>
      <p>sz: {eq.size}</p>
      <h2>rent hist</h2>
      <table>
        <thead>
          <tr>
            <th>cs</th>
            <th>from</th>
            <th>to</th>
          </tr>
        </thead>
        <tbody>
          {eq.rentals.map((rental) => (
            <tr key={rental._id}>
              <td>{rental.customer.firstName + ' ' + rental.customer.lastName}</td>
              <td>{getFormattedDate(rental.startDate)}</td>
              <td>{rental.endDate ? getFormattedDate(rental.endDate) : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sectionButtons">
        <Link to="/equipment" className="button-back">
          ret
        </Link>
      </div>
    </main>
  );
}

export default EquipmentDetails;
