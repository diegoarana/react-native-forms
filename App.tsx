import React from "react";
import BackgroundImage from "./src/components/BackgroundImage/BackgroundImage.component";
import LoginForm from "./src/forms/LoginForm/LoginForm";
import FormikForm from "./src/forms/FormikForm/FormikForm";
import CustomForm from "./src/forms/CustomForm/CustomForm";

export default function App() {
  // <FormikForm />
  // <LoginForm />
  return (
    <BackgroundImage>
      <CustomForm />
    </BackgroundImage>
  );
}
