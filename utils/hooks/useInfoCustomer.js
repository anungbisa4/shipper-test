import { useState, useEffect } from "react";
import useFetch from "@/utils/hooks/useFetch";
import { userInfo, customerInfo } from "@/store/user/action";

import { useSelector, useDispatch } from "react-redux";

const useInfoCustomer = () => {
  const { user } = useSelector((state) => state);
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
      dispatch(userInfo(profile?.response?.result));
    }
  }, [profile?.response]);
  useEffect(() => {
    if (user?.userInfo?.responseData?.email) {
      dispatch(customerInfo(user?.userInfo?.responseData?.email));
    }
  }, [user?.userInfo?.responseData?.email]);


  return { statusInfo: "OK" };
};

export default useInfoCustomer;
