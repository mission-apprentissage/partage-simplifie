import queryString from "query-string";
import { useHistory } from "react-router-dom";

import { postLogin } from "../api/api.js";
import useAuth from "./useAuth";

export default function useLogin() {
  const { setAuthFromToken } = useAuth();
  const history = useHistory();
  const pathToRedirectTo = queryString.parse(history.location.search)?.redirect || "/";

  const login = async (values, { setStatus }) => {
    try {
      const { access_token } = await postLogin(values);
      setAuthFromToken(access_token);
      history.push(pathToRedirectTo);
    } catch (e) {
      setStatus({ error: e.prettyMessage });
    }
  };

  return [login];
}
