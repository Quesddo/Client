import axios from "axios";

export const fetchCanEmbed = async (linkUrl?: string | null) => {
  if (!linkUrl) return null;
  const { data } = await axios.get(`/api/check-iframe?url=${linkUrl}`);
  return data.canEmbed;
};
