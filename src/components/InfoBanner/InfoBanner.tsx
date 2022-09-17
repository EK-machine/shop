import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { InfoBannerProps } from '../../interfaces/intefaces';

const InfoBanner: React.FC<InfoBannerProps> = ({ errorM, successM }) => {
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setError(errorM);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2500);
  }, [errorM]);

  useEffect(() => {
    setSuccess(successM);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2500);
  }, [successM]);

  return (
    <>
      {success && show && (
        <div className={`${styles.wrapper} ${success ? styles.success : ''}`}>
          {success && <p className={styles.message}>{success}</p>}
        </div>
      )}

      {error && show && (
        <div className={`${styles.wrapper} ${error ? styles.error : ''}`}>
          {error && <p className={styles.message}>{error}</p>}
        </div>
      )}
    </>
  );
};

export default InfoBanner;
