import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { faker } from '@faker-js/faker';
import Layout from 'Components/Layout/Layout';
import Reviw from 'Components/Reviw/Reviw';
import { setHeading } from 'ReduxSlices/headingSlice';

const ReviewsPage: React.FC = () => {
  const [users, setUsers] = useState<{ id: number; name: string; bio: string; img: string }[]>([]);

  const dispatch = useDispatch();

  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    }),
  );

  const updateRowHeight = () => {
    cache.current.clearAll();
  };

  useEffect(() => {
    window.addEventListener('resize', () => updateRowHeight());
    return () => window.removeEventListener('resize', updateRowHeight);
  }, []);

  useEffect(() => {
    dispatch(setHeading(`Our happy ${users.length} customers`));
  }, [users]);

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
    <Layout>
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
    </Layout>
  );
};

export default ReviewsPage;
