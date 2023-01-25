import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../../helpers/authHelper';
import { withTranslation } from 'react-i18next';

class AdminOnlyRoute extends React.Component {
  render() {
    const { t } = this.props;
    const Component = this.props.component;
    return isAdmin() ? (
      <>{Component}</>
    ) : (
      <>
        <Navigate
          to="/"
          state={{ notice: { message: t('auth.noPermissionsRedirect'), type: 'fail' } }}
          replace
        />
      </>
    );
  }
}

export default withTranslation(null, { withRef: true })(AdminOnlyRoute);
