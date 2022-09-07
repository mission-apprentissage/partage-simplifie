import * as React from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";

import ProtectedRoute from "./common/auth/ProtectedRoute";
import { ROLES } from "./common/auth/roles.js";
import { NAVIGATION_PAGES } from "./common/constants/navigationPages.js";
import Page404 from "./pages/404/Page404";
import GestionUtilisateursPage from "./pages/admin/gestion-utilisateurs/GestionUtilisateursPage.js";
import EspaceOrganismePage from "./pages/espace-organisme/EspaceOrganismePage.js";
import { HomePage } from "./pages/home/";
import ModifierMotDePassePage from "./pages/modifier-mot-de-passe/ModifierMotDePassePage.js";

const ScrollToTopOnRouteChange = () => {
  const location = useLocation();
  React.useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTopOnRouteChange />
      <Switch>
        {/* Public pages */}
        <Route exact path="/" component={HomePage} />

        {/* Change password */}
        <Route path={NAVIGATION_PAGES.ModifierMotDePasse.path} exact component={ModifierMotDePassePage} />

        {/* Espace Organisme */}
        <Route exact path={NAVIGATION_PAGES.EspaceOrganisme.path} component={EspaceOrganismePage} />

        {/* Admin Pages */}
        <ProtectedRoute
          path={NAVIGATION_PAGES.GestionUtilisateurs.path}
          exact
          component={GestionUtilisateursPage}
          authorizedRole={ROLES.ADMINISTRATOR}
        />

        {/* Not found page */}
        <Route component={Page404} />
      </Switch>
    </Router>
  );
};

export default App;
