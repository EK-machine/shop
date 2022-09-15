import React, { useEffect, useState, useRef } from 'react';

const MoreReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [prevY, setPrevY] = useState(0);

  const loadingRef = useRef(null);
  const prevYRef = useRef({});
  const reviewsRef = useRef({});
  const pageRef = useRef({});

  prevYRef.current = prevY;
  reviewsRef.current = reviews;
  pageRef.current = page;

  const getReviews = async () => {
    try {
      setLoading(true);
      const reviewsReceived = await fetch(`http://jsonplaceholder.typicode.com/comments?_page=${pageRef.current}`)
        .then((data) => data.json())
        .then((pics) => pics);
      if (reviewsReceived) {
        setReviews([...reviewsRef.current, ...reviewsReceived]);
        setLoading(false);
      }
    } catch (e) {
      console.log('error getting reviews', e);
      setLoading(false);
    }
  };

  const handleObserver = (entities, observer) => {
    const { y } = entities[0].boundingClientRect;
    if (prevYRef.current > y) {
      getReviews();
      setPage(pageRef.current + 1);
    }
    setPrevY(y);
  };

  useEffect(() => {
    getReviews();
    setPage(pageRef.current + 1);

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    observer.observe(loadingRef.current);
  }, []);

  return (
    <div>
      <div>
        {reviews.map((item) => (
          <p style={{ height: '100px', width: '100%', margin: '10px' }} key={item.id}>
            {item.body}
          </p>
        ))}
      </div>
      <div style={{ height: '100px', margin: '10px' }} className="hi" ref={loadingRef}>
        <span style={{ display: loading ? 'block' : 'none', color: 'red' }}>loading...</span>
      </div>
    </div>
  );
};

export default MoreReviewsPage;
