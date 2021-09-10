import React from 'react'
import { View, Text ,Image} from 'react-native'
import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
const data = [
    {
      key: 'one',
      // : 'Title 1',
      title: 'This is the version 1.0 of SalesHero, the goal of this application is to help you practise some of the most common situtations salespeople find themselves in.\
We have created 10 scenarios for you to practice, the idea is to use your voice to practise the responses.\
We know that there are other possible responses to these scenarios, however for the purpose of this application we have decided to focus on helping build muscle memory with certain responses so that the salespeople can focus on their delivery.',
      image: require('../assets/5568.png'), 
      backgroundColor: '#000000',
    },
    {
      key: 'two',
      title: 'Title 2',
      text: 'Other cool stuff',
      image: require('../assets/20943477.jpg'),
      backgroundColor: '#ffffff',
    },
    {
      key: 'three',
      title: 'Rocket guy',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    //   image: require('../assets/3.jpg'),
      backgroundColor: '#f5f5f5',
    }
  ];
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
  type Item = typeof data[0];
  const _keyExtractor = (item: Item) => item.title;
const Intro = ({onDone}) => {
    return (
        <AppIntroSlider
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        data={data}
        onDone={onDone}
      />
    )
}

export default Intro

const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#4a8b96',
    },
    image: {
      width: 320,
      height: 320,
      marginVertical: 32,
    },
    text: {
      color: 'white',
      textAlign: 'center',
    },
    title: {
      fontSize: 22,
      color: 'white',
      textAlign: 'center',
    },
  });