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

function AuthLogin({ setStat }) {
  return (
    <>
      <div className="h-full w-full flex justify-center items-center">
        <Formik
          initialValues={{
            email: "",
            pass: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              setSubmitting(false);
            }, 5000);
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
            /* and other goodies */
          }) => (
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4 mt-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Email</Label>
                      <Input
                        id="email"
                        placeholder="example@gmail.com"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        className={
                          errors.email && errors.email ? "border-red-600" : ""
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
                      <Label htmlFor="name">Password</Label>
                      <Input
                        id="pass"
                        placeholder="*******"
                        type="pass"
                        name="pass"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.pass}
                        className={
                          errors.pass && errors.pass ? "border-red-600" : ""
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
