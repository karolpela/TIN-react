import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { getServiceByIdApiCall } from '../../apiCalls/serviceApiCalls';
import ServiceDetailsData from './ServiceDetailsData';

class ServiceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: null,
      error: null,
      isLoaded: false,
      message: null
    };
  }

  componentDidMount() {
    this.fetchServiceDetails();
  }

  fetchServiceDetails = () => {
    let serviceId = parseInt(this.props.match.params.serviceId);
    getServiceByIdApiCall(serviceId)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              service: null,
              message: data.message
            });
          } else {
            this.setState({
              service: data,
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
    const { service, error, isLoaded, message } = this.state;
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
      content = <ServiceDetailsData custData={service} />;
    }

    return (
      <main>
        <h2>{t('service.form.details.pageTitle')}</h2>
        {content}
        <div className="section-buttons">
          <Link to="/services" className="form-button-back">
            {t('form.actions.return')}
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

export default withTranslation()(withRouter(ServiceDetails));
