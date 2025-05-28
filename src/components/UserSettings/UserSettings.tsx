import styles from './UserSettings.module.scss';
import { useState, useEffect } from 'react';
import { AVATAR_URL } from '@/constants/urls';
import { useTranslation } from 'react-i18next';
import { mockUser } from './mockUser';

export default function UserSettings() {
  const { t } = useTranslation();
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [cards, setCards] = useState(mockUser.cards);
  const [newCard, setNewCard] = useState({ number: '', expiry: '', name: '' });
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [securityCodeSent, setSecurityCodeSent] = useState(false);
  const [securityCode, setSecurityCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [codeError, setCodeError] = useState('');

  useEffect(() => {
    setTimeout(() => setAvatar(AVATAR_URL), 300);
  }, []);

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCard.number && newCard.expiry && newCard.name) {
      setCards([...cards, newCard]);
      setNewCard({ number: '', expiry: '', name: '' });
    }
  };

  const handleSendCode = (e: React.MouseEvent) => {
    e.preventDefault();
    setSecurityCode('123456');
    setSecurityCodeSent(true);
    setCodeError('');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!securityCodeSent) return;
    if (enteredCode !== securityCode) {
      setCodeError(t('userSettings.wrongCode'));
      return;
    }
    setPassword('');
    setConfirm('');
    setEnteredCode('');
    setCodeError('');
    alert(t('userSettings.success'));
  };

  return (
    <div className={styles.settingsWrapper}>
      <div className={styles.profileSection}>
        <img src={avatar || '/assets/react.svg'} alt="Avatar" className={styles.avatar} />
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
          className={styles.saveBtn}
          style={{ marginBottom: 8 }}
          onClick={handleSendCode}
          disabled={securityCodeSent}
          type="button"
        >
          {securityCodeSent ? t('userSettings.codeSent') : t('userSettings.sendCode')}
        </button>
        {securityCodeSent && (
          <input
            type="text"
            placeholder={t('userSettings.enterCode')}
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            className={styles.input}
            style={{ marginBottom: 4 }}
          />
        )}
        {codeError && (
          <div style={{ color: 'red', fontSize: '0.98rem', marginBottom: 4 }}>
            {t('userSettings.wrongCode')}
          </div>
        )}
        <input
          type="password"
          placeholder={t('userSettings.newPassword')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder={t('userSettings.confirmPassword')}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className={styles.input}
        />
        <button className={styles.saveBtn} type="submit" disabled={!securityCodeSent}>
          {t('userSettings.savePassword')}
        </button>
      </form>
      <div className={styles.cardsSection}>
        <h3>{t('userSettings.cards')}</h3>
        <ul className={styles.cardsList}>
          {cards.map((card, i) => (
            <li key={i} className={styles.cardItem}>
              <span>{card.number}</span> <span>{card.expiry}</span> <span>{card.name}</span>
            </li>
          ))}
        </ul>
        <form className={styles.addCardForm} onSubmit={handleAddCard}>
          <input
            type="text"
            placeholder={t('userSettings.cardNumber')}
            value={newCard.number}
            onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
            className={styles.input}
          />
          <input
            type="text"
            placeholder={t('userSettings.cardExpiry')}
            value={newCard.expiry}
            onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
            className={styles.input}
          />
          <input
            type="text"
            placeholder={t('userSettings.cardName')}
            value={newCard.name}
            onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
            className={styles.input}
          />
          <button className={styles.addCardBtn} type="submit">
            {t('userSettings.addCardBtn')}
          </button>
        </form>
      </div>
    </div>
  );
}
