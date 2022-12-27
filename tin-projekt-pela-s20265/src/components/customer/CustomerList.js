import React from 'react';
import { Link } from 'react-router-dom';
import { getCustomersApiCall } from '../../apiCalls/customerApiCalls';
import CustomerListTable from './CustomerListTable';

class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      customers: []
    };
  }

  componentDidMount() {
    this.fetchCustomerList();
  }

  fetchCustomerList = () => {
    getCustomersApiCall()
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            customers: data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  render() {
    const { error, isLoaded, customers } = this.state;

    let content;

    if (error) {
      content = <p>err: {error.message}</p>;
    } else if (!isLoaded) {
      content = <p>loading...</p>;
    } else if (customers.length === 0) {
      content = <p>no customers</p>;
    } else {
      content = <CustomerListTable customers={customers} />;
    }

    return (
      <main>
        <h2>cs list</h2>
        {content}
        <p className="section-buttons">
          <Link to="/customers/add" className="button-add">
            add new
          </Link>
        </p>
      </main>
    );
  }
}

export default CustomerList;
