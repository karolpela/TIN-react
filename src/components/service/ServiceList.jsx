import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { getServicesApiCall } from '../../apiCalls/serviceApiCalls';
import ServiceListTable from './ServiceListTable';
import { withTranslation } from 'react-i18next';

class ServiceList extends React.Component {
  constructor(props) {
    super(props);
    let notice = this.props.location.state?.notice;
    this.state = {
      error: null,
      isLoaded: false,
      services: [],
      notice: notice
    };
  }

  componentDidMount() {
    this.fetchServiceList();
  }

  fetchServiceList = () => {
    getServicesApiCall()
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            services: data
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
    const { error, isLoaded, services } = this.state;

    let content = '';

    if (error) {
      content = (
        <p>
          {t('common.error')}: {error.message}
        </p>
      );
    } else if (!isLoaded) {
      content = <p>{t('common.loading')}</p>;
    } else if (services.length === 0) {
      content = <p>{t('service.list.noData')}</p>;
    } else {
      content = <ServiceListTable services={services} />;
    }

    return (
      <main>
        <h2>{t('service.list.pageTitle')}</h2>
        <p className={'notice-' + this.state.notice?.type}>{this.state.notice?.message}</p>
        {content}
        <div className="section-buttons">
          <Link to="/services/add" className="button-add">
            {t('service.list.addNew')}
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
    const location = useLocation();
    return <Children {...props} match={match} location={location} />;
  };
}

export default withTranslation()(withRouter(ServiceList));
