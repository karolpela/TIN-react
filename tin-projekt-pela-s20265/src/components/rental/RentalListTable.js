import RentalListTableRow from './RentalListTableRow';

function RentalListTable(props) {
  const rentals = props.rentals;
  return (
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
        {rentals.map((rental) => (
          <RentalListTableRow rentalData={rental} key={rental._id} />
        ))}
      </tbody>
    </table>
  );
}

export default RentalListTable;
