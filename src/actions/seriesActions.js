import firebase from "@firebase/app";
import "@firebase/database";

import { Alert } from "react-native";
import { hasStartedLocationUpdatesAsync } from "expo-location";

export const SET_SERIES = "SET_SERIES";
const setSeries = series => ({
  type: SET_SERIES,
  series
});

export const watchSeries = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/series`)
      .on("value", snapshop => {
        const series = snapshop.val();

        if (!series) {
          return dispatch(setSeries({}));
        }

        dispatch(setSeries(series));
      });
  };
};

export const deleteSerie = serie => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Deletar",
        `Deseja deletar a serie ${serie.title}`,
        [
          {
            text: "Não",
            onPress: () => {
              resolve(false);
            },
            style: "cancel" //IOS
          },
          {
            text: "Sim",
            onPress: async () => {
              const { currentUser } = firebase.auth();
              await firebase
                .database()
                .ref(`/users/${currentUser.uid}/series/${serie.id}`)
                .remove();
              resolve(true);
            }
          }
        ],
        { cancelable: false }
      );
    });
  };
};
