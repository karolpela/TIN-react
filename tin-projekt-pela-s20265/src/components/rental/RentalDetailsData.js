import React from 'react';
import { getFormattedDate } from '../../helpers/dateHelper';

function CustomerDetailsData(props) {
  const rental = props.custData;
  const rentalStartDate = getFormattedDate(rental.startDate);
  const rentalEndDate = rental.endDate ? getFormattedDate(rental.endDate) : '';
  return (
    <React.Fragment>
      <p>fn: {rental.customer.firstName}</p>
      <p>ln: {rental.customer.lastName}</p>
      <p>
        eq: {rental.equipment.type + ' ' + rental.equipment.purpose + ' ' + rental.equipment.size}
      </p>
      <p>startdate: {rentalStartDate}</p>
      {rentalEndDate && <p>enddate: {rentalEndDate}</p>}
    </React.Fragment>
  );
}

export default CustomerDetailsData;
