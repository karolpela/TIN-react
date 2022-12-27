import { Link } from 'react-router-dom';

function RentalListTableRow(props) {
  const rental = props.rentalData;
  return (
    <tr>
      <td>{rental.customer.firstName}</td>
      <td>{rental.customer.lastName}</td>
      <td>
        {rental.equipment.type + ' ' + rental.equipment.purpose + ' ' + rental.equipment.size}
      </td>
      <td>
        <ul className="list-actions">
          <li>
            <Link to={`/rentals/details/${rental._id}`} className="list-actions-button-details">
              {' '}
              dt
            </Link>
          </li>
          <li>
            <Link to={`/rentals/edit/${rental._id}`} className="list-actions-button-edit">
              ed
            </Link>
          </li>
          <li>
            <Link to={`/rentals/delete/${rental._id}`} className="list-actions-button-delete">
              del
            </Link>
          </li>
        </ul>
      </td>
    </tr>
  );
}

export default RentalListTableRow;
