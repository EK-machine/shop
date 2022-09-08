import React, { useEffect, useState, useRef } from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { faker } from '@faker-js/faker';
import Reviw from '../Reviw/Reviw';
import styles from './style.module.css';

const ReviewsPage = () => {
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    }),
  );
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(
      [...Array(10000).keys()].map((key) => ({
        id: key,
        name: `${faker.name.fullName()}`,
        bio: `${faker.lorem.lines(Math.random() * 10)}`,
        img: `${faker.internet.avatar()}`,
      })),
    );
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.headingWrapper}>
        <h1 className={styles.heading}>{`Our happy ${users.length} customers`}</h1>
      </div>
      <div className={styles.reviewsBlock}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={cache.current.rowHeight}
              deferredMeasuremenCache={cache.current}
              rowCount={users.length}
              // eslint-disable-next-line react/no-unstable-nested-components
              rowRenderer={({ key, index, style, parent }) => (
                <CellMeasurer key={key} cache={cache.current} parent={parent} columnIndex={0} rowIndex={index}>
                  <div style={{ ...style, paddingTop: '10px' }}>
                    <Reviw img={users[index].img} name={users[index].name} reply={users[index].bio} />
                  </div>
                </CellMeasurer>
              )}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default ReviewsPage;
