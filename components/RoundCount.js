import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default RoundCount = ({ count }) => {
  return (
    <View>
      <Text style={styles.roundCounter}>{count}</Text>
      <Text style={styles.roundCounterRoundLabel}>Round</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  roundCounter: {
    fontSize: 128,
    textAlign: "center",
    fontVariant: ["tabular-nums"],
    color: "grey",
    paddingTop: 16,
  },
  roundCounterRoundLabel: {
    fontSize: 32,
    textAlign: "center",
    color: "grey",
  },
});
