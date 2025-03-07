import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "유효한 URL을 제공해야 합니다." });
  }

  let canEmbed: boolean | null = null;

  try {
    const response = await fetch(url, { method: "GET" });
    const xFrameOptions = response.headers.get("x-frame-options");

    if (xFrameOptions) {
      const option = xFrameOptions.toLowerCase();

      if (option === "deny" || option === "sameorigin") {
        canEmbed = false;
      }
    }

    if (canEmbed === null) {
      const csp = response.headers.get("content-security-policy");

      if (csp && /frame-ancestors\s+('none'|none)/i.test(csp)) {
        canEmbed = false;
      } else {
        canEmbed = true;
      }
    }
  } catch (error) {
    console.error("iframe 임베딩 정책 확인 중 오류:", error);
    canEmbed = null;
  }

  return res.status(200).json({ canEmbed });
}
