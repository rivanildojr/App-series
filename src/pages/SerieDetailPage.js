import React, { Component } from "react";

import { ScrollView, Text, StyleSheet, Image, Dimensions } from "react-native";

import Line from "../components/Line";
import LongText from "../components/LongText";

class SerieDetailPage extends Component {
  render() {
    const { serie } = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={{ uri: serie.img }} />
        <Line label="Título" content={serie.title} />
        <Line label="Gênero" content={serie.gender} />
        <Line label="Nota" content={serie.rate} />
        <LongText label="Descrição" content={serie.description} />
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
