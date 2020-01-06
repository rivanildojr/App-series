import React, { Component } from "react";

import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  View
} from "react-native";

import { connect } from "react-redux";

import Line from "../components/Line";
import LongText from "../components/LongText";
import { deleteSerie } from "../actions";

class SerieDetailPage extends Component {
  render() {
    const { navigation } = this.props;
    const { serie } = navigation.state.params;
    return (
      <ScrollView style={styles.container}>
        {serie.img64 ? (
          <Image
            style={styles.image}
            source={{ uri: `data:image/jpeg;base64,${serie.img64}` }}
          />
        ) : null}
        <Line label="Título" content={serie.title} />
        <Line label="Gênero" content={serie.gender} />
        <Line label="Nota" content={serie.rate} />
        <LongText label="Descrição" content={serie.description} />

        <View style={styles.button}>
          <Button
            title="Editar"
            onPress={() => {
              navigation.replace("SerieForm", { serieToEdit: serie });
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Deletar"
            color="#FF0004FF"
            onPress={async () => {
              const hasDeleted = await this.props.deleteSerie(serie);
              if (hasDeleted) {
                navigation.goBack();
              }
            }}
          />
        </View>
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
  },
  button: {
    margin: 10
  }
});

const mapDispatchToProps = {
  deleteSerie
};

export default connect(null, mapDispatchToProps)(SerieDetailPage);
