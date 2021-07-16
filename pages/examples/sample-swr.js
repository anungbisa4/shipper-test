import { useEffect, useState } from "react";
import { MainLayout } from "@/layouts";

import Head from "next/head";
import dynamic from "next/dynamic";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const args = {
  method: "GET",
  params: { postId: 1 },
};
const args2 = {
  method: "GET",
  params: { postId: 1 },
};

const SampleSWR = ({ dataFromServer }) => {
  const todos = useSWR("/todos/1", fetcher, { initialData: dataFromServer });
  const { data: comments } = useSWR("/posts/1/comments");

  // don't set arguments in inline object -> BAD
  // const { data: detailPost2 } = useSWR(["/comments", {
  //   method: "GET",
  //   params: { postId: 1 },
  // }]);

  // -> GOOD
  const { data: detailPost1 } = useSWR("/comments", (url) =>
    fetcher(url, args)
  );
  const { data: detailPost2 } = useSWR(["/comments", args2]);
  console.log(dataFromServer);

  return (
    <>
      <MainLayout>
        <div className="space-y-4">
          <div>{JSON.stringify(todos.data)}</div>
          <div>{JSON.stringify(comments)}</div>
          <div>{JSON.stringify(detailPost1)}</div>
          <div>{JSON.stringify(detailPost2)}</div>
          <div>
            Status  : {JSON.stringify(todos.error?.response?.status || 200)}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default SampleSWR;

export const getServerSideProps = async (context) => {
  let response = null;
  try {
    response = await fetcher("/todos/1");
  } catch (err) {
    response = null
  }
  return {
    props: {
      dataFromServer: response,
    },
  };
};
