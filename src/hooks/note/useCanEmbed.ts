import axios from "axios";
import { useEffect, useState } from "react";

/**
 * 임베드 가능 여부 체크하는 훅
 */
export const useCanEmbed = (linkUrl?: string | null) => {
  const [canEmbed, setCanEmbed] = useState<boolean | null>(null);

  const getCanEmbed = async (link: string) => {
    const { data } = await axios.get(`/api/check-iframe?url=${link}`);
    return data.canEmbed;
  };

  // 임베드 가능하면 canEmbed = true
  useEffect(() => {
    if (!linkUrl) {
      return;
    }

    getCanEmbed(linkUrl).then((res) => setCanEmbed(res));
  }, [linkUrl]);

  return { canEmbed };
};
