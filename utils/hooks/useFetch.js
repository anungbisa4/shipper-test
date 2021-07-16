import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const API_GATEWAY = process.env.NEXT_PUBLIC_API_GATEWAY;

const Axios = axios.create({
  baseURL: API_GATEWAY,
  timeout: 10000,
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
    // console.log("request: ", config);
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
    console.log(error);
    if (error.response.status === 401 && !config._retry) {
      config._retry = true;
      const refreshToken = await refreshAccessToken();
      Cookies.set("token", refreshToken);

      return Axios(config);
    }

    return Promise.reject(error);
  }
);

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let unmounted = false;
    const source = axios.CancelToken.source();
    const loadData = async () => {
      Axios(url, options, { cancelToken: source.token })
        .then((res) => {
          setIsLoading(false);
          setResponse(res.data);
          setStatus(res?.status);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
          setStatus(err.response?.status);
        });
    };

    if (!unmounted) {
      loadData();
    }

    return () => {
      unmounted = true;
      if (source) {
        source.cancel("cancel token fetch");
      }
    };
  }, []);

  return { response, error, isLoading, status };
};

export default useFetch;
