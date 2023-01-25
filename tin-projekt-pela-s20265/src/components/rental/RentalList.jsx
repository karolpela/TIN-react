import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  getRentalsByCustomerCall as getRentalsByCustomerApiCall,
  getRentalsApiCall
} from '../../apiCalls/rentalApiCalls';
import RentalListTable from './RentalListTable';
import { withTranslation } from 'react-i18next';
import { getCurrentUser, isEmployee } from '../../helpers/authHelper';

class RentalList extends React.Component {
  constructor(props) {
    super(props);
    let notice = this.props.location.state?.notice;
    this.state = {
      error: null,
      isLoaded: false,
      rentals: [],
      notice: notice
    };
  }

  componentDidMount() {
    this.fetchRentalList();
  }

  fetchRentalList = () => {
    const user = getCurrentUser();
    (isEmployee() ? getRentalsApiCall() : getRentalsByCustomerApiCall(user.userId))
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
    const { t } = this.props;
    const { error, isLoaded, rentals } = this.state;
    let content;

    if (error) {
      content = (
        <p>
          {t('common.error')}: {error.message}
        </p>
      );
    } else if (!isLoaded) {
      content = <p>{t('common.loading')}</p>;
    } else if (rentals.length === 0) {
      content = <p>{t('rental.list.noData')}</p>;
    } else {
      content = <RentalListTable rentals={rentals} />;
    }

    return (
      <main>
        <h2>{t('rental.list.pageTitle')}</h2>
        <p className={'notice-' + this.state.notice?.type}>{this.state.notice?.message}</p>
        {content}
        {isEmployee() && (
          <p className="section-buttons">
            <Link to="/rentals/add" className="button-add">
              {t('rental.list.addNew')}
            </Link>
          </p>
        )}
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

export default withTranslation()(withRouter(RentalList));
