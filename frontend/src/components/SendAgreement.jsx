import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import TextEditor from "./TextEditor";
import AgreementInputs from "./AgreementInputs";
import { Formik } from "formik";
import { agreementSchema } from "@/validation/registerSchema";
import { agreementSaver } from "@/handler/agreementServer";
import { Loader } from "./Loader";
import { toast } from "sonner";

function SendAgreement({ loader, setLoader, fetchAgreements }) {
  return (
    <>
      <div className="w-full h-full">
        <Formik
          initialValues={{
            clientEmail: "",
            description: "",
            deadline: null,
            amount: "",
          }}
          validationSchema={agreementSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              setLoader(true);
              const response = await agreementSaver({
                clientEmail: values.clientEmail,
                description: values.description,
                deadline: values.deadline,
                amount: values.amount,
              });

              values.clientEmail = "";
              values.description = "";
              values.deadline = "";
              values.amount = "";
              fetchAgreements();
              setLoader(false);
            } catch (error) {
              console.error(error);
              setLoader(false);
              values.clientEmail = "";
              values.description = "";
              values.deadline = "";
              values.amount = "";
              fetchAgreements();
              toast("Error", {
                description: "something went wrong",

                style: {
                  color: "red",
                },
              });
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
            setFieldValue,
          }) => (
            <ResizablePanelGroup
              direction="horizontal"
              className="min-h-[200px] rounded-lg border md:min-w-[450px]"
            >
              <ResizablePanel defaultSize={25}>
                <div className="flex h-full  p-3">
                  <AgreementInputs
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                  ></AgreementInputs>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={75}>
                <div className="flex h-full  p-3 flex-col">
                  <TextEditor
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  ></TextEditor>
                  {errors.details && touched.details && (
                    <span className="text-xs text-red-600">
                      {errors.details}
                    </span>
                  )}
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
        </Formik>
      </div>
    </>
  );
}

export default SendAgreement;
