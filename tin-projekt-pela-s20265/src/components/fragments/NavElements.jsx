import { Link } from 'react-router-dom';
import { isEmployee } from '../../helpers/authHelper';
import { useTranslation } from 'react-i18next';

function NavElements() {
  const { t } = useTranslation();
  if (isEmployee()) {
    return (
      <>
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
        <li>
          <Link to="/services">{t('nav.services')}</Link>
        </li>
        <li>
          <Link to="/repairs">{t('nav.repairs')}</Link>
        </li>
      </>
    );
  } else {
    return (
      <>
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
      </>
    );
  }
}

export default NavElements;
