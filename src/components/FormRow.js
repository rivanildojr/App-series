import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FormRow = props => {
  const { children } = props;
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    margin: 5,
    elevation: 2
  }
});

export default FormRow;
