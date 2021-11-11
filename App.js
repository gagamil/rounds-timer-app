import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const maxRounds = 12;
  const roudDuration = 180;
  const pauseBetweenRounds = 60;
  const [count, setCount] = useState(1);
  const [seconds, setSeconds] = useState(roudDuration);
  const [restSeconds, setRestSeconds] = useState(0);
  const [timeStr, setTimeStr] = useState("");

  const resetRounds = () => {
    setCount(1);
    setSeconds(roudDuration);
    setGameOver(false);
    setRestSeconds(0);
    setStop(false);
    setStart(false);
  };
  const stopCounter = () => {
    setStop((currStop) => !currStop);
  };

  useEffect(() => {
    // increment the count by 1
    if (start) {
      const countTimer = setInterval(() => {
        if (!stop) {
          if (seconds > 0) {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
          if (restSeconds > 0) {
            setRestSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
        // every 1000 milliseconds
      }, 1000);
      // and clear this timer when the component is unmounted
      return function cleanup() {
        clearInterval(countTimer);
      };
    }
  }, [start, stop, seconds, restSeconds]);

  useEffect(() => {
    console.log(seconds, restSeconds);
    const ss = new Date(seconds > 0 ? seconds * 1000 : restSeconds * 1000)
      .toISOString()
      .substr(14, 5);
    setTimeStr(ss);
  }, [seconds, restSeconds]);

  useEffect(() => {
    if (0 == seconds) {
      if (count < 12) setRestSeconds(pauseBetweenRounds);
      else setGameOver(true);
    }
  }, [seconds]);

  useEffect(() => {
    if (0 == restSeconds && !!start) {
      setSeconds(roudDuration);
      setCount((prevCount) => prevCount + 1);
    }
  }, [restSeconds]);

  return (
    <View style={styles.container}>
      <View styles={styles.counters}>
        {seconds > 0 && (
          <>
            <Text style={styles.activeTimer}>{timeStr}</Text>
            <Text style={styles.roundCounter}>{count}</Text>
          </>
        )}
        {restSeconds > 0 && (
          <>
            <Text style={styles.pauseTimer}>{timeStr}</Text>
            <Text style={styles.roundCounter}>{count}</Text>
          </>
        )}
      </View>
      {start && (
        <View>
          {gameOver && <Text>Game Over</Text>}
          <View style={{ flexDirection: "row" }}>
            <Button
              onPress={stopCounter}
              title={stop ? "Resume" : "Stop"}
              color="black"
            />

            {stop && (
              <Button onPress={resetRounds} title="Reset" color="black" />
            )}
          </View>
        </View>
      )}
      {!start && (
        <View>
          <Button onPress={() => setStart(true)} title="Start" color="black" />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  counters: {
    alignItems: "center",
    justifyContent: "center",
  },
  roundCounter: {
    fontSize: 48,
    textAlign: "center",
    fontVariant: ["tabular-nums"],
    color: "grey",
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
