import { object, string, } from 'yup';

export let userSchema = object({
  firstName: string().required("Enter Your First Name"),
  lastName: string().required("Enter Your Last Name"),
  email: string().email("Enter a valid email").required("Enter Your Email"),
  pass: string().required("Create a Password"),

});
export let loginSchema = object({
  email: string().email("Enter a valid email").required("Enter Your Email"),
  pass: string().required("Create a Password"),

});

