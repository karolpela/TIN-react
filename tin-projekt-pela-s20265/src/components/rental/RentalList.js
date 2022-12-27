import { Link } from 'react-router-dom';
import { getRentalsApiCall } from '../../apiCalls/rentalApiCalls';

function RentalList() {
  const rentalList = getRentalsApiCall();

  return (
    <main>
      <h2>rent lst</h2>
      <table className="table-list">
        <thead>
          <tr>
            <th>fn</th>
            <th>ln</th>
            <th>eq</th>
            <th>ac</th>
          </tr>
        </thead>
        <tbody>
          {rentalList.map((rental) => (
            <tr key="{rental._id}">
              <td>{rental.customer.firstName}</td>
              <td>{rental.customer.lastName}</td>
              <td>
                {rental.equipment.type} {rental.equipment.purpose} {rental.equipment.size}
              </td>
              <td>
                <ul className="list-actions">
                  <li>
                    <Link to={`rental/details/rental._id`} className="list-actions-button-details">
                      dt
                    </Link>
                  </li>
                  <li>
                    <Link to={`rental/edit/rental._id`} className="list-actions-button-edit">
                      ed
                    </Link>
                  </li>
                  <li>
                    <Link to={`rental/delete/rental._id`} className="list-actions-button-delete">
                      del
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="section-buttons">
        <Link to="/rental/add" className="button-add">
          add new
        </Link>
      </p>
    </main>
  );
}

export default RentalList;
