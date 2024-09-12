import React, { useEffect, useState } from "react";
import AuthLogin from "./AuthLogin";
import AuthSignup from "./AuthSignup";
import MetaLogin from "./MetaLogin";
import Dashboard from "./Dashboard";

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
