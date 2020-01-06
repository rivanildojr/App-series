import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

const SerieCard = ({ serie, isFirstColumn, onNavigate }) => (
  <TouchableOpacity
    onPress={onNavigate}
    style={[
      styles.container,
      isFirstColumn ? styles.firstColumn : styles.lastColumn
    ]}
  >
    <View style={styles.card}>
      {serie.img64 ? (
        <Image
          style={styles.image}
          source={{ uri: `data:image/jpeg;base64,${serie.img64}` }}
        />
      ) : null}
      <View style={styles.cardTitleWrapper}>
        <Text style={styles.cardTitle}>{serie.title}</Text>
      </View>
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
  cardTitleWrapper: {
    backgroundColor: "black",
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,

    position: "absolute",
    bottom: 0,
    opacity: 0.8
  },
  cardTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold"
  },
  firstColumn: {
    paddingLeft: 10
  },
  lastColumn: {
    paddingRight: 10
  }
});

export default SerieCard;
