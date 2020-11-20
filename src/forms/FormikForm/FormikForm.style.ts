import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
  },
  inputContainer: {
    margin: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    color: "white",
  },
  error: {
    color: "red",
  },
  inputLabel: {
    color: "white",
    fontSize: 18,
  },
});

export default styles;
