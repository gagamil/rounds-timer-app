import React from "react";
import { Text, View, Button } from "react-native";

export default ActionBlock = ({
  gameOver,
  stopCounter,
  resetRounds,
  setStart,
  start,
  stop,
}) => {
  return (
    <View>
      {start && (
        <View>
          {gameOver && <Text style={{ fontSize: 36 }}>Game Over</Text>}
          <View style={{ flexDirection: "row" }}>
            <Button
              onPress={stopCounter}
              title={stop ? "Resume" : "Pause"}
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
    </View>
  );
};
