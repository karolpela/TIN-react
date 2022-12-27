import { Link } from 'react-router-dom';
import { getRentalByIdApiCall } from '../../apiCalls/rentalApiCalls';
import { getFormattedDate } from '../../helpers/dateHelper';
import PropTypes from 'prop-types';

function RentalDetails({ match }) {
  const rentalId = parseInt(match.params.rentalId);
  const rental = getRentalByIdApiCall(rentalId);
  const rentalStartDate = getFormattedDate(rental.startDate);
  const rentalEndDate = rental.endDate ? getFormattedDate(rental.endDate) : '';

  return (
    <main>
      <h2>rent det</h2>
      <p>Imię: {rental.customer.firstName}</p>
      <p>Nazwisko: {rental.customer.firstName}</p>
      <p>
        Sprzęt: {rental.equipment.type} {rental.equipment.purpose} {rental.equipment.size}
      </p>
      <p>Data wypożyczenia: {rentalStartDate}</p>
      {rentalEndDate && <p>Data zwrotu: {rentalEndDate}</p>}
      <div className="section-buttons">
        <Link to="/rentals" className="button-back">
          bck
        </Link>
      </div>
    </main>
  );
}
RentalDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      rentalId: PropTypes.string
    })
  })
};

export default RentalDetails;
