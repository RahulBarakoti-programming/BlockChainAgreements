import { date, number, object, string, } from 'yup';

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

export let agreementSchema = object({
  clientEmail: string().email("Enter a valid email").required("Enter Client's Email"),
  amount: number("Enter a valid amount").required("Enter amount here"),
  description: string().required("Enter Agreement Details"),
  deadline: date().required("select DeadLine Date")
})

