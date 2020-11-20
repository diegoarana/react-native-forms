import React from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./Preloader.style";

export default function Preloader() {
  return (
    <View style={styles.preloader}>
      <ActivityIndicator style={{ height: 80 }} size="large" />
    </View>
  );
}
