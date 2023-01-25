import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { getRepairsApiCall } from '../../apiCalls/repairApiCalls';
import RepairListTable from './RepairListTable';
import { withTranslation } from 'react-i18next';
import { isEmployee } from '../../helpers/authHelper';

class RepairList extends React.Component {
  constructor(props) {
    super(props);
    let notice = this.props.location.state?.notice;
    this.state = {
      error: null,
      isLoaded: false,
      repairs: [],
      notice: notice
    };
  }

  componentDidMount() {
    this.fetchRepairList();
  }

  fetchRepairList = () => {
    getRepairsApiCall()
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            repairs: data
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
    const { error, isLoaded, repairs } = this.state;

    let content = '';

    if (error) {
      content = (
        <p>
          {t('common.error')}: {error.message}
        </p>
      );
    } else if (!isLoaded) {
      content = <p>{t('common.loading')}</p>;
    } else if (repairs.length === 0) {
      content = <p>{t('repair.list.noData')}</p>;
    } else {
      content = <RepairListTable repairs={repairs} />;
    }

    return (
      <main>
        <h2>{t('repair.list.pageTitle')}</h2>
        <p className={'notice-' + this.state.notice?.type}>{this.state.notice?.message}</p>
        {content}
        {isEmployee() && (
          <div className="section-buttons">
            <Link to="/repairs/add" className="button-add">
              {t('repair.list.addNew')}
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

export default withTranslation()(withRouter(RepairList));
