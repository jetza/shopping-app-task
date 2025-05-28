import styles from './Toast.module.scss';

interface ToastProps {
  message: string;
}

const Toast = ({ message }: ToastProps) => {
  return <div className={styles.toast}>{message}</div>;
};

export default Toast;
