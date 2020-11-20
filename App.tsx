import React from "react";
import BackgroundImage from "./src/components/BackgroundImage/BackgroundImage.component";
import LoginForm from "./src/forms/LoginForm/LoginForm";
import FormikForm from "./src/forms/FormikForm/FormikForm";

export default function App() {
  //<FormikForm />
  return (
    <BackgroundImage>
      <LoginForm />
    </BackgroundImage>
  );
}
