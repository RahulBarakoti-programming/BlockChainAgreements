import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Formik } from "formik";
import { loginSchema } from "@/validation/registerSchema.js";
import { loginUser } from "@/handler/authCallHandler.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AuthLogin({ setStat }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-full w-full flex justify-center items-center">
        <Formik
          initialValues={{
            email: "",
            pass: "",
          }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const data = { email: values.email, pass: values.pass };
              const result = await loginUser(data);
              if (result.success) {
                toast("Successfull", {
                  description: `"Login Successfull`,

                  style: {
                    color: "green",
                  },
                });
                navigate("/");
              } else {
                toast("Error", {
                  description: result.message,

                  style: {
                    color: "red",
                  },
                });
                console.error(result.message);
              }
            } catch (error) {
              console.error("Unexpected error:", error);
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4 mt-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="example@gmail.com"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={
                          errors.email && touched.email ? "border-red-600" : ""
                        }
                      />
                      {errors.email && touched.email && (
                        <span className="text-xs text-red-600">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid w-full items-center gap-4 mt-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="pass">Password</Label>
                      <Input
                        id="pass"
                        placeholder="*******"
                        type="password"
                        name="pass"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.pass}
                        className={
                          errors.pass && touched.pass ? "border-red-600" : ""
                        }
                      />
                      {errors.pass && touched.pass && (
                        <span className="text-xs text-red-600">
                          {errors.pass}
                        </span>
                      )}
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStat("signup")}>
                  Signup
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  type="button"
                >
                  Login
                </Button>
              </CardFooter>
            </Card>
          )}
        </Formik>
      </div>
    </>
  );
}

export default AuthLogin;
