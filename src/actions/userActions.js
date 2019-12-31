import { Alert } from "react-native";

import firebase from "@firebase/app";
import "@firebase/auth";

export const USER_LOGIN_SUCESS = "USER_LOGIN_SUCESS";
const userLoginSucess = user => ({
  type: USER_LOGIN_SUCESS,
  user
});

export const USER_LOGOUT = "USER_LOGOUT";
const userLogout = () => ({
  type: USER_LOGOUT
});

export const tryLogin = ({ email, password }) => dispatch => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      const action = userLoginSucess(user);
      dispatch(action);
      return user;
    })
    .catch(error => {
      if (error.code === "auth/user-not-found") {
        return new Promise((resolve, reject) => {
          Alert.alert(
            "Usuário não encontrado",
            "Deseja criar um cadastro com as informações inseridas?",
            [
              {
                text: "Não",
                onPress: () => resolve(),
                style: "cancel" //IOS
              },
              {
                text: "Sim",
                onPress: () => {
                  firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(resolve)
                    .catch(reject);
                }
              }
            ]
          );
        });
      }
      return Promise.reject(error);
    });
};
