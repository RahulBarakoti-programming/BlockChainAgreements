import React, { useEffect, useState } from "react";
import AuthLogin from "./AuthLogin.jsx";
import AuthSignup from "./AuthSignup.jsx";
import MetaLogin from "./MetaLogin.jsx";
import Dashboard from "./Dashboard.jsx";

const Login = () => {
  const [stat, setStat] = useState("meta");

  return (
    <>
      {stat == "test" && <Dashboard setStat={setStat}></Dashboard>}
      {stat == "signup" && <AuthSignup setStat={setStat}></AuthSignup>}
      {stat == "login" && <AuthLogin setStat={setStat}></AuthLogin>}
      {stat == "meta" && <MetaLogin setStat={setStat}></MetaLogin>}
    </>
  );
};

export default Login;
