import { Link, useParams } from 'react-router-dom';
import { getCustomerByIdApiCall } from '../../apiCalls/customerApiCalls';
import { getFormattedDate } from '../../helpers/dateHelper';

function CustomerDetails() {
  let { custId } = useParams();
  custId = parseInt(custId);
  const cust = getCustomerByIdApiCall(custId);

  return (
    <main>
      <h2>cust det</h2>
      <p>fn: {cust.firstName}</p>
      <p>ln: {cust.lastName}</p>
      <p>pn: {cust.phoneNo}</p>
      <h2>rent hist</h2>
      <table>
        <thead>
          <tr>
            <th>eq</th>
            <th>size</th>
            <th>from</th>
            <th>to</th>
          </tr>
        </thead>
        <tbody>
          {cust.rentals.map((rental) => (
            <tr key={rental._id}>
              <td>{rental.equipment.type}</td>
              <td>{rental.equipment.size}</td>
              <td>{getFormattedDate(rental.startDate)}</td>
              <td>{rental.endDate ? getFormattedDate(rental.endDate) : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sectionButtons">
        <Link to="/customers" className="button-back">
          ret
        </Link>
      </div>
    </main>
  );
}

export default CustomerDetails;
