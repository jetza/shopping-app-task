import styles from './Toast.module.scss';

interface ToastProps {
  message: string;
  error?: boolean;
  info?: boolean;
}

const Toast = ({ message, error, info }: ToastProps) => {
  let className = styles.toast;
  if (error) className = styles.toastError;
  else if (info) className = styles.toastInfo;
  return <div className={className}>{message}</div>;
};

export default Toast;
