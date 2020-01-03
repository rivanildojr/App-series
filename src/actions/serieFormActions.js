import firebase from "@firebase/app";
import "@firebase/database";

export const SET_FIELD = "SET_FIELD";
export const setField = (field, value) => ({
  type: SET_FIELD,
  field,
  value
});

export const SERIE_SAVED_SUCESS = "SERIE_SAVED_SUCESS";
const serieSavedSucess = () => ({
  type: SERIE_SAVED_SUCESS
});

export const saveSerie = serie => {
  const { currentUser } = firebase.auth();
  return async dispatch => {
    await firebase
      .database()
      .ref(`/users/${currentUser.uid}/series`)
      .push(serie);
    dispatch(serieSavedSucess());
  };
};
