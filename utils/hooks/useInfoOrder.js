import { useState, useEffect } from "react";
import useFetch from "@/utils/hooks/useFetch";
import { userInfo, customerInfo } from "@/store/user/action";
import { getCourierRate } from "@/store/shipping/action";
import { getDetailPackage } from "@/store/product/action";

import { useSelector, useDispatch } from "react-redux";

const useInfoOrder = (courier, packageDetail) => {
  const { product, user, shipping, order } = useSelector((state) => state);
  const dispatch = useDispatch();

  let profile = null;
  if (user?.userChecker?.isLoggedIn) {
    profile = useFetch("/transvisionplus/ctc/allo/member/profile", {
      method: "GET",
      params: { phoneNo: user?.userChecker?.phoneNo },
    });
  }
  useEffect(() => {
    if (profile?.response) {
      dispatch(userInfo(profile.response?.result));
    }
  }, [profile?.response]);
  useEffect(() => {
    if (user?.userInfo?.responseData?.email && !user?.customerInfo) {
      dispatch(customerInfo(user?.userInfo?.responseData?.email));
    }
  }, [user?.userInfo?.responseData?.email]);
  useEffect(() => {
    if (
      shipping?.idMainAddress &&
      user?.userInfo?.responseData?.email &&
      !courier
    ) {
      const email = user?.userInfo?.responseData?.email;
      const weight = order?.detail?.detail_package?.Weight || 1;
      dispatch(getCourierRate(email, shipping?.idMainAddress, "JNE", weight));
    }
  }, [shipping?.idMainAddress && user?.userInfo?.responseData?.email]);

  useEffect(() => {
    if (
      !product?.detail_package &&
      packageDetail &&
      order?.detail_package?.PackageId
    ) {
      dispatch(getDetailPackage(null, order?.detail_package?.PackageId));
    }
  }, [product?.detail_package]);

  return { statusInfo: "OK" };
};

export default useInfoOrder;
