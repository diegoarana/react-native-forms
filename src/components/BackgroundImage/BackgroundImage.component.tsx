import React from "react";
import { ImageBackground } from "react-native";

interface Iprops {
  children: JSX.Element;
}

export default function BackgroundImage(props: Iprops) {
  return (
    <ImageBackground
      source={require("../../../assets/logo-og.png")}
      style={{ flex: 1, height: undefined, width: undefined }}
    >
      {props.children}
    </ImageBackground>
  );
}
