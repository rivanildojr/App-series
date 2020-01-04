import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "./pages/LoginScreen";
import SeriesPage from "./pages/SeriesPage";
import SerieDetailPage from "./pages/SerieDetailPage";
import SerieFormPage from "./pages/SerieFormPage";

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: "Bem vindo!"
      }
    },
    Main: {
      screen: SeriesPage
    },
    SerieDetail: {
      screen: SerieDetailPage,
      navigationOptions: ({ navigation }) => {
        const { serie } = navigation.state.params;
        return {
          title: serie.title
        };
      }
    },
    SerieForm: {
      screen: SerieFormPage,
      navigationOptions: ({ navigation }) => {
        const { params } = navigation.state;
        if (params && params.serieToEdit) {
          return {
            title: params.serieToEdit.title
          };
        }
        return {
          title: "Nova Série!"
        };
      }
    }
  },
  {
    defaultNavigationOptions: {
      title: "Series!",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#6ca2f7",
        borderBottomWidth: 1,
        borderBottomColor: "#C5C5C5"
      },
      headerTitleStyle: {
        color: "white",
        fontSize: 30
      }
    }
  }
);

export default createAppContainer(AppNavigator);
