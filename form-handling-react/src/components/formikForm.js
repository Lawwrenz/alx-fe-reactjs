import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./FormikForm.css";

const FormikForm = () => {
  // Validation schema using Yup with exact string().required pattern
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // Initial form values
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // Handle form submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Form data submitted:", values);

    // Simulate API call
    setTimeout(() => {
      alert("Registration successful!");
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  // Using React.createElement instead of JSX
  return React.createElement(
    Formik,
    {
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: handleSubmit,
    },
    (formikProps) => {
      const { isSubmitting, errors, touched } = formikProps;

      return React.createElement(
        Form,
        { className: "formik-form" },
        // Title
        React.createElement("h2", null, "User Registration (Formik)"),

        // Username Field
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement("label", { htmlFor: "username" }, "Username:"),
          React.createElement(Field, {
            type: "text",
            id: "username",
            name: "username",
            className: errors.username && touched.username ? "error" : "",
            placeholder: "Enter your username",
          }),
          React.createElement(ErrorMessage, {
            name: "username",
            component: "div",
            className: "error-message",
          })
        ),

        // Email Field
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement("label", { htmlFor: "email" }, "Email:"),
          React.createElement(Field, {
            type: "email",
            id: "email",
            name: "email",
            className: errors.email && touched.email ? "error" : "",
            placeholder: "Enter your email",
          }),
          React.createElement(ErrorMessage, {
            name: "email",
            component: "div",
            className: "error-message",
          })
        ),

        // Password Field
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement("label", { htmlFor: "password" }, "Password:"),
          React.createElement(Field, {
            type: "password",
            id: "password",
            name: "password",
            className: errors.password && touched.password ? "error" : "",
            placeholder: "Enter your password",
          }),
          React.createElement(ErrorMessage, {
            name: "password",
            component: "div",
            className: "error-message",
          })
        ),

        // Submit Button
        React.createElement(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "submit-btn",
          },
          isSubmitting ? "Registering..." : "Register"
        )
      );
    }
  );
};

export default FormikForm;
