import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import FormRow from "../components/FormRow";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  onChangeHandler(field, value) {
    this.setState({ [field]: value });
  }

  render() {
    return (
      <View>
        <FormRow>
          <TextInput
            style={styles.input}
            placeholder="user@mail.com"
            value={this.state.email}
            onChangeText={value => this.onChangeHandler("email", value)}
          />
        </FormRow>
        <FormRow>
          <TextInput
            style={styles.input}
            placeholder="*******"
            secureTextEntry
            value={this.state.password}
            onChangeText={value => this.onChangeHandler("password", value)}
          />
        </FormRow>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  }
});
