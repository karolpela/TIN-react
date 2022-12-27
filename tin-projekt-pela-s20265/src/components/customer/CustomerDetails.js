import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCustomerByIdApiCall } from '../../apiCalls/customerApiCalls';
import CustomerDetailsData from './CustomerDetailsData';

class CustomerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
      error: null,
      isLoaded: false,
      message: null
    };
  }

  componentDidMount() {
    this.fetchCustomerDetails();
  }

  fetchCustomerDetails = () => {
    let customerId = parseInt(this.props.match.params.customerId);
    getCustomerByIdApiCall(customerId)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              customer: null,
              message: data.message
            });
          } else {
            this.setState({
              customer: data,
              message: null
            });
          }
          this.setState({
            isLoaded: true
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
    const { customer, error, isLoaded, message } = this.state;
    let content;

    if (error) {
      content = <p>err: {error.message}</p>;
    } else if (!isLoaded) {
      content = <p>loading...</p>;
    } else if (message) {
      content = <p>{message}</p>;
    } else {
      content = <CustomerDetailsData custData={customer} />;
    }

    return (
      <main>
        <h2>cust det</h2>
        {content}
        <div className="sectionButtons">
          <Link to="/customers" className="form-button-back">
            ret
          </Link>
        </div>
      </main>
    );
  }
}

export function withRouter(Children) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

export default withRouter(CustomerDetails);
