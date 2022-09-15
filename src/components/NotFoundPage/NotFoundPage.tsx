import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const NotFoundPage: React.FC = () => (
  <div className={styles.notfound}>
    <h1 className={styles.heading}>Page not found</h1>
    <p>
      Sorry{' '}
      <span role="img" aria-label="Pensive emoji">
        😔
      </span>{' '}
      we couldn’t find what you were looking for.
      <br />
    </p>
    <Link className={styles.link} to="/">
      Go to products page
    </Link>
  </div>
);

export default NotFoundPage;
