import React, { useState,useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio, AVPlaybackStatus } from "expo-av";

const Player = (props) => {
  // console.log(props)
  const [soundDuration, setSoundDuration] = useState(0);
  const [soundPosition, setSoundPosition] = useState(0);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState(false);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState(null);
  const [isPlaybackAllowed, setIsPlaybackAllowed] = useState(false);
  useEffect(() => {
    if(props.autoPlay){
      playAudio()
    }
    return () => {
      if(isPlaying){
         sound.pauseAsync();
      }
     
    }
  }, [])
  const playAudio = async (uri: string=props.uri) => {
    try {
      if (sound) {
        if (isPlaying) {
          sound.pauseAsync();
        } else {
          if (soundPosition == soundDuration) {
            sound.playFromPositionAsync(0);
          } else {
            sound.playAsync();
          }
        }
      } else {
        // const sound = new Audio.Sound();
        const { sound: sound, status } = await Audio.Sound.createAsync(
          { uri },
          {},
          updateScreenForSoundStatus
        );
        setSound(sound);
        setStatus(status);
        sound.playAsync();
      }
    } catch (error) {
      // An error occurred!
      console.log(error);
    }
  };
  const playPause = () => {
    if (sound != null) {
      if (isPlaying) {
        sound.pauseAsync();
      } else {
        sound.playAsync();
      }
    }
  };
  const onStopPressed = () => {
    if (sound != null) {
      sound.stopAsync();
    }
  };
  const updateScreenForSoundStatus = (status) => {
    if (status.isLoaded) {
      setSoundDuration(status.durationMillis ?? null);
      setSoundPosition(status.positionMillis);
      setShouldPlay(status.shouldPlay);
      setIsPlaying(status.isPlaying);
      setIsPlaybackAllowed(true);
    } else {
      setSoundDuration(null);
      setSoundPosition(null);
      setIsPlaybackAllowed(true);
    }
    if (status.error) {
      console.log(`FATAL PLAYER ERROR: ${status.error}`);
    }
  };
  const getPlaybackTimestamp = () => {
    if (sound != null && soundPosition != null && soundDuration != null) {
      return `${getMMSSFromMillis(soundPosition)} / ${getMMSSFromMillis(
        soundDuration
      )}`;
    }
    return "";
  };
  const onSeekSliderValueChange = (value) => {
    if (sound != null && !isSeeking) {
      setIsSeeking(true);
      setShouldPlayAtEndOfSeek(shouldPlay);
      sound.pauseAsync();
    }
  };

  const onSeekSliderSlidingComplete = async (value) => {
    if (sound != null) {
      setIsSeeking(false);
      const seekPosition = value * (soundDuration || 0);
      if (shouldPlayAtEndOfSeek) {
        sound.playFromPositionAsync(seekPosition);
      } else {
        sound.setPositionAsync(seekPosition);
      }
    }
  };

  const getSeekSliderPosition = () => {
    if (sound != null && soundPosition != null && soundDuration != null) {
      return soundPosition / soundDuration;
    }
    return 0;
  };
  const getMMSSFromMillis = (millis) => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  };

  return (
    <>
      <View style={{ flexDirection: "row" ,alignItems:'center'}}>
      {isPlaying ? (
          <TouchableOpacity onPress={() => playAudio()}>
            <Ionicons name="volume-medium" size={40} color="#40AA40" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => playAudio()}>
            <Ionicons name="volume-medium" size={40} color="#8f8f8f" />
          </TouchableOpacity>
        )}
        {props.uri ? (
          <View>
            {/* <Slider
                  style={{
                    alignSelf: "stretch",
                  }}
                  // trackImage={Icons.TRACK_1.module}
                  // thumbImage={Icons.THUMB_1.module}
                  value={getSeekSliderPosition()}
                  onValueChange={onSeekSliderValueChange}
                  onSlidingComplete={onSeekSliderSlidingComplete}
                  disabled={false}
                /> */}
            {/* <Text style={{textAlign:'center',color:(isPlaying?"#40AA40":"#8f8f8f")}}>{getPlaybackTimestamp()}</Text> */}
          </View>
        ) : (
          <></>
        )}

        
      </View>
    </>
  );
};

export default Player;

const styles = StyleSheet.create({});
