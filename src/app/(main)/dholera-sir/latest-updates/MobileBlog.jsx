'use client';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import BlogCard from './BlogCard';

export default function MobileBlogSwiper({ posts }) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {posts.map((post) => (
        <SwiperSlide key={post._id}>
          <BlogCard post={post} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}