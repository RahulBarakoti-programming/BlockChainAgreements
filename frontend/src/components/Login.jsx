import React, { useEffect, useState } from "react";
import AuthLogin from "./AuthLogin";
import AuthSignup from "./AuthSignup";
import MetaLogin from "./MetaLogin";

const Login = () => {
  const [stat, setStat] = useState("meta");

  return (
    <>
      {stat == "signup" && <AuthSignup setStat={setStat}></AuthSignup>}
      {stat == "login" && <AuthLogin setStat={setStat}></AuthLogin>}
      {stat == "meta" && <MetaLogin setStat={setStat}></MetaLogin>}
    </>
  );
};

export default Login;
