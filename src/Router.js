import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "./pages/LoginScreen";
import SeriesPage from "./pages/SeriesPage";
import SerieDetailPage from "./pages/SerieDetailPage";
import SerieFormPage from "./pages/SerieFormPage";

const AppNavigator = createStackNavigator(
  {
    SerieForm: {
      screen: SerieFormPage,
      navigationOptions: {
        title: "Nova Série!"
      }
    },
    Main: {
      screen: SeriesPage
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: "Bem vindo!"
      }
    },
    SerieDetail: {
      screen: SerieDetailPage,
      navigationOptions: ({ navigation }) => {
        const { serie } = navigation.state.params;
        return {
          title: serie.title
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
