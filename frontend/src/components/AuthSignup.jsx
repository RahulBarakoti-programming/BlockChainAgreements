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
import { userSchema } from "@/validation/registerSchema.js";
import { signupUser } from "@/handler/authCallHandler";
import { useNavigate } from "react-router-dom";

function AuthSignup({ setStat }) {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          pass: "",
        }}
        validationSchema={userSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const response = await signupUser({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              pass: values.pass,
              walletAddress: "",
            });

            console.log("Signup successful:", response);

            navigate("/");
          } catch (error) {
            console.error("Signup error:", error);

            // Handle error (e.g., set form errors)
            setErrors({
              serverError:
                error.response?.data?.message ||
                "Signup failed, please try again.",
            });
          } finally {
            setSubmitting(false);
          }
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
              <CardTitle className="text-2xl">Create New Account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Rahul"
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      className={
                        errors.firstName && touched.firstName
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
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      className={
                        errors.lastName && touched.lastName
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

                {errors.serverError && (
                  <div className="text-xs text-red-600 mt-2">
                    {errors.serverError}
                  </div>
                )}

                <CardFooter className="flex justify-between mt-4">
                  <Button variant="outline" onClick={() => setStat("login")}>
                    Login
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    Signup
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        )}
      </Formik>
    </div>
  );
}

export default AuthSignup;
