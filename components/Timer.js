import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RoundCount from "./RoundCount";

export default Timer = ({
  count,
  timeStr,
  seconds,
  restSeconds,
  waitBeforeStartSeconds,
}) => {
  return (
    <View styles={styles.counters}>
      {waitBeforeStartSeconds > 0 && (
        <Text style={styles.waitTimer}>{timeStr}</Text>
      )}
      {seconds > 0 && waitBeforeStartSeconds == 0 && (
        <Text style={styles.activeTimer}>{timeStr}</Text>
      )}
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
  waitTimer: {
    fontSize: 96,
    fontVariant: ["tabular-nums"],
    color: "orange",
  },
});
