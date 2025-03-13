import axios from "axios";

import apiRoutes from "@/router/apiRoutes";
import { tokenUtils } from "@/utils/tokenUtils/tokenUtils";

export default async function refreshTokens() {
  try {
    const refreshToken = tokenUtils.getRefreshToken();

    if (!refreshToken) throw new Error("No refresh token");

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BACKEND_URL}${apiRoutes.auth.tokens()}`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );
    tokenUtils.setToken(data.accessToken, data.refreshToken);
    return data.accessToken;
  } catch {
    tokenUtils.clearToken();
  }
}
