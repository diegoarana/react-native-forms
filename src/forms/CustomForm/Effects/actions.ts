import { Item } from "react-native-picker-select";

// Por cada acción se devuelve el type y el payload

const setInputData = (key: string, value: any) => {
  /** Hacemos uso de Dynamic Property Key para cargar el payload
   * de todos los inputs con una sola acción
   */
  return { type: "INPUT_DATA", payload: { [key]: value } };
};
const setOptions = (items: Item[]) => {
  return { type: "SET_OPTIONS", payload: { items } };
};

export default {
  setInputData,
  setOptions,
};
