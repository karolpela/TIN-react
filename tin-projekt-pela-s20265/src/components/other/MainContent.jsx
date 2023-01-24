import React from 'react';
import { withTranslation } from 'react-i18next';
import withRouter from '../../helpers/routerHelper';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    let notice = this.props.router.location.state?.notice;
    this.state = {
      notice: notice
    };
  }

  render() {
    const { t } = this.props;
    return (
      <main>
        <p className={'notice-' + this.state.notice?.type}>{this.state.notice?.message}</p>
        <h2>{t('mainPage.content')}</h2>
        <p>{t('mainPage.description')}</p>
      </main>
    );
  }
}

export default withTranslation()(withRouter(MainContent));
