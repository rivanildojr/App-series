import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Picker,
  Slider,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Image
} from "react-native";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { connect } from "react-redux";

import FormRow from "../components/FormRow";
import { setField, saveSerie, setWholeSerie, resetForm } from "../actions";

class SerieFormPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoanding: false
    };
  }

  componentDidMount() {
    const { navigation, setWholeSerie, resetForm } = this.props;
    const { params } = navigation.state;
    if (params && params.serieToEdit) {
      return setWholeSerie(params.serieToEdit);
    }
    return resetForm();
  }

  async pickerImg() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      Alert.alert("Você precisa permitir o acesso!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.2,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1] // Android
    });

    if (!result.cancelled) {
      this.props.setField("img64", result.base64);
    }
  }

  render() {
    const { serieForm, setField, saveSerie, navigation } = this.props;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={200}
      >
        <ScrollView>
          <FormRow first>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={serieForm.title}
              onChangeText={value => setField("title", value)}
            />
          </FormRow>

          <FormRow>
            {serieForm.img64 ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${serieForm.img64}` }}
                style={styles.img}
              />
            ) : null}

            <Button
              title="Selecione um imagem"
              onPress={() => this.pickerImg()}
            />
          </FormRow>

          <FormRow>
            <Picker
              selectedValue={serieForm.gender}
              onValueChange={itemValue => {
                setField("gender", itemValue);
              }}
            >
              <Picker.Item label="Policial" value="Policial" />
              <Picker.Item label="Comédia" value="Comédia" />
              <Picker.Item label="Terror" value="Terror" />
            </Picker>
          </FormRow>

          <FormRow>
            <View style={styles.sameRow}>
              <Text>Nota</Text>
              <Text>{serieForm.rate}</Text>
            </View>
            <Slider
              onValueChange={value => setField("rate", value)}
              value={serieForm.rate}
              maximumValue={100}
              step={5}
            />
          </FormRow>

          <FormRow>
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={serieForm.description}
              onChangeText={value => setField("description", value)}
              numberOfLines={4}
              multiline={true}
            />
          </FormRow>

          {this.state.isLoanding ? (
            <ActivityIndicator />
          ) : (
            <Button
              title="Salvar"
              onPress={async () => {
                this.setState = { isLoanding: true };
                try {
                  await saveSerie(serieForm);
                  navigation.goBack();
                } catch (error) {
                  Alert.alert(
                    "Erro!",
                    "Um erro ocorreu, Tente novamente mais tarde!"
                  );
                } finally {
                  this.setState = { isLoanding: false };
                }
              }}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 5,
    paddingBottom: 5
  },
  sameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  img: {
    aspectRatio: 1,
    width: "100%"
  }
});

const mapStateToProps = state => ({
  serieForm: state.serieForm
});

const mapDispatchToProps = {
  setField,
  saveSerie,
  setWholeSerie,
  resetForm
};

export default connect(mapStateToProps, mapDispatchToProps)(SerieFormPage);
