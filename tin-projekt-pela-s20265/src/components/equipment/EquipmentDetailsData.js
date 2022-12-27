import React from 'react';
import { getFormattedDate } from '../../helpers/dateHelper';

function EquipmentDetailsData(props) {
  const equipment = props.equipmentData;

  if (equipment.rentals.length !== 0) {
    return (
      <React.Fragment>
        <p>tp: {equipment.type}</p>
        <p>pr: {equipment.purpose}</p>
        <p>sz:{equipment.size}</p>
        <h2>rent hist</h2>
        <table className="table-list">
          <thead>
            <tr>
              <th>fn</th>
              <th>ln</th>
              <th>startdate</th>
              <th>enddate</th>
            </tr>
          </thead>
          <tbody>
            {equipment.rentals.map((rental) => (
              <tr key={rental._id}>
                <td>{rental.customer.firstName}</td>
                <td>{rental.customer.lastName}</td>
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
        <p>tp: {equipment.type}</p>
        <p>pr: {equipment.purpose}</p>
        <p>sz:{equipment.size}</p>
        <h3>no rentals</h3>
      </React.Fragment>
    );
  }
}

export default EquipmentDetailsData;
