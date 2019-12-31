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

import { connect } from "react-redux";

import { tryLogin } from "../actions";

class LoginPage extends React.Component {
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

    this.props
      .tryLogin({ email, password })
      .then(user => {
        if (user) return this.props.navigation.replace("Main");

        this.setState({
          isLoading: false,
          message: ""
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          message: this.getMessageByErrorCode(error.code)
        });
      });
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
        <Text style={styles.message}>{message}</Text>
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
            keyboardType="email-address"
            autoCapitalize="none"
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
  message: {
    color: "red"
  }
});

// const mapStateToProps = state => ({

// });

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(, dispatch);

export default connect(null, { tryLogin })(LoginPage);
