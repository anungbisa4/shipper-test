import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const API_GATEWAY = process.env.NEXT_PUBLIC_API_GATEWAY;

export const Axios = axios.create({
  baseURL: API_GATEWAY,
  timeout: 5000,
});

const body = {
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  grant_type: process.env.NEXT_PUBLIC_GRANT_TYPE,
  provision_key: process.env.NEXT_PUBLIC_PROVISION_KEY,
  authenticated_userid: process.env.NEXT_PUBLIC_AUTHENTICATED_USERID,
};

// auth token
const refreshAccessToken = () => {
  return Axios.post("/transvisionplus/oauth2/token", body)
    .then(function (response) {
      return response.data.access_token;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// request interceptor to add token to request headers
Axios.interceptors.request.use(
  async (config) => {
    const token = await Cookies.get("token");
    // console.log("request server/client: ", config);
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
  null,
  { synchronous: true }
);
// response interceptor intercepting 401 responses, refreshing token and retrying the request
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    // console.log(error);
    if (error.response.status === 401 && !config._retry) {
      config._retry = true;
      const refreshToken = await refreshAccessToken();
      Axios.defaults.headers.common.authorization = `Bearer ${refreshToken}`;
      Cookies.set("token", refreshToken);

      return Axios(config);
    }

    return Promise.reject(error);
  }
);



export const apiGet = (url, params = {}) =>
  new Promise(async (resolve, reject) => {
    await Axios.get(url, { params })
      .then((res) => {
        resolve({ data: res.data, status: res?.status });
      })
      .catch((err) => {
        reject({ err });
      });
  });
export const apiPost = (url, data) =>
  new Promise(async (resolve, reject) => {
    await Axios.post(url, { ...data })
      .then((res) => {
        resolve({ data: res.data, status: res?.status });
      })
      .catch((err) => {
        reject({ err, status: err?.status });
      });
  });

  export const fetcher = async (...args) => {
    try{
      const fetcher = await Axios(...args);
      return fetcher.data
    } catch (error) {
      throw error
    }
  }
