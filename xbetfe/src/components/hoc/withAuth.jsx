import { useSelector } from "react-redux";

const withAuth = (Component) => {
  return (props) => {
    const isAuth = useSelector(
      (state) => !!state.auth.id && !!state.auth.username
    );

    return <Component {...props} isAuth={isAuth} />;
  };
};

export default withAuth;
