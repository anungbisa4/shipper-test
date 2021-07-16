import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const Home = (props) => {
  return (
    <>
      <section>
        <h1>Pensilpatah next boilerplate</h1>
        <h2>Env : {process.env.baseUrl}</h2>
      </section>
    </>
  );
};


export default Home;
