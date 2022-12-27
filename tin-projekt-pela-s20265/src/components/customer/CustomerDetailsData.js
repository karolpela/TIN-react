import React from 'react';
import { getFormattedDate } from '../../helpers/dateHelper';

function CustomerDetailsData(props) {
  const customer = props.custData;

  if (customer.rentals.length !== 0) {
    return (
      <React.Fragment>
        <p>fn: {customer.firstName}</p>
        <p>ln: {customer.lastName}</p>
        <p>pn: {customer.phoneNo}</p>
        <h2>rent hist</h2>
        <table className="table-list">
          <thead>
            <tr>
              <th>eq</th>
              <th>size</th>
              <th>from</th>
              <th>to</th>
            </tr>
          </thead>
          <tbody>
            {customer.rentals.map((rental) => (
              <tr key={rental._id}>
                <td>{rental.equipment.type}</td>
                <td>{rental.equipment.size}</td>
                <td>{getFormattedDate(rental.startDate)}</td>
                <td>{rental.endDate ? getFormattedDate(rental.endDate) : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>fn: {customer.firstName}</p>
        <p>ln: {customer.lastName}</p>
        <p>pn: {customer.phoneNo}</p>
        <h3>no rentals</h3>
      </React.Fragment>
    );
  }
}

export default CustomerDetailsData;
