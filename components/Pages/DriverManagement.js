import { useEffect, useState, useRef, Fragment } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { MainLayout } from "@/layouts";
import { Sidebar } from "@/components/Sidebar";
import { OverlaySidebar } from "@/components/Dialog";
import { CardHeader, CardDriver } from "@/components/Card";
import { CardDriverLoader } from "@/components/Loader";
import {
  getUsers,
  getNextPage,
  getPreviousPage,
  setPage,
} from "@/store/users/action";
import { useDispatch, useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar } from "swiper/core";

SwiperCore.use([Navigation, Pagination, Scrollbar]);

const arr = new Array(5).fill("");

function DriverManagement() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);

  useEffect(() => {
    if (!users.pageData) {
      dispatch(getUsers(30));
    }
  }, []);

  const handlePagination = (type) => {
    if (type === "nextPage" && users?.totalPage > users?.page) {
      dispatch(getNextPage(users.data, users?.page, users?.page + 1));
      dispatch(setPage(type));
      return;
    }
    if (users?.page !== 1 && type === "previousPage") {
      dispatch(getPreviousPage(users.data, users?.page, users?.page - 1));
      dispatch(setPage(type));
      return;
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto px-6 py-6 space-y-6 w-screen md:w-[calc(100%-250px)] overflow-scroll pt-28">
        <CardHeader />
        <div className="w-full">
          <Swiper
            className="s"
            spaceBetween={28}
            direction={"vertical"}
            slidesPerView={3}
            height={1200}
            preloadImages
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                direction: "horizontal",
              },
              768: {
                slidesPerView: 2.3,
                direction: "horizontal",
              },
              1024: {
                slidesPerView: 3.5,
                direction: "horizontal",
              },
            }}
          >
            {!users.pageData &&
              arr.map((item, index) => {
                return (
                  <SwiperSlide key={index} className="h-auto relative">
                    <CardDriverLoader />
                  </SwiperSlide>
                );
              })}
            {users?.pageData?.map((item, index) => {
              return (
                <SwiperSlide key={index} className="h-auto">
                  <CardDriver item={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        {!users?.isSearch && (
          <div className="flex justify-center items-center space-x-4">
            <button
              disabled={users.page === 1}
              onClick={() => handlePagination("previousPage")}
              className="disabled:text-gray-500 disabled:font-normal font-semibold outline-none"
            >
              Previous Page
            </button>
            <button
              disabled={users.page === users?.totalPage}
              onClick={() => handlePagination("nextPage")}
              className="disabled:text-gray-500 disabled:font-normal font-semibold outline-none"
            >
              Next Page
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default DriverManagement;
