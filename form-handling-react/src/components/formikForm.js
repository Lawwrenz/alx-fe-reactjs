import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormikForm = () => {
  // Initial form values
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Handle form submission
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      console.log("Form submitted with Formik:", values);
      alert("Registration successful with Formik!");
      resetForm();
      setSubmitting(false);
    }, 500);
  };

  return React.createElement(
    Formik,
    {
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: onSubmit,
    },
    function ({ isSubmitting, errors, touched }) {
      // Create class names with proper spacing
      const usernameFieldClass = `relative block w-full px-3 py-2 border ${
        errors.username && touched.username
          ? "border-red-300"
          : "border-gray-300"
      } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`;

      const emailFieldClass = `relative block w-full px-3 py-2 border ${
        errors.email && touched.email ? "border-red-300" : "border-gray-300"
      } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`;

      const passwordFieldClass = `relative block w-full px-3 py-2 border ${
        errors.password && touched.password
          ? "border-red-300"
          : "border-gray-300"
      } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`;

      return React.createElement(
        "div",
        {
          className:
            "min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8",
        },
        React.createElement(
          "div",
          { className: "max-w-md w-full space-y-8" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "h2",
              {
                className:
                  "mt-6 text-center text-3xl font-extrabold text-gray-900",
              },
              "User Registration"
            ),
            React.createElement(
              "p",
              { className: "mt-2 text-center text-sm text-gray-600" },
              "Using Formik with Yup Validation"
            )
          ),
          React.createElement(
            Form,
            { className: "mt-8 space-y-6" },
            React.createElement(
              "div",
              { className: "rounded-md shadow-sm -space-y-px" },
              // Username Field
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "username", className: "sr-only" },
                  "Username"
                ),
                React.createElement(Field, {
                  id: "username",
                  name: "username",
                  type: "text",
                  className: usernameFieldClass,
                  placeholder: "Username",
                }),
                React.createElement(ErrorMessage, {
                  name: "username",
                  component: "div",
                  className: "mt-1 text-sm text-red-600",
                })
              ),

              // Email Field
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "email", className: "sr-only" },
                  "Email address"
                ),
                React.createElement(Field, {
                  id: "email",
                  name: "email",
                  type: "email",
                  className: emailFieldClass,
                  placeholder: "Email address",
                }),
                React.createElement(ErrorMessage, {
                  name: "email",
                  component: "div",
                  className: "mt-1 text-sm text-red-600",
                })
              ),

              // Password Field
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "password", className: "sr-only" },
                  "Password"
                ),
                React.createElement(Field, {
                  id: "password",
                  name: "password",
                  type: "password",
                  className: passwordFieldClass,
                  placeholder: "Password",
                }),
                React.createElement(ErrorMessage, {
                  name: "password",
                  component: "div",
                  className: "mt-1 text-sm text-red-600",
                })
              )
            ),

            React.createElement(
              "div",
              null,
              React.createElement(
                "button",
                {
                  type: "submit",
                  disabled: isSubmitting,
                  className:
                    "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
                },
                isSubmitting ? "Registering..." : "Register"
              )
            )
          )
        )
      );
    }
  );
};

export default FormikForm;
