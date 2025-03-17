import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>퀘스또</title>
      </Head>
      <body className="overflow-hidden antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
