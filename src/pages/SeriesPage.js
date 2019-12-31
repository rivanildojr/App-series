import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import series from "../../series.json";
import SerieCard from "../components/SerieCard";
import { isEven } from "../util";

const SeriesPage = props => {
  return (
    <FlatList
      data={series}
      renderItem={({ item, index }) => (
        <SerieCard serie={item} isFirstColumn={isEven(index) ? true : false} />
      )}
      keyExtractor={item => item.id}
      numColumns={2}
      ListHeaderComponent={props => <View style={styles.marginTop} />}
      ListFooterComponent={props => <View style={styles.marginBottom} />}
    />
  );
};

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 5
  },
  marginBottom: {
    marginBottom: 5
  }
});

export default SeriesPage;
