import React from 'react';
import styles from './style.module.css';

const App = () => (
  <div>
    <h1 className={styles.h1}>hello {new Date().toDateString()}</h1>
  </div>
);

export default App;
