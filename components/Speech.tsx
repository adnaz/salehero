import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  Vibration,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
// import i18n from "../config/Translation";
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";

const Speech = ({ answer, setTextFromUser, matchingText }) => {
  const [results, setResults] = useState([] as string[]);
  const [isListening, setIsListening] = useState(false);
  const animated = useRef(new Animated.Value(1)).current;
  const opacityA = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    function onSpeechResults(e: SpeechResultsEvent) {
      // setResults(e.value ?? []);
      setTextFromUser(e.value[0]);
    }
    function onSpeechError(e: SpeechErrorEvent) {
      console.error(e);
    }
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    return function cleanup() {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  async function toggleListening() {
    try {
      if (isListening) {
        await Voice.stop();
        setIsListening(false);
      } else {
        setResults([]);
        await Voice.start("en-US");
        setIsListening(true);
      }
    } catch (e) {
      console.error(e);
    }
  }
  const startRecord = () => {
    // answer();
    Vibration.vibrate(500);
    toggleListening();
    runAnimation();
  };

  const stopRecord = () => {
    Vibration.vibrate(500);
    toggleListening();
    stopAnimation();
    setTimeout(() => {
      matchingText();
    }, 1000);
  };
  const runAnimation = () => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(animated, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(opacityA, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
      { iterations: 60 }
    ).start();
  };
  const stopAnimation = () => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(animated, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(opacityA, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).stop();
    animated.setValue(1);
    opacityA.setValue(1);
  };

  return (
    <>
      <View style={styles.attachment}>
        <Pressable
          onPressIn={startRecord}
          onPressOut={stopRecord}
          style={styles.recordcontainer}
        >
          <View style={styles.record}>
            <Animated.View
              style={{
                width: 100,
                height: 100,
                borderRadius: 25,
                borderWidth: 2,
                borderColor: "#40AA40",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "black",
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 1,
                // elevation: 2,
                opacity: opacityA,
                transform: [
                  {
                    scale: animated,
                  },
                ],
              }}
            >
              <Ionicons name="ios-mic" size={40} color="#40AA40" />
            </Animated.View>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default Speech;

const styles = StyleSheet.create({
  deleteRecording: {
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
  },
  top: {
    fontSize: 20,
    backgroundColor: "#b3b1af",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexShrink: 1,
    paddingHorizontal: 10,
  },

  input: {
    backgroundColor: "#ffffff",
    fontSize: 20,
    alignItems: "flex-start",
    alignContent: "flex-start",
    textAlignVertical: "top",
    padding: 5,
    flex: 1,
  },
  attachment: {
    minHeight: 100,
    // backgroundColor: "#c9ffc9",
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
    // alignItems:'center'
  },
  recordcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
    paddingHorizontal: 10,
  },
  imageupload: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "white",
  },
  next: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "#40AA40",
    height: 75,
  },
  record: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",

    // backgroundColor:'red'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
