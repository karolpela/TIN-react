import CustomerListTableRow from './CustomerListTableRow';

function CustomerListTable(props) {
  const customers = props.customers;
  return (
    <table className="table-list">
      <thead>
        <tr>
          <th>fn</th>
          <th>ln</th>
          <th>pn</th>
          <th>ac</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <CustomerListTableRow customerData={customer} key={customer._id} />
        ))}
      </tbody>
    </table>
  );
}

export default CustomerListTable;
