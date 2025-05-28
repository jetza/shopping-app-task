import styles from './Brends.module.scss';
import { brandsSr, brandsEn } from './brandsMock';
import { useTranslation } from 'react-i18next';

const Brends = () => {
  const { i18n } = useTranslation();
  const brands = i18n.language === 'en' ? brandsEn : brandsSr;
  return (
    <div className={styles.newsContainer}>
      <h1 className={styles.newsTitle}>Brendovi u našem shopu</h1>
      <div className={styles.brandList}>
        {brands.map((brand) => (
          <div key={brand.name} className={styles.brandCard}>
            <h2 className={styles.brandName}>{brand.name}</h2>
            <p className={styles.brandDescription}>{brand.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brends;
