import Head from "next/head";
import { useRouter } from "next/router";

interface QuesddoHeadProps {
  title?: string;
  description?: string;
  openGraphUrl?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const TITLE_PREFIX = "퀘스또";
const META_DESCRIPTION =
  "다양한 콘텐츠를 할 일 목록으로 관리하고 학습 진도와 프로젝트 진행을 돕는 서비스";
const OPEN_GRAPH_IMAGE_URL = `${SITE_URL}/images/thumb.png`;

const isValidUrl = (url: string) => {
  const regex = /^\/\w./;

  return regex.test(url);
};

/**
 * 페이지 타이틀 지정하는 컴포넌트
 */
export default function QuesddoHead({
  title,
  description = META_DESCRIPTION,
  openGraphUrl,
}: QuesddoHeadProps) {
  const router = useRouter();

  if (openGraphUrl && !isValidUrl(openGraphUrl)) {
    throw new Error("openGraphUrl의 값은 /로 시작해야합니다.");
  }

  const formattedTitle = title ? `${TITLE_PREFIX} | ${title}` : TITLE_PREFIX;
  const formattedOpenGraphUrl = openGraphUrl
    ? `${SITE_URL}${openGraphUrl}`
    : `${SITE_URL}${router.asPath}`;

  return (
    <Head>
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:site_name" content={TITLE_PREFIX} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OPEN_GRAPH_IMAGE_URL} />
      <meta property="og:url" content={formattedOpenGraphUrl} />
      <meta property="twitter:title" content={formattedTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={OPEN_GRAPH_IMAGE_URL} />
      <meta property="twitter:card" content="summary" />
    </Head>
  );
}
