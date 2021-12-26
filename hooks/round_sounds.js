import React from "react";
import { Audio } from "expo-av";

const usePlaySounds = ({
  roudDuration,
  pauseBetweenRounds,
  currRoundTime,
  currPauseTime,
}) => {
  const [startSound, setStartSound] = React.useState(null);
  const [endSound, setEndSound] = React.useState(null);
  React.useEffect(() => {
    const playStartSound = async () => {
      try {
        if (!startSound) {
          const { sound, status } = await Audio.Sound.createAsync(
            require("../assets/sounds/start-bells-fight-boxing-bell-boxing.wav")
          );
          console.log("S T A T U S => ", status);
          setStartSound(sound);
        }
        if (startSound) {
          console.log("Will play start sound");
          await startSound.replayAsync();
          //   await startSound.setPositionAsync(0);
        }
        // return await sound.unloadAsync();
      } catch (e) {
        console.log("E R R O R ==> ", e);
      }
    };
    if (currRoundTime && roudDuration === currRoundTime) {
      playStartSound();
    }
    const playFinishSound = async () => {
      try {
        if (!endSound) {
          const { sound, status } = await Audio.Sound.createAsync(
            require("../assets/sounds/finish-bells-fight-boxing-bell-boxing.wav")
          );
          console.log("S T A T U S => ", status);
          setEndSound(sound);
        }
        if (endSound) {
          await endSound.replayAsync();
          //   await endSound.setPositionAsync(0);
        }
        // return await sound.unloadAsync();
      } catch (e) {
        console.log("E R R O R ==> ", e);
      }
    };
    if (currPauseTime && pauseBetweenRounds === currPauseTime) {
      playFinishSound();
    }
    // await sound.unloadAsync();
  }, [
    roudDuration,
    pauseBetweenRounds,
    currRoundTime,
    currPauseTime,
    startSound,
    endSound,
  ]);
};
export default usePlaySounds;
