import React, { useRef } from 'react'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import { Entypo } from '@expo/vector-icons'; 
 type ScrollViewRef = ScrollView & {
    flashScrollIndicators: () => void;
};
const TextToRead = ({whatToSay,textFromUser}) => {
    const scrollViewRef = useRef<ScrollViewRef | null>(null);
    return (
        <ScrollView 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
              style={{minHeight:100,maxHeight:250,flexWrap: 'wrap',paddingHorizontal:10,borderColor:'black',borderWidth:0.5,margin:10,borderRadius:20,padding:5}}>
            {/* <Text style={{fontFamily:'Roboto_900Black',fontSize:20,color:'#404040'  }}>Text to Read:</Text> */}
            <Text style={{fontFamily:'Roboto_900Black',fontSize:20,color:'black' ,textAlign: 'center', }}><Text><Entypo name="dot-single" size={30} color="purple" /></Text>{whatToSay}</Text>
            <Text style={{fontFamily:'Roboto_900Black',fontSize:25,color:'#1c6b18',textAlign: 'center', }}>{textFromUser}</Text>
        </ScrollView>
    )
}

export default TextToRead

const styles = StyleSheet.create({})
