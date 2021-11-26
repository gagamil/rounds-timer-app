import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import { AppState, StyleSheet, View } from "react-native";
import { useKeepAwake } from "expo-keep-awake";
import Timer from "./components/Timer";
import ActionBlock from "./components/ActionBlock";

export default function App() {
  useKeepAwake();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      _handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    console.log("STATE CHANGE");
    if (
      (appState.current == "active" && nextAppState === "inactive") ||
      "background"
    ) {
      stopCounter();
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    //console.log("AppState", appState.current);
  };

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
      <Timer
        count={count}
        timeStr={timeStr}
        seconds={seconds}
        restSeconds={restSeconds}
      />
      <ActionBlock
        gameOver={gameOver}
        stopCounter={stopCounter}
        resetRounds={resetRounds}
        setStart={setStart}
        start={start}
        stop={stop}
      />
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
});
