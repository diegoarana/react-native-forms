import React from "react";
import { Control, Controller } from "react-hook-form";
import { StyleProp, TextStyle } from "react-native";
import RNPickerSelect, { Item } from "react-native-picker-select";

interface IProps {
  name: string;
  control: Control;
  items: Item[];
  rules?: any;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  [key: string]: any;
}

export default function SelectInputForm({
  name,
  control,
  rules,
  placeholder,
  style,
  items,
  ...rest
}: IProps) {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ onChange }) => (
        <RNPickerSelect
          {...rest}
          items={items}
          placeholder={{ label: placeholder }}
          onValueChange={(itemValue: any, itemIndex: number) => {
            onChange(itemValue);
          }}
          pickerProps={{
            style: style ? style : undefined,
          }}
        />
      )}
    />
  );
}
