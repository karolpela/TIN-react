import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { getRepairByIdApiCall } from '../../apiCalls/repairApiCalls';
import RepairDetailsData from './RepairDetailsData';

class RepairDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repair: null,
      error: null,
      isLoaded: false,
      message: null
    };
  }

  componentDidMount() {
    this.fetchRepairDetails();
  }

  fetchRepairDetails = () => {
    let repairId = parseInt(this.props.match.params.repairId);
    getRepairByIdApiCall(repairId)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              repair: null,
              message: data.message
            });
          } else {
            this.setState({
              repair: data,
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
    const { repair, error, isLoaded, message } = this.state;
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
      content = <RepairDetailsData custData={repair} />;
    }

    return (
      <main>
        <h2>{t('repair.form.details.pageTitle')}</h2>
        {content}
        <div className="section-buttons">
          <Link to="/repairs" className="form-button-back">
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

export default withTranslation()(withRouter(RepairDetails));
