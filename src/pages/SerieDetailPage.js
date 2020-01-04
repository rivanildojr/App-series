import React, { Component } from "react";

import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Button
} from "react-native";

import Line from "../components/Line";
import LongText from "../components/LongText";

class SerieDetailPage extends Component {
  render() {
    const { navigation } = this.props;
    const { serie } = navigation.state.params;
    return (
      <ScrollView style={styles.container}>
        {serie.img ? (
          <Image style={styles.image} source={{ uri: serie.img }} />
        ) : null}
        <Line label="Título" content={serie.title} />
        <Line label="Gênero" content={serie.gender} />
        <Line label="Nota" content={serie.rate} />
        <LongText label="Descrição" content={serie.description} />

        <Button
          title="Editar"
          onPress={() => {
            navigation.replace("SerieForm", { serieToEdit: serie });
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover"
  }
});

export default SerieDetailPage;
