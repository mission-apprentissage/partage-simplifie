import PropTypes from "prop-types";
import { Redirect, Route } from "react-router";

import useAuth from "../hooks/useAuth.js";

const ProtectedRoute = ({ authorizedRole, ...routeProps }) => {
  const { isAuthTokenValid, auth } = useAuth();

  if (!isAuthTokenValid) {
    const loginPath = `/login?redirect=${encodeURIComponent(routeProps.location.pathname)}`;
    return <Redirect to={loginPath} />;
  }

  return auth.role === authorizedRole ? <Route {...routeProps} /> : <div>403 not authorized</div>;
};

ProtectedRoute.propTypes = {
  authorizedRole: PropTypes.string.isRequired,
};

export default ProtectedRoute;
