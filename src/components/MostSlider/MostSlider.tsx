import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation, Pagination } from 'swiper';
import MostSlide from 'Components/MostSlide/MostSlide';
import { MostSliderProps } from 'Interfaces/intefaces';
import { arrow } from 'Data/data';
import styles from './style.module.css';
import 'swiper/css';
import 'swiper/css/navigation';

const MostSliderUnmemoized: React.FC<MostSliderProps> = ({ products, getSelected, openModal }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Check our most rated products</h1>

      <Swiper
        modules={[Navigation, Mousewheel, Pagination]}
        className={styles.slider}
        spaceBetween={24}
        loop
        navigation={{
          prevEl: prevRef?.current,
          nextEl: nextRef?.current,
        }}
        mousewheel
        scrollbar={{ hide: true }}
        breakpoints={{
          0: {
            spaceBetween: 20,
            centeredSlides: false,
            slidesPerView: 1.1,
          },
          600: {
            slidesPerView: 1.3,
          },
          700: {
            slidesPerView: 1.4,
          },
          769: {
            slidesPerView: 1,
          },
          830: {
            slidesPerView: 1.2,
          },
          880: {
            slidesPerView: 1.1,
          },
          940: {
            slidesPerView: 1.4,
          },
          1100: {
            slidesPerView: 1.5,
          },
          1238: {
            slidesPerView: 1.8,
          },
        }}
      >
        {products.map((item) => (
          <SwiperSlide key={item.title} className={styles.slide}>
            <MostSlide
              addAction={getSelected}
              onClick={openModal}
              title={item.title}
              image={item.image}
              rating={item.rating}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.btnsContainer}>
        <div className={styles.swiperButtonPrev} ref={prevRef}>
          <img className={styles.arrowIcon} src={arrow} alt="prev" />
        </div>
        <div className={styles.swiperButtonNext} ref={nextRef}>
          <img src={arrow} alt="next" />
        </div>
      </div>
    </div>
  );
};

const areEqual = (prevProps: MostSliderProps, nextProps: MostSliderProps) => {
  const prevProds = prevProps.products.map((item) => item.title).join();
  const nextProds = nextProps.products.map((item) => item.title).join();
  if (prevProds === nextProds) {
    return true;
  }
  return false;
};

const MostSlider = React.memo(MostSliderUnmemoized, areEqual);

export default MostSlider;
