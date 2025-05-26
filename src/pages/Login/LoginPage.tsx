import LoginForm from '@/components/LoginForm/LoginForm';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <div>
      <h2 className={styles.loginTitle}>Login to STORE</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
