import { Redirect, Route } from "react-router-dom";
import withAuth from "../components/hoc/withAuth";
import { LOGIN } from "../constants/routes";

const ProtectedRoute = ({ isAuth, component: Component, path, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) => {
                return isAuth ? <Component {...props} /> : <Redirect to={LOGIN} />
            }}
        />
    );
}

export default withAuth(ProtectedRoute);
