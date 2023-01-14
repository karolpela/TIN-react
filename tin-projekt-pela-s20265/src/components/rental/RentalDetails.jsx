import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { getRentalByIdApiCall } from '../../apiCalls/rentalApiCalls';
import RentalDetailsData from './RentalDetailsData';

class RentalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rental: null,
      error: null,
      isLoaded: false,
      message: null
    };
  }

  componentDidMount() {
    this.fetchRentalDetails();
  }

  fetchRentalDetails = () => {
    let rentalId = parseInt(this.props.match.params.rentalId);
    getRentalByIdApiCall(rentalId)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              rental: null,
              message: data.message
            });
          } else {
            this.setState({
              rental: data,
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
    const { t } = this.props;
    const { rental, error, isLoaded, message } = this.state;
    let content;

    if (error) {
      content = (
        <p>
          {t('common.error')}: {error.message}
        </p>
      );
    } else if (!isLoaded) {
      content = <p>{t('common.loading')}:</p>;
    } else if (message) {
      content = <p>{message}</p>;
    } else {
      content = <RentalDetailsData custData={rental} />;
    }

    return (
      <main>
        <h2>cust det</h2>
        {content}
        <div className="section-buttons">
          <Link to="/rentals" className="form-button-back">
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

export default withTranslation()(withRouter(RentalDetails));
