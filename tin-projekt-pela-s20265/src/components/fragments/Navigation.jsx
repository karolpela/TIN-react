import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getCurrentUser, isAuthenticated } from '../../helpers/authHelper';
import withRouter from '../../helpers/routerHelper';
import NavElements from './NavElements';

class Navigation extends React.Component {
  handleLanguageChange = (language) => {
    const { i18n } = this.props;
    // eslint-disable-next-line no-unused-vars
    i18n.changeLanguage(language, (err, t) => {
      if (err) return console.log('loading error', err);
    });
  };

  render() {
    const { t } = this.props;
    const loginLogoutLink = isAuthenticated() ? (
      <button onClick={this.props.handleLogout}>
        {t('nav.logOut') + `(${getCurrentUser().role})`}
      </button>
    ) : (
      <Link to="/login">{t('nav.logIn')}</Link>
    );
    return (
      <nav>
        <ul>
          <NavElements />
          <li className="lang">{loginLogoutLink}</li>
          <li>
            <button
              onClick={() => {
                this.handleLanguageChange('pl');
              }}
            >
              PL
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                this.handleLanguageChange('en');
              }}
            >
              EN
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(withTranslation()(Navigation));
