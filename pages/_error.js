import Error from "next/error";
function ErrorPage({ statusCode }) {
  return (
    <p>
      {statusCode ? (
        <Error statusCode={statusCode} />
      ) : (
        "An error occurred on client"
      )}
    </p>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
