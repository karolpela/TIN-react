import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { getCustomersApiCall } from '../../apiCalls/customerApiCalls';
import CustomerListTable from './CustomerListTable';
import { withTranslation } from 'react-i18next';
import { isEmployee } from '../../helpers/authHelper';

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
    const { t } = this.props;
    const { error, isLoaded, customers } = this.state;

    let content = '';

    if (error) {
      content = (
        <p>
          {t('common.error')}: {error.message}
        </p>
      );
    } else if (!isLoaded) {
      content = <p>{t('common.loading')}</p>;
    } else if (customers.length === 0) {
      content = <p>{t('customer.list.noData')}</p>;
    } else {
      content = <CustomerListTable customers={customers} />;
    }

    return (
      <main>
        <h2>{t('customer.list.pageTitle')}</h2>
        <p className={this.state.notice ? 'successNotice' : ''}>{this.state.notice}</p>
        {content}
        {isEmployee() && (
          <div className="section-buttons">
            <Link to="/customers/add" className="button-add">
              {t('customer.list.addNew')}
            </Link>
          </div>
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

export default withTranslation()(withRouter(CustomerList));
