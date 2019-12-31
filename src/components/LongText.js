import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
  UIManager
} from "react-native";

//Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class LongText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };
  }

  toggleIsExpanded() {
    const { isExpanded } = this.state;

    this.setState({
      isExpanded: !isExpanded
    });
  }

  componentWillUpdate(nextProps, nextState) {
    LayoutAnimation.spring();
  }

  render() {
    const { label = "", content = "-" } = this.props;
    const { isExpanded } = this.state;
    return (
      <View style={styles.line}>
        <Text style={[styles.cell, styles.label]}>{label}</Text>
        <TouchableWithoutFeedback onPress={() => this.toggleIsExpanded()}>
          <View>
            <Text
              style={[
                styles.cell,
                styles.content,
                isExpanded ? styles.expanded : styles.collapsed
              ]}
            >
              {content}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    paddingTop: 3,
    paddingBottom: 3
  },
  cell: {
    fontSize: 18,
    paddingHorizontal: 5
  },
  label: {
    fontWeight: "bold",
    flex: 1,
    textDecorationLine: "underline",
    paddingBottom: 8
  },
  content: {
    flex: 3,
    textAlign: "justify" //IOS
  },
  collapsed: {
    maxHeight: 65
  },
  expanded: {
    flex: 1
  }
});
