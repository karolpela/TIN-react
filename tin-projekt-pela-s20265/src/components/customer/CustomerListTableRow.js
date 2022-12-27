import { Link } from 'react-router-dom';

function CustomerListTableRow(props) {
  const customer = props.customerData;
  return (
    <tr>
      <td>{customer.firstName}</td>
      <td>{customer.lastName}</td>
      <td>{customer.phoneNo}</td>
      <td>
        <ul className="list-actions">
          <li>
            <Link to={`/customers/details/${customer._id}`} className="list-actions-button-details">
              {' '}
              dt
            </Link>
          </li>
          <li>
            <Link to={`/customers/edit/${customer._id}`} className="list-actions-button-edit">
              ed
            </Link>
          </li>
          <li>
            <Link to={`/customers/delete/${customer._id}`} className="list-actions-button-delete">
              del
            </Link>
          </li>
        </ul>
      </td>
    </tr>
  );
}

export default CustomerListTableRow;
