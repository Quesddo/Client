import Head from "next/head";

interface QuesddoHeadProps {
  title?: string;
}

/**
 * 페이지 타이틀 지정하는 컴포넌트
 */
const TITLE_PREFIX = "퀘스또";

export default function QuesddoHead({ title }: QuesddoHeadProps) {
  const formattedTitle = title ? `${TITLE_PREFIX} | ${title}` : TITLE_PREFIX;

  return (
    <Head>
      <title>{formattedTitle}</title>
    </Head>
  );
}
