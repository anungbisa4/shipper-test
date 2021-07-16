import Document, { Html, Head, Main, NextScript } from "next/document";

// Document is only rendered in the server,
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    // console.log(initialProps)
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
        </Head>
        <body className="bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
