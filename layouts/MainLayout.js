import { useState } from "react"
import useSWR, { SWRConfig } from "swr"
import fetcher from "@/utils/fetcher";

const MainLayout = ({children}) => {
  return (
    <>
      <section>{children}</section>
    </>
  );
}

export default MainLayout