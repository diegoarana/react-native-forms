import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInput } from "react-native";

interface IProps {
  name: string;
  control: Control;
  rules?: any;
  [key: string]: any;
}

export default function TextInputForm({
  name,
  control,
  rules,
  ...rest
}: IProps) {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={(props) => (
        <TextInput
          {...props}
          {...rest}
          onChangeText={(text) => props.onChange(text)}
        />
      )}
    />
  );
}
