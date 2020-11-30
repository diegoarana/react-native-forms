import { Picker } from "@react-native-community/picker";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, View, Text, ScrollView, TextInput } from "react-native";
import styles from "./FormikForm.style";
import { Formik, FormikErrors } from "formik";
import RNPickerSelect from "react-native-picker-select";

interface Values {
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
  { label: "Python", value: 3, key: 3 },
  { label: "Java", value: 1, key: 1 },
  { label: "JavaScript", value: 2, key: 2 },
];

export default function FormikForm() {
  const USERNAME_PLACEHOLDER = "Username";
  const PASSWORD_PLACEHOLDER = "Password";
  const EMAIL_PLACEHOLDER = "Email";
  const [language, setLanguage] = useState<ILang | undefined>(undefined);

  const initialValues = {
    username: "valor",
    password: "",
    email: "",
    languageId: 3,
    bare: 3,
  };

  const onSubmit = (data: Values) => {
    alert(`bare: ${data.bare} ; selectInput: ${data.languageId} ; `);
  };

  const onChangePicker = (itemValue: any, itemIndex: number) => {
    const id = parseInt(itemValue);
    const result = languageList.find((item) => item.id === id);
    if (result) {
      setLanguage(result);
    }
  };

  console.log("render: ");

  const validateForm = (values: Values) => {
    let errors: FormikErrors<Values> = {};

    if (!values.username) {
      errors.username = "Required";
    } else if (values.username === "diego") {
      errors.username = "El usuario no puede contener su nombre";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length > 3) {
      errors.password = "contrasenia muy larga";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.languageId) {
      errors.languageId = "El leguaje de programacion es requerido";
    }

    return errors;
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validateForm}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
          touched,
          dirty,
          handleReset,
          isSubmitting,
        }) => (
          <>
            {/* username */}
            <View style={styles.inputContainer}>
              <View>
                <Text style={styles.inputLabel}>
                  Input text con dos validaciones, requerida y custom
                </Text>
              </View>
              <TextInput
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                style={styles.input}
              />
              <View>
                <Text style={styles.error}>
                  {errors.username && touched.username ? errors.username : null}
                </Text>
              </View>
            </View>
            {/* username */}

            {/* password */}
            <View style={styles.inputContainer}>
              <View>
                <Text style={styles.inputLabel}>
                  Input tipo password requerido
                </Text>
              </View>
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                style={styles.input}
                secureTextEntry={true}
                placeholder={PASSWORD_PLACEHOLDER}
              />
              <View>
                <Text style={styles.error}>
                  {errors.password && touched.password ? errors.password : null}
                </Text>
              </View>
            </View>
            {/* password */}

            {/* email */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Input con validacion por expresion regular
              </Text>
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={styles.input}
                placeholder={EMAIL_PLACEHOLDER}
              />
              <View>
                <Text style={styles.error}>
                  {errors.email && touched.email ? errors.email : null}
                </Text>
              </View>
            </View>
            {/* email */}

            {/* Libreria Picker de expo community, no contralada por Formik */}
            <View style={styles.inputContainer}>
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
                  <Picker.Item
                    label={item.value}
                    value={item.id}
                    key={item.id}
                  />
                ))}
              </Picker>
            </View>
            {/* Libreria Picker de expo community, no contralada por Formik */}

            {/* Libreria Select Picker, controlada por FORMIK*/}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Libreria react-native-picker-select, controlada por FORMIK
              </Text>

              <RNPickerSelect
                value={values.languageId}
                onValueChange={(itemValue: any, itemIndex: number) => {
                  const value = parseInt(itemValue);
                  setFieldValue("languageId", value);
                }}
                items={items}
                placeholder={{
                  label: "Seleccione un lenguaje",
                  value: null,
                  key: -1,
                }}
                pickerProps={{
                  style: { height: 40 },
                }}
              />

              <View>
                <Text style={styles.error}>
                  {errors.languageId ? errors.languageId : null}
                </Text>
              </View>
            </View>
            {/* Libreria Select Picker, controlada por FORMIK */}

            <View style={styles.inputContainer}>
              <Button onPress={handleSubmit as any} title="ENTRAR" />
            </View>
            <View style={styles.inputContainer}>
              <Button
                onPress={handleReset as any}
                title="RESET FORM"
                disabled={!dirty}
              />
            </View>
          </>
        )}
      </Formik>

      {/*  Libreria Picker de expo community mejorada y componentizada

      <View style={styles.inputContainer}>
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
      </View>
       
       Libreria Picker de expo community mejorada y componentizada  */}

      <StatusBar style="auto" />
    </ScrollView>
  );
}
