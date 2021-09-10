import React, { useState, useCallback, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GiftedChat, Bubble, Send ,} from "react-native-gifted-chat";
import Speech from "../../components/Speech";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Player from "../../components/Player";
import TextToRead from "../../components/TextToRead";
import { getData } from "../../includes/fetch";
import { editDistance } from "../../includes/matchingText";
import { RootStackScreenProps } from "../../types";
import { useStore } from "../../state/Store";
const QuestionTypeOne = ({
  navigation,
  route,
}: RootStackScreenProps<"Senario">) => {
  const [messages, setMessages] = useState([]);
  const [index, setIndex] = useState(0);
  const [whatToSay, setWhatToSay] = useState("");
  const [finished, setFinished] = useState(false);
  const [data, setData] = useState(null);
  const [hideInput, setHideInput] = useState(true);
  const [textFromUser, setTextFromUser] = useState("");
  const {addPoints,persistSenarios,persistUser}= useStore();
  useEffect(() => {
    console.log(route.params.id)
    getData(
      "http://34.93.142.206:7000/api/get-courses-scenario/?course_id=" +
        route.params.id
    ).then((data) => {
      setData(data.all_scenarios);
      // console.log(data);
    });
  }, []);
  useEffect(() => {
    if (data) {
      nextSenario();
    }
  }, [index, data]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  const nextSenario = () => {
    onSend([
      {
        _id: data[index].id + index,
        text: data[index]?.Prospect,
        createdAt: new Date(),
        audio: data[index].audio_uri,
        user: {
          _id: 2,
          name: "prospect",
          avatar: "https://placeimg.com/140/140/people",
        },
      },
    ]);
    if (index + 1 == data.length && !data[index]?.User) {
      setFinished(true);
      addPoints(route.params.points,route.params.id);
      persistSenarios();
      persistUser();

    }
    setWhatToSay(data[index].User);
    setTextFromUser("read the answer while pressing the mic");
  };
  const answer = () => {
    onSend([
      {
        _id: data[index].id + index + 1,
        text: data[index]?.User,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "user",
        },
      },
    ]);
    if (index + 1 == data.length) {
      setFinished(true);
      addPoints(route.params.points,route.params.id);
      persistSenarios();
      persistUser();
    } else {
      setIndex(index + 1);
    }
  };
  const scrollToBottomComponent = () => {
    return <AntDesign name="circledowno" size={24} color="black" />;
  };
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ justifyContent: "center" }}>
          <Ionicons
            name="send"
            size={24}
            color="#0084ff"
            style={{ margin: 10 }}
          />
        </View>
      </Send>
    );
  };
  const renderAvatar = () => {
    return (
      <Image
        style={{ height: 150, width: 150 }}
        source={require("../../includes/avatar.png")}
      />
    );
  };
  const renderMessage = (props) => {
  let autoPlay:boolean = false
    if(props.currentMessage.user._id==1){
      return <Bubble {...props} wrapperStyle={{
        right: {
          backgroundColor: '#447eb8',
        },
      }}
      textStyle={{
        right: {
          fontFamily: "Roboto_900Black",
                fontSize: 20,
        },
      }} />
    }
    let current = messages[0]._id == props.currentMessage._id ;
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        { current ? (
          <Image
          style={{ height: 150, width: 150 }}
          source={require("../../includes/avatar.png")}
          />
          ) : (
            <Image
            style={{ height: 50, width: 50 }}
            source={require("../../includes/avatar.png")}
            />
            )}

        <Player uri={props.currentMessage.audio} autoPlay={current && autoPlay}/>
        <Text
          style={{
            fontFamily: "Roboto_900Black",
            fontSize: 20,
            color: "#404040",
            flexShrink: 1,
          }}
          >
          {props.currentMessage.text}
        </Text>
      </View>
    );
  };
  const matchingText = (
    s1 = whatToSay.toLowerCase(),
    s2 = textFromUser.toLowerCase()
  ) => {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    let result = (longerLength - editDistance(longer, shorter)) / longerLength;
    console.log(result);
    if (result > 0.6) {
      answer();
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          renderMessage={renderMessage}
          // renderMessageAudio={(props) => (
          //   <Player uri={props.currentMessage.audio} />
          // )}
          // renderAvatar={renderAvatar}
          // renderBubble={renderBubble}
          scrollToBottomComponent={scrollToBottomComponent}
          renderSend={renderSend}
          alwaysShowSend
          scrollToBottom
          renderInputToolbar={hideInput ? () => null : undefined}
          // isTyping
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {finished ? (
          <>
            <Text
              style={{
                fontFamily: "Roboto_900Black",
                fontSize: 20,
                color: "#404040",
                textAlign: "center",
              }}
            >
              Congrats you finished this stage 🎉🎉🎉
            </Text>
            <Text
              style={{
                fontFamily: "Roboto_900Black",
                fontSize: 20,
                color: "#404040",
                textAlign: "center",
              }}
            >
              You can try the next scenario
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
  <Text style={{color: 'blue',fontFamily: "Roboto_900Black",
                fontSize: 20,}}>
    Go back
  </Text>
</TouchableOpacity>

          </>
        ) : (
          <>
            <TextToRead textFromUser={textFromUser} whatToSay={whatToSay} />
            <Speech
              setTextFromUser={setTextFromUser}
              answer={answer}
              matchingText={matchingText}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default QuestionTypeOne;

const styles = StyleSheet.create({});
