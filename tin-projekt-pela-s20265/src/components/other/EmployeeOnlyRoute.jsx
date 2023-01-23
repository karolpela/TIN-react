import React from 'react';
import { Navigate } from 'react-router-dom';
import { isEmployee } from '../../helpers/authHelper';
import { withTranslation } from 'react-i18next';

class EmployeeOnlyRoute extends React.Component {
  render() {
    const { t } = this.props;
    const Component = this.props.component;
    return isEmployee() ? (
      <>{Component}</>
    ) : (
      <>
        <Navigate to="/" state={{ notice: t('auth.noPermissionsRedirect') }} replace />
      </>
    );
  }
}

export default withTranslation(null, { withRef: true })(EmployeeOnlyRoute);
