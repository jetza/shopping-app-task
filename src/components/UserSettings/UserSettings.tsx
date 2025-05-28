import styles from './UserSettings.module.scss';
import { useState, useEffect } from 'react';
import { AVATAR_URL } from '@/constants/urls';
import { useTranslation } from 'react-i18next';
import { mockUser } from './mockUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { z } from 'zod';
import Toast from '@/components/Toast/Toast';

const UserSettings = () => {
  const { t } = useTranslation();

  const passwordSchema = z.object({
    password: z.string().min(6, { message: t('userSettings.passwordMin') }),
    confirm: z.string(),
  });

  const cardSchema = z.object({
    number: z.string().min(12, { message: t('userSettings.cardNumberInvalid') }),
    expiry: z.string().min(4, { message: t('userSettings.cardExpiryInvalid') }),
    name: z.string().min(2, { message: t('userSettings.cardNameInvalid') }),
  });

  const [state, setState] = useState({
    avatar: undefined as string | undefined,
    cards: mockUser.cards,
    newCard: { number: '', expiry: '', name: '' },
    password: '',
    confirm: '',
    securityCodeSent: false,
    securityCode: '',
    enteredCode: '',
    passwordError: '',
    cardError: '',
  });
  const [showInfoToast, setShowInfoToast] = useState(false);

  useEffect(() => {
    setTimeout(() => setState((s) => ({ ...s, avatar: AVATAR_URL })), 300);
  }, []);

  useEffect(() => {
    if (showInfoToast) {
      const timeout = setTimeout(() => setShowInfoToast(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [showInfoToast]);

  const handleSendCode = (e: React.MouseEvent) => {
    e.preventDefault();
    setState((s) => ({ ...s, securityCode: '123456', securityCodeSent: true, passwordError: '' }));
    setShowInfoToast(true);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.securityCodeSent) {
      setState((s) => ({ ...s, passwordError: t('userSettings.clickSendCode') }));
      return;
    }
    const result = passwordSchema.safeParse({ password: state.password, confirm: state.confirm });
    if (!result.success) {
      setState((s) => ({ ...s, passwordError: result.error.errors[0].message }));
      return;
    }
    if (state.password !== state.confirm) {
      setState((s) => ({ ...s, passwordError: t('userSettings.passwordsDontMatch') }));
      return;
    }
    if (state.enteredCode !== state.securityCode) {
      setState((s) => ({ ...s, passwordError: t('userSettings.wrongCode') }));
      return;
    }
    setState((s) => ({
      ...s,
      password: '',
      confirm: '',
      enteredCode: '',
      passwordError: '',
    }));
    alert(t('userSettings.success'));
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    const result = cardSchema.safeParse(state.newCard);
    if (!result.success) {
      setState((s) => ({ ...s, cardError: result.error.errors[0].message }));
      return;
    }
    setState((s) => ({
      ...s,
      cards: [...s.cards, s.newCard],
      newCard: { number: '', expiry: '', name: '' },
      cardError: '',
    }));
  };

  return (
    <div className={styles.settingsWrapper}>
      {showInfoToast && <Toast message={t('toast.sendCode')} info />}
      <div className={styles.profileSection}>
        <img src={state.avatar || '/assets/react.svg'} alt="Avatar" className={styles.avatar} />
        <div className={styles.infoBlock}>
          <div className={styles.name}>
            {mockUser.firstName} {mockUser.lastName}
          </div>
          <div className={styles.value}>{mockUser.email}</div>
        </div>
      </div>
      <form className={styles.form} onSubmit={handlePasswordChange}>
        <h3>{t('userSettings.changePassword')}</h3>
        <button
          className={`${styles.saveBtn} ${styles.marginBottom}`}
          onClick={handleSendCode}
          disabled={state.securityCodeSent}
          type="button"
        >
          {state.securityCodeSent ? t('userSettings.codeSent') : t('userSettings.sendCode')}
        </button>
        {state.passwordError && <div className={styles.errorMsg}>{state.passwordError}</div>}
        {state.securityCodeSent && (
          <input
            type="text"
            placeholder={t('userSettings.enterCode')}
            value={state.enteredCode}
            onChange={(e) => setState((s) => ({ ...s, enteredCode: e.target.value }))}
            className={`${styles.input} ${styles.inputMarginBottom}`}
          />
        )}
        <input
          type="password"
          placeholder={t('userSettings.newPassword')}
          value={state.password}
          onChange={(e) => setState((s) => ({ ...s, password: e.target.value, passwordError: '' }))}
          className={styles.input}
        />
        <input
          type="password"
          placeholder={t('userSettings.confirmPassword')}
          value={state.confirm}
          onChange={(e) => setState((s) => ({ ...s, confirm: e.target.value, passwordError: '' }))}
          className={styles.input}
        />
        <button className={styles.saveBtn} type="submit">
          {t('userSettings.savePassword')}
        </button>
      </form>
      <div className={styles.cardsSection}>
        <h3>{t('userSettings.cards')}</h3>
        <ul className={styles.cardsList}>
          {state.cards.map((card, i) => (
            <li key={i} className={styles.cardItem}>
              <FontAwesomeIcon icon={faCcVisa} style={{ color: '#1a1f71', marginRight: 8 }} />
              <span>{card.number}</span> <span>{card.expiry}</span> <span>{card.name}</span>
            </li>
          ))}
        </ul>
        <form className={styles.addCardForm} onSubmit={handleAddCard}>
          {state.cardError && <div className={styles.errorMsg}>{state.cardError}</div>}
          <input
            type="text"
            placeholder={t('userSettings.cardNumber')}
            value={state.newCard.number}
            onChange={(e) =>
              setState((s) => ({ ...s, newCard: { ...s.newCard, number: e.target.value } }))
            }
            className={styles.input}
          />
          <input
            type="text"
            placeholder={t('userSettings.cardExpiry')}
            value={state.newCard.expiry}
            onChange={(e) =>
              setState((s) => ({ ...s, newCard: { ...s.newCard, expiry: e.target.value } }))
            }
            className={styles.input}
          />
          <input
            type="text"
            placeholder={t('userSettings.cardName')}
            value={state.newCard.name}
            onChange={(e) =>
              setState((s) => ({ ...s, newCard: { ...s.newCard, name: e.target.value } }))
            }
            className={styles.input}
          />
          <button className={styles.addCardBtn} type="submit">
            {t('userSettings.addCardBtn')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSettings;
