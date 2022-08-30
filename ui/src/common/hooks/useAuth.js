import { useAuthState } from "../auth/auth";
import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_USER_NOM_ETABLISSEMENT,
  LOCAL_STORAGE_USER_ROLE,
} from "../constants/localStorageConstants";
import decodeJWT from "../utils/decodeJWT";

export default function useAuth() {
  const [auth, setAuth] = useAuthState();

  const setAuthFromToken = (access_token) => {
    if (!access_token) {
      localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
      setAuth(null);
    } else {
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, access_token);
      const decodedAccessToken = decodeJWT(access_token);
      localStorage.setItem(LOCAL_STORAGE_USER_ROLE, decodedAccessToken.role);
      localStorage.setItem(LOCAL_STORAGE_USER_NOM_ETABLISSEMENT, decodedAccessToken.nom_etablissement);
      setAuth(decodedAccessToken);
    }
  };

  return [auth, setAuthFromToken];
}
