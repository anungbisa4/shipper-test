import { useEffect } from "react";
import App from "next/app";
import Head from "next/head";
import NProgress from "nprogress";
import { AnimatePresence } from "framer-motion";
import { Provider, useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Router from "next/router";
import "@/styles/globals.css";
import "swiper/swiper-bundle.min.css";
import "react-toastify/dist/ReactToastify.min.css";

import useSWR, { SWRConfig } from "swr";
import fetcher from "@/utils/fetcher";

import { wrapper, initStore } from "@/store/store";

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

function MyApp({ Component, pageProps, router }) {
  const store = useStore((state) => state);

  Router.events.on("routeChangeStart", (url) => {
    console.log(`Loading: ${url}`);
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Pensilpatah next boilerplate</title>

        {/* favicon */}

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {/* end favicon */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Provider store={store}>
        <AnimatePresence
          exitBeforeEnter
          onExitComplete={handleExitComplete}
          initial={false}
        >
          <PersistGate loading={<Loading />} persistor={store.__persistor}>
            <SWRConfig
              value={{
                fetcher: (...args) => fetcher(...args).then((res) => res),
                onError: (err) => {
                  console.error("err swr: ", err);
                },
              }}
            >
              <Component {...pageProps} {...{ router }} key={router.route} />
            </SWRConfig>
            {/* <Component {...pageProps} {...{ router }} key={router.route} /> */}
          </PersistGate>
        </AnimatePresence>
      </Provider>
    </>
  );
}

App.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export function reportWebVitals(metric) {
  switch (metric.name) {
    case "FCP":
      // handle FCP results
      console.log("First Contentful Paint (FCP) : ", metric.value);
      break;
    case "LCP":
      // handle LCP results
      console.log("Largest Contentful Paint (LCP) : ", metric.value);
      break;
    case "CLS":
      // handle CLS results
      console.log("Cumulative Layout Shift (CLS) : ", metric.value);
      break;
    case "FID":
      // handle FID results
      console.log("First Input Delay (FID) : ", metric.value);
      break;
    case "TTFB":
      // handle TTFB results
      console.log("Time to First Byte (TTFB) : ", metric.value);
      break;
    case "Next.js-hydration":
      console.log("Next.js-hydration : ", metric);
      break;
    case "Next.js-route-change-to-render":
      console.log("Next.js-route-change-to-render: ", metric);
      break;
    case "Next.js-render":
      console.log("Next.js-render : ", metric);
      break;
    default:
      break;
  }
}

export default wrapper.withRedux(MyApp);

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <p></p>
    </div>
  );
};
