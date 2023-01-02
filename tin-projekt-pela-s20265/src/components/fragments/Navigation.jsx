import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  handleLanguageChange = (language) => {
    const { i18n } = this.props;
    // eslint-disable-next-line no-unused-vars
    i18n.changeLanguage(language, (err, t) => {
      if (err) return console.log('loading error', err);
    });
  };

  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">sg</Link>
          </li>
          <li>
            <Link to="/customers">cs</Link>
          </li>
          <li>
            <Link to="/rentals">rt</Link>
          </li>
          <li>
            <Link to="/equipment">eq</Link>
          </li>
          <li className="lang">
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

export default withTranslation()(Navigation);
