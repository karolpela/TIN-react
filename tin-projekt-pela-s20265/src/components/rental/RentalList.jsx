import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getRentalsApiCall } from '../../apiCalls/rentalApiCalls';
import RentalListTable from './RentalListTable';
import { withTranslation } from 'react-i18next';

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
        <p className={this.state.notice ? 'success' : ''}>{this.state.notice}</p>
        {content}
        <p className="section-buttons">
          <Link to="/rentals/add" className="button-add">
            {t('rental.list.addNew')}
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

export default withTranslation()(withRouter(RentalList));
