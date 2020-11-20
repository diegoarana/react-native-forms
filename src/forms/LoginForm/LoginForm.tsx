import { Picker } from "@react-native-community/picker";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, View, Text, ScrollView } from "react-native";
import TextInputForm from "../TextInputForm/TextInputForm";
import styles from "./LoginForm.styles";
import SelectInputForm from "../SelectInputForm/SelectInputForm";
import BareSelectInputForm from "../SelectInputForm/BareSelectInputForm";

interface Inputs {
  username: string;
  password: string;
  email: string;
  languageId: number;
  bare: number;
}

interface ILang {
  value: string;
  id: number;
}

const languageList = [
  { label: "Py", value: "Python", id: 3 },
  { label: "J", value: "Java", id: 1 },
  { label: "JS", value: "JavaScript", id: 2 },
];

const items = [
  { label: "Python", value: 3 },
  { label: "Java", value: 1 },
  { label: "JavaScript", value: 2 },
];

export default function LoginForm() {
  const USERNAME_PLACEHOLDER = "Username";
  const PASSWORD_PLACEHOLDER = "Password";
  const EMAIL_PLACEHOLDER = "Email";
  const [language, setLanguage] = useState<ILang | undefined>(undefined);

  const pickerSelectRef = React.createRef();
  const barePickerRef = React.createRef();

  const defaultValues = {
    username: "valor",
    password: "",
    email: "",
    languageId: 3,
    bare: undefined,
  };

  // documentacion oficial https://react-hook-form.com/
  const { control, handleSubmit, errors } = useForm<Inputs>({
    mode: "onChange", // trigerea los errores al cambiar los inputs, ver documentacion
    defaultValues,
  });

  const onPressButton = (data: Inputs) => {
    console.log(data);
    alert(`bare: ${data.bare} ; selectInput: ${data.languageId}`);
  };

  const onChangePicker = (itemValue: any, itemIndex: number) => {
    const id = parseInt(itemValue);
    const result = languageList.find((item) => item.id === id);
    if (result) {
      setLanguage(result);
    }
  };

  console.log("render: ", control.fieldsRef.current);

  return (
    <ScrollView style={styles.container}>
      {/* username */}
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputLabel}>
            Input text con dos validaciones, requerida y custom
          </Text>
        </View>
        <TextInputForm
          name="username"
          control={control}
          rules={{
            required: "El nombre de usuario es requerido",
            validate: (value: string) =>
              value !== "diego" || "El usuario no puede contener su nombre",
          }}
          style={styles.input}
          placeholder={USERNAME_PLACEHOLDER}
        />
        <View>
          <Text style={styles.error}>
            {errors.username && errors.username.message}
          </Text>
        </View>
      </View>

      {/* password */}
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputLabel}>Input tipo password requerido</Text>
        </View>
        <TextInputForm
          name="password"
          control={control}
          rules={{
            required: "El de password es requerido",
            maxLength: {
              value: 2,
              message: "error contrasenia muy larga",
            },
          }}
          style={styles.input}
          secureTextEntry={true}
          placeholder={PASSWORD_PLACEHOLDER}
        />
        <View>
          <Text style={styles.error}>
            {errors.password && errors.password.message}
          </Text>
        </View>
      </View>

      {/* email */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          Input con validacion por expresion regular
        </Text>
        <TextInputForm
          name="email"
          control={control}
          rules={{
            required: "El email es requerido",
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email address",
            },
          }}
          style={styles.input}
          placeholder={EMAIL_PLACEHOLDER}
        />
        <View>
          <Text style={styles.error}>
            {errors.email && errors.email.message}
          </Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        {/* Libreria Picker de expo community */}
        <Text style={styles.inputLabel}>
          Libreria Pikcer de expo para input select (sin componentizar)
        </Text>
        <Picker
          selectedValue={language ? language.id : undefined}
          style={{ height: 40 }}
          onValueChange={onChangePicker}
        >
          <Picker.Item label="" value={-1} />
          {languageList.map((item) => (
            <Picker.Item label={item.value} value={item.id} key={item.id} />
          ))}
        </Picker>
        {/* Libreria Picker de expo community */}
      </View>

      <View style={styles.inputContainer}>
        {/* Libreria Select Picker componentizada */}
        <Text style={styles.inputLabel}>
          Libreria react-native-picker-select, componentizada pero con problemas
          al definir defaultValues
        </Text>
        <SelectInputForm
          name="languageId"
          control={control}
          placeholder="Seleccione un lenguaje"
          rules={{ required: "El leguaje de programacion es requerido" }}
          style={{ height: 40 }}
          items={items}
          ref={pickerSelectRef}
        />
        {/* Libreria Select Picker componentizada */}

        <View>
          <Text style={styles.error}>
            {errors.languageId && errors.languageId.message}
          </Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        {/* Libreria Picker de expo community mejorada y componentizada */}
        <Text style={styles.inputLabel}>
          Libreria Pikcer de Expo componentizada y mejorada (Funciona!)
        </Text>
        <BareSelectInputForm
          name="bare"
          control={control}
          items={items}
          rules={{ required: "select bare es requerido" }}
          style={{ height: 40 }}
          ref={barePickerRef}
        />

        <View>
          <Text style={styles.error}>{errors.bare && errors.bare.message}</Text>
        </View>
        {/* Libreria Picker de expo community mejorada y componentizada */}
      </View>

      <View style={styles.inputContainer}>
        <Button onPress={handleSubmit(onPressButton)} title="ENTRAR" />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
