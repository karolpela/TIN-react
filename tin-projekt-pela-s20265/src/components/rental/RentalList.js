import React from 'react';
import { Link } from 'react-router-dom';
import { getRentalsApiCall } from '../../apiCalls/rentalApiCalls';
import RentalListTable from './RentalListTable';

class RentalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rentals: []
    };
  }

  componentDidMount() {
    this.fetchRentalList();
  }

  fetchRentalList = () => {
    getRentalsApiCall()
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            rentals: data
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
    const { error, isLoaded, rentals } = this.state;
    let content;

    if (error) {
      content = <p>err: {error.message}</p>;
    } else if (!isLoaded) {
      content = <p>loading rentals</p>;
    } else if (rentals.length === 0) {
      content = <p>no rentals</p>;
    } else {
      content = <RentalListTable rentals={rentals} />;
    }

    return (
      <main>
        <h2>rent list</h2>
        {content}
        <p className="section-buttons">
          <Link to="/rentals/add" className="button-add">
            add new
          </Link>
        </p>
      </main>
    );
  }
}

export default RentalList;
