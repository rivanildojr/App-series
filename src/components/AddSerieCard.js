import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

const AddSerieCard = ({ serie, isFirstColumn, onNavigate }) => (
  <TouchableOpacity
    onPress={onNavigate}
    style={[
      styles.container,
      isFirstColumn ? styles.firstColumn : styles.lastColumn
    ]}
  >
    <View style={styles.card}>
      <Image style={styles.image} source={require("../../resources/add.png")} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    height: Dimensions.get("window").width / 2
  },
  card: {
    flex: 1
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    height: "100%"
  },
  firstColumn: {
    paddingLeft: 10
  },
  lastColumn: {
    paddingRight: 10
  }
});

export default AddSerieCard;
