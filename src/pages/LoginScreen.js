import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  Alert
} from "react-native";

import firebase from "@firebase/app";
import "@firebase/auth";

import FormRow from "../components/FormRow";

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID
} from "react-native-dotenv";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
      message: ""
    };
  }

  componentDidMount() {
    const firebaseConfig = {
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      databaseURL: DATABASE_URL,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSAGING_SENDER_ID,
      appId: APP_ID,
      measurementId: MEASUREMENT_ID
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  onChangeHandler(field, value) {
    this.setState({ [field]: value });
  }

  tryLogin() {
    this.setState({ isLoading: true, message: "" });
    const { email, password } = this.state;
    console.log(email, password, "asdasdasdasda");

    const loginUserSuccess = user => {
      this.setState({ message: "Sucesso!" });
    };

    const loginUserFailed = error => {
      this.setState({
        message: this.getMessageByErrorCode(error.code)
      });
    };

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(loginUserSuccess)
      .catch(error => {
        console.log(error, "asdasddasdasdasdasd22");
        if (error.code === "auth/user-not-found") {
          Alert.alert(
            "Usuário não encontrado",
            "Deseja criar um cadastro com as informações inseridas?",
            [
              {
                text: "Não",
                style: "cancel" //IOS
              },
              {
                text: "Sim",
                onPress: () => {
                  firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(loginUserSuccess)
                    .catch(loginUserFailed);
                }
              }
            ]
          );
          return;
        }
        loginUserFailed(error);
      })
      .then(() => this.setState({ isLoading: false }));
  }

  getMessageByErrorCode(errorCode) {
    switch (errorCode) {
      case "auth/wrong-password":
        return "Senha incorreta";
      case "auth/user-not-found":
        return "Usuário não encontrado";
      case "auth/invalid-email":
        return "Email invalido";
      default:
        console.log(errorCode);
        return "Erro desconhecido";
    }
  }

  renderMessage() {
    const { message } = this.state;

    if (!message) return null;

    return (
      <View>
        <Text style={styles.mmm}>{message}</Text>
      </View>
    );
  }

  renderButton() {
    if (this.state.isLoading) return <ActivityIndicator />;

    return (
      <Button
        title="Entrar"
        onPress={() => {
          this.tryLogin();
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FormRow first>
          <TextInput
            style={styles.input}
            placeholder="user@mail.com"
            value={this.state.email}
            onChangeText={value => this.onChangeHandler("email", value)}
          />
        </FormRow>
        <FormRow last>
          <TextInput
            style={styles.input}
            placeholder="*******"
            secureTextEntry
            value={this.state.password}
            onChangeText={value => this.onChangeHandler("password", value)}
          />
        </FormRow>
        {this.renderButton()}
        {this.renderMessage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  input: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  },
  mmm: {
    color: "red"
  }
});
