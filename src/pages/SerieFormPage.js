import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { connect } from "react-redux";

import FormRow from "../components/FormRow";
import { setField } from "../actions";

const SerieFormPage = ({ serieForm, setField }) => {
  return (
    <View>
      <FormRow first>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={serieForm.title}
          onChangeText={value => setField("title", value)}
        />
      </FormRow>
      <FormRow>
        <TextInput
          style={styles.input}
          placeholder="URL da Imagem"
          value={serieForm.img}
          onChangeText={value => setField("img", value)}
        />
      </FormRow>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 5,
    paddingBottom: 5
  }
});

const mapStateToProps = state => ({
  serieForm: state.serieForm
});

const mapDispatchToProps = {
  setField
};

export default connect(mapStateToProps, mapDispatchToProps)(SerieFormPage);
