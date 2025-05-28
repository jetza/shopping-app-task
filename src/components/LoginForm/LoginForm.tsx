import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '@/slices/authSlice';
import { useTranslation } from 'react-i18next';
import styles from './LoginForm.module.scss';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    if (data.username === 'admin' && data.password === 'Admin123$') {
      dispatch(login(data.username));
      navigate('/products');
    } else {
      alert(t('loginForm.wrongCredentials'));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.loginForm}
      aria-label={t('loginForm.formAria')}
      autoComplete="on"
      role="form"
    >
      <div>
        <label htmlFor="username">{t('loginForm.username')}</label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          aria-required="true"
          aria-invalid={!!errors.username}
          aria-describedby={errors.username ? 'username-error' : undefined}
          {...register('username')}
        />
        {errors.username && (
          <p id="username-error" role="alert">
            {t('loginForm.usernameRequired')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password">{t('loginForm.password')}</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-required="true"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
          {...register('password')}
        />
        {errors.password && (
          <p id="password-error" role="alert">
            {t('loginForm.passwordRequired')}
          </p>
        )}
      </div>

      <button type="submit" aria-label={t('loginForm.loginBtnAria')}>
        {t('loginForm.loginBtn')}
      </button>
      <button
        type="button"
        className={styles.registerLink}
        aria-label={t('loginForm.registerBtnAria')}
      >
        {t('loginForm.registerBtn')}
      </button>
    </form>
  );
};

export default LoginForm;
