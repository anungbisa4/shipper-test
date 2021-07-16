import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, Thumbs, HashNavigation } from "swiper/core";

SwiperCore.use([Navigation, Pagination, Scrollbar, Thumbs, HashNavigation]);

const SwiperMain = ({children, ...props}) => {
  return(
    <Swiper {...props}>
      {children}
    </Swiper>
  )
}

export default SwiperMain