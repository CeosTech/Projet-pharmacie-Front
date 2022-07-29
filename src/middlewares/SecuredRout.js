import React from "react";
import { Route, Redirect } from "react-router-dom";
const SecuredRoute = ({ component: Component, ...otherProps }) => {
  //decommenter pour remettre le login
  
  // const token = localStorage.getItem('jwtToken');
  const token = true;
  return(
  <Route
    {...otherProps}
    render={props =>
        token ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
  );
}

export default SecuredRoute;