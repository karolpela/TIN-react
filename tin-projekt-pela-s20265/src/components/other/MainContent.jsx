import { useTranslation } from 'react-i18next';

function MainContent() {
  const { t } = useTranslation();
  return (
    <main>
      <h2>{t('mainPage.content')}</h2>
      <p>{t('mainPage.description')}</p>
    </main>
  );
}

export default MainContent;
