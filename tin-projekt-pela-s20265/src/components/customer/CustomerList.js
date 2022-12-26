import { Link } from 'react-router-dom';
import { getCustomersApiCall } from '../../apiCalls/customerApiCalls';

function CustomerList() {
  const customerList = getCustomersApiCall();
  return (
    <main>
      <h2>cs list</h2>
      <table className="table-list">
        <thead>
          <tr>
            <th>fn</th>
            <th>ln</th>
            <th>ph</th>
            <th>ac</th>
          </tr>
        </thead>
        <tbody>
          {customerList.map((cust) => (
            <tr key={cust._id}>
              <td>{cust.firstName}</td>
              <td>{cust.lastName}</td>
              <td>{cust.phoneNo}</td>
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
        <Link to="/customers/add" className="button-add">
          add
        </Link>
      </p>
    </main>
  );
}

export default CustomerList;
