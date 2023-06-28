import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../helpers/authHelper';

class ProtectedRoute extends React.Component {
  render() {
    const Component = this.props.component;
    return isAuthenticated() ? (
      <>{Component}</>
    ) : (
      <>
        <Navigate to="/login" replace />
      </>
    );
  }
}

export default ProtectedRoute;
