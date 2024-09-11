import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Formik } from "formik";
import { userSchema } from "@/validation/registerSchema";

function AuthSignup({ setStat }) {
  return (
    <>
      <div className="h-full w-full flex justify-center items-center">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            pass: "",
          }}
          validationSchema={userSchema}
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
                <CardTitle className="text-2xl">Create New Account</CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Rahul"
                        type="email"
                        name="firstName"
                        onChange={handleChange}
                        value={values.firstName}
                        className={
                          errors.firstName && errors.firstName
                            ? "border-red-600"
                            : ""
                        }
                      />
                      {errors.firstName && touched.firstName && (
                        <span className="text-xs text-red-600">
                          {errors.firstName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid w-full items-center gap-4 mt-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Barakoti"
                        type="lastName"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        className={
                          errors.lastName && errors.lastName
                            ? "border-red-600"
                            : ""
                        }
                      />
                      {errors.lastName && touched.lastName && (
                        <span className="text-xs text-red-600">
                          {errors.lastName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid w-full items-center gap-4 mt-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Email</Label>
                      <Input
                        id="email"
                        placeholder="example@gmail.com"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                <Button variant="outline" onClick={() => setStat("login")}>
                  Login
                </Button>
                <Button
                  onClick={handleSubmit}
                  type="button"
                  disabled={isSubmitting}
                >
                  Signup
                </Button>
              </CardFooter>
            </Card>
          )}
        </Formik>
      </div>
    </>
  );
}

export default AuthSignup;
