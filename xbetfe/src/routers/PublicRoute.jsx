import { Redirect, Route } from "react-router-dom";
import withAuth from "../components/hoc/withAuth";
import { HOME } from "../constants/routes";

const PublicRoute = ({ isAuth, component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        return isAuth ? <Redirect to={HOME} /> : <Component {...props} />;
      }}
    />
  );
};

export default withAuth(PublicRoute);
