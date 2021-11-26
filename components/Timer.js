import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RoundCount from "./RoundCount";

export default Timer = ({ count, timeStr, seconds, restSeconds }) => {
  return (
    <View styles={styles.counters}>
      {seconds > 0 && <Text style={styles.activeTimer}>{timeStr}</Text>}
      {restSeconds > 0 && <Text style={styles.pauseTimer}>{timeStr}</Text>}
      <RoundCount count={count} />
    </View>
  );
};

const styles = StyleSheet.create({
  counters: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeTimer: {
    fontSize: 96,
    textAlign: "center",
    fontVariant: ["tabular-nums"],
  },
  pauseTimer: {
    fontSize: 96,
    fontVariant: ["tabular-nums"],
    color: "red",
  },
});
