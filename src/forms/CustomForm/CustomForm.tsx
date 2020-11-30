import { Picker } from "@react-native-community/picker";
import { StatusBar } from "expo-status-bar";
import React, { useReducer } from "react";
import { Button, View, Text, ScrollView, TextInput } from "react-native";
import styles from "./CustomForm.styles";
import RNPickerSelect from "react-native-picker-select";
import reducerSettings, { ILang, initialValues } from "./Effects/reducers";
import actions from "./Effects/actions";

const bareList: ILang[] = [
  { label: "Py", value: "Python", id: 3 },
  { label: "J", value: "Java", id: 1 },
  { label: "JS", value: "JavaScript", id: 2 },
];

const items = [
  { label: "Python", value: 3 },
  { label: "Java", value: 1 },
  { label: "JavaScript", value: 2 },
];

export default function CustomForm() {
  const USERNAME_PLACEHOLDER = "Username";
  const PASSWORD_PLACEHOLDER = "Password";
  const EMAIL_PLACEHOLDER = "Email";

  const [state, dispatch] = useReducer(reducerSettings, initialValues);

  const { username, password, email, language, bare } = state.inputValues;
  const { formValid, inputValidities } = state;

  const onSubmit = (e: any) => {
    console.log("STATE: ", state.inputValues);
    alert(
      `bare: ${bare} ; selectInput: ${
        language && language.id
      } ; username: ${username}`
    );
  };

  const onChangePicker = (itemValue: any, itemIndex: number) => {
    const id = parseInt(itemValue);
    const result = bareList.find((item) => item.id === id);
    if (result) {
      dispatch(actions.setInputData("bare", result));
    }
  };

  const onChangeRNPickerSelect = (itemValue: any, itemIndex: number) => {
    const value = parseInt(itemValue);
    const result = items.find((item) => item.value === value);
    if (result) {
      dispatch(actions.setInputData("language", result));
    } else {
      dispatch(actions.setInputData("language", undefined));
    }
  };

  console.log("render ");

  return (
    <ScrollView style={styles.container}>
      {/* username */}
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputLabel}>
            Input text con dos validaciones, requerida y custom
          </Text>
        </View>
        <TextInput
          onChangeText={(value) => {
            dispatch(actions.setInputData("username", value));
          }}
          value={username}
          style={styles.input}
        />
        <View>
          <Text style={styles.error}>
            {inputValidities && inputValidities.username}
          </Text>
        </View>
      </View>
      {/* username */}

      {/* password */}
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputLabel}>Input tipo password requerido</Text>
        </View>
        <TextInput
          onChangeText={(value) => {
            dispatch(actions.setInputData("password", value));
          }}
          value={password}
          style={styles.input}
          secureTextEntry={true}
          placeholder={PASSWORD_PLACEHOLDER}
        />
        <View>
          <Text style={styles.error}>
            {inputValidities && inputValidities.password}
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
          onChangeText={(value) => {
            dispatch(actions.setInputData("email", value));
          }}
          value={email}
          style={styles.input}
          placeholder={EMAIL_PLACEHOLDER}
        />
        <View>
          <Text style={styles.error}>
            {inputValidities && inputValidities.email}
          </Text>
        </View>
      </View>
      {/* email */}

      {/* Libreria Picker de expo community, no contralada por Formik */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          Libreria Pikcer de expo para input select
        </Text>
        <Picker
          selectedValue={bare ? bare.id : undefined}
          style={{ height: 40 }}
          onValueChange={onChangePicker}
        >
          <Picker.Item label="" value={-1} />
          {bareList.map((item) => (
            <Picker.Item label={item.value} value={item.id} key={item.id} />
          ))}
        </Picker>
      </View>
      {/* Libreria Picker de expo community, no contralada por Formik */}

      {/* Libreria Select Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          Libreria react-native-picker-select
        </Text>

        <RNPickerSelect
          value={language ? language.id : undefined}
          onValueChange={onChangeRNPickerSelect}
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
            {inputValidities && inputValidities.language}
          </Text>
        </View>
      </View>
      {/* Libreria Select Picker, controlada por FORMIK */}

      <View style={styles.inputContainer}>
        <Button onPress={onSubmit} title="ENTRAR" />
      </View>
      {/*       <View style={styles.inputContainer}>
        <Button
          onPress={handleReset as any}
          title="RESET FORM"
          disabled={!dirty}
        />
      </View> */}

      <StatusBar style="auto" />
    </ScrollView>
  );
}
