import LoginForm from '@/components/LoginForm/LoginForm';
import { useTranslation } from 'react-i18next';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className={styles.loginTitle}>{t('loginPage.title')}</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
