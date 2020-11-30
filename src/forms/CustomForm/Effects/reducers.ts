import { Item } from "react-native-picker-select";

export interface ILang {
  label: string;
  value: string;
  id: number;
}

export interface IState {
  inputValues: {
    username: string;
    password: string;
    email: string;
    language: ILang;
    bare: any;
    items: Item[];
  };
  inputValidities: {
    username: string;
    password: string;
    email: string;
    language: string;
    bare: string;
  };
  formValid: boolean;
}

export interface IAction {
  type: string;
  [key: string]: any;
}

export const initialValues = {
  inputValues: {
    username: "valor",
    password: "",
    email: "",
    language: undefined,
    bare: { label: "Py", value: "Python", id: 3 },
  },
  inputValidities: {
    username: undefined,
    password: undefined,
    email: undefined,
    language: undefined,
    bare: undefined,
  },
  formValid: false,
};

const validateUsername = (value: string) => {
  if (!value) {
    return "Required";
  } else if (value === "diego") {
    return "El usuario no puede contener su nombre";
  }
};

const validatePassword = (value: string) => {
  if (!value) {
    return "Required";
  } else if (value.length > 3) {
    return "contrasenia muy larga";
  }
};

const validateEmail = (value: string) => {
  if (!value) {
    return "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return "Invalid email address";
  }
};

const validateLanguage = (value: object) => {
  if (!value) {
    return "El leguaje de programacion es requerido";
  }
};

const validateForm = (payload: any, key: string) => {
  switch (key) {
    case "username":
      return validateUsername(payload.username);

    case "password":
      return validatePassword(payload.password);

    case "email":
      return validateEmail(payload.email);

    case "language":
      return validateLanguage(payload.language);
  }
};

const getKey = (payload: object) => {
  return Object.keys(payload)[0];
};

const reducerSettings = (state: IState, action: IAction) => {
  const { type, payload = {} } = action;

  switch (type) {
    case "INPUT_DATA":
      const updatedValues = {
        ...state.inputValues,
        ...payload,
      };
      const key = getKey(payload);
      const validities = validateForm(payload, key);
      const updatedValidities: any = {
        ...state.inputValidities,
        [key]: validities,
      };

      let isFormValid = true;

      for (const key in updatedValidities) {
        isFormValid = isFormValid && !!updatedValidities[key];
      }
      return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formValid: isFormValid,
      };
    case "SET_ITEMS":
      const { items } = payload;
      return {
        ...state,
        items,
      };
    default:
      throw new Error(`Unexpected error the type ${type} not exists`);
  }
};
export default reducerSettings;

/* const validateForm = (values: Values) => {
    let errors: FormikErrors<Values> = {};

    if (!values.languageId) {
      errors.languageId = "El leguaje de programacion es requerido";
    }

    return errors;
  }; */
