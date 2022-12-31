import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { getCustomersApiCall } from '../../apiCalls/customerApiCalls';
import CustomerListTable from './CustomerListTable';

class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    let notice = this.props.location.state?.notice;
    this.state = {
      error: null,
      isLoaded: false,
      customers: [],
      notice: notice
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

    let content = '';

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
        <p className={this.state.notice ? 'success' : ''}>{this.state.notice}</p>
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

export function withRouter(Children) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const match = { params: useParams() };
    const location = useLocation();
    return <Children {...props} match={match} location={location} />;
  };
}

export default withRouter(CustomerList);
