import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getEquipmentApiCall } from '../../apiCalls/equipmentApiCalls';
import EquipmentListTable from './EquipmentListTable';
import { withTranslation } from 'react-i18next';
import { isEmployee } from '../../helpers/authHelper';

class EquipmentList extends React.Component {
  constructor(props) {
    super(props);
    let notice = this.props.location.state?.notice;
    this.state = {
      error: null,
      isLoaded: false,
      equipment: [],
      notice: notice
    };
  }

  componentDidMount() {
    this.fetchEquipmentList();
  }

  fetchEquipmentList = () => {
    getEquipmentApiCall()
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            equipment: data
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
    const { error, isLoaded, equipment } = this.state;

    let content;

    if (error) {
      content = (
        <p>
          {t('common.error')}: {error.message}
        </p>
      );
    } else if (!isLoaded) {
      content = <p>{t('common.loading')}</p>;
    } else if (equipment.length === 0) {
      content = <p>{t('equipment.list.noData')}</p>;
    } else {
      content = <EquipmentListTable equipment={equipment} />;
    }

    return (
      <main>
        <h2>{t('equipment.list.pageTitle')}</h2>
        <p className={this.state.notice ? 'successNotice' : ''}>{this.state.notice}</p>
        {content}
        {isEmployee() && (
          <div className="section-buttons">
            <Link to="/equipment/add" className="button-add">
              {t('equipment.list.addNew')}
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

export default withTranslation()(withRouter(EquipmentList));
