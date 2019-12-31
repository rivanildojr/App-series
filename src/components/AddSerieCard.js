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
      {/* <Image style={styles.image} source={{ uri: serie.img }} /> */}
      <Text>Aqui vai o nosso dfdfdfdfddsfsdfsdfsfsdfsdfsdfsdsaasdabotão</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    // Solução 2
    // flex: 0.5,
    //Solução 1 width: "50%", padding: 5,
    width: "50%",
    padding: 5,
    height: Dimensions.get("window").width / 2
  },
  card: {
    flex: 1,
    borderWidth: 1
    // Solução 2
    // margin: 10
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover"
  },
  firstColumn: {
    paddingLeft: 10
  },
  lastColumn: {
    paddingRight: 10
  }
});

export default AddSerieCard;
