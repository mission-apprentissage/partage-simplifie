import * as React from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";

import Page404 from "./pages/404/Page404";
import { HomePage } from "./pages/home/";

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

        {/* Not found page */}
        <Route component={Page404} />
      </Switch>
    </Router>
  );
};

export default App;
