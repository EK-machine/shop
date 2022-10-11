import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation } from 'swiper';
import styles from './style.module.css';
import MostSlide from '../MostSlide/MostSlide';
import { MostSliderProps } from '../../interfaces/intefaces';
import 'swiper/css';
import 'swiper/css/navigation';

const MostSliderUnmemoized: React.FC<MostSliderProps> = ({ products, getSelected, openModal }) => (
  <div className={styles.container}>
    <h1 className={styles.heading}>Check our most rated products</h1>
    <Swiper
      modules={[Navigation, Mousewheel]}
      spaceBetween={24}
      slidesPerView={2}
      loop
      centeredSlides
      navigation
      mousewheel
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
  </div>
);

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
