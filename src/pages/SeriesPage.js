import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from "react-native";

import { connect } from "react-redux";

import SerieCard from "../components/SerieCard";
import AddSerieCard from "../components/AddSerieCard";
import { isEven } from "../util";
import { watchSeries } from "../actions";

class SeriesPage extends Component {
  componentDidMount() {
    this.props.watchSeries();
  }

  render() {
    const { series, navigation } = this.props;
    if (series === null) {
      return <ActivityIndicator />;
    }
    return (
      <FlatList
        data={[...series, { isLast: true }]}
        renderItem={({ item, index }) =>
          item.isLast ? (
            <View>
              <AddSerieCard
                isFirstColumn={isEven(index)}
                onNavigate={() => navigation.navigate("SerieForm")}
              />
            </View>
          ) : (
            <SerieCard
              serie={item}
              isFirstColumn={isEven(index) ? true : false}
              onNavigate={() =>
                navigation.navigate("SerieDetail", {
                  serie: item
                })
              }
            />
          )
        }
        keyExtractor={item => item.id}
        numColumns={2}
        ListHeaderComponent={props => <View style={styles.marginTop} />}
        ListFooterComponent={props => <View style={styles.marginBottom} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 5
  },
  marginBottom: {
    marginBottom: 5
  }
});

const mapStateToProps = state => {
  const { series } = state;
  if (series === null) {
    return { series };
  }

  const keys = Object.keys(series);
  const seriesWithKeys = keys.map(id => {
    return { ...series[id], id };
  });
  return { series: seriesWithKeys };
};

const mapDispatchToProps = {
  watchSeries
};

export default connect(mapStateToProps, mapDispatchToProps)(SeriesPage);
