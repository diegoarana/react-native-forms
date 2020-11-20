import { Picker } from "@react-native-community/picker";
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
  defaultValue?: any;
  [key: string]: any;
}

export default function BareSelectInputForm({
  name,
  control,
  rules,
  placeholder,
  items,
  defaultValue,
  ...rest
}: IProps) {
  const onChange = (args: any): any => ({
    value: args[0],
  });

  const getPlaceholder = () => (
    <Picker.Item
      label={placeholder ? placeholder : "Seleccione..."}
      value={""}
      key={0}
    />
  );

  const renderPickerItems = () => {
    let result = items.map((item) => {
      return (
        <Picker.Item
          label={item.label}
          value={item.value}
          key={item.key || item.label}
          color={item.color}
        />
      );
    });

    result.unshift(getPlaceholder());
    return result;
  };

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      render={({ onChange, value }) => (
        <Picker
          {...rest}
          selectedValue={value}
          onValueChange={(itemValue: any, itemIndex: number) => {
            onChange(itemValue);
          }}
        >
          {renderPickerItems()}
        </Picker>
      )}
    />
  );
}
