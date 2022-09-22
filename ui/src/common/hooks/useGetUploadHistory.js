import { useQuery } from "react-query";

import { getUploadHistory } from "../api/api.js";
import { QUERY_KEYS } from "../constants/queryKeys";

const useFetchUploadHistory = () => {
  const { data, isLoading, error } = useQuery([QUERY_KEYS.UPLOAD_HISTORY], () => getUploadHistory());
  return { data, loading: isLoading, error };
};

export default useFetchUploadHistory;
