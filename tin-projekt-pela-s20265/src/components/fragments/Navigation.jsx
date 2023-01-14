import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../helpers/authHelper';
import withRouter from '../../helpers/routerHelper';

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
      <button onClick={this.props.handleLogout}>{t('nav.logOut')}</button>
    ) : (
      <Link to="/login">{t('nav.logIn')}</Link>
    );
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">{t('nav.mainPage')}</Link>
          </li>
          <li>
            <Link to="/customers">{t('nav.customers')}</Link>
          </li>
          <li>
            <Link to="/rentals">{t('nav.rentals')}</Link>
          </li>
          <li>
            <Link to="/equipment">{t('nav.equipment')}</Link>
          </li>
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
