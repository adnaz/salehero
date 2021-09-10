import { EvilIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useStore } from '../state/Store'
interface Props {
 title : string;
 description : string;
 time :string;
 navigate? :()=>void;
 points?: number;
 userPoints?:number;
}
const Box = (props : Props ) => {
  const {addPoints,persistUser,getSenarios}=useStore();
  const disabled = props.userPoints<props.points;
  if(disabled){
    return (
      <TouchableOpacity style={styles.boxDisabled} onPress={()=>alert('you need '+ (props.points-props.userPoints) +' points to unlock')}>
      <Text style={styles.boxTitle}>{props.title}</Text>
      <Text style={styles.descriptionTitle}>{props.description}</Text>
      <View style={{ flexDirection: "row" }}>
        <EvilIcons name="clock" size={24} color="black" />
        <Text style={{ fontFamily: "Roboto_300Light" }}>{props.time}</Text>
      </View>
    </TouchableOpacity>
    )
  }
    return (
      //<TouchableOpacity style={styles.box} onPress={()=>getSenarios()}> 
        <TouchableOpacity style={styles.box} onPress={props.navigate}>
        <Text style={styles.boxTitle}>{props.title}</Text>
        <Text style={styles.descriptionTitle}>{props.description}</Text>
        <View style={{ flexDirection: "row" }}>
          <EvilIcons name="clock" size={24} color="black" />
          <Text style={{ fontFamily: "Roboto_300Light" }}>{props.time}</Text>
        </View>
      </TouchableOpacity>
    )
}

export default Box

const styles = StyleSheet.create({
    box: {
        alignSelf: "stretch",
        justifyContent:'space-around',
        height: 150,
        margin: 20,
        padding: 20,
        borderColor: "#0d4985",
        borderRadius: 30,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor:'#71b8ff'
      },
    boxDisabled: {
        alignSelf: "stretch",
        justifyContent:'space-around',
        height: 150,
        margin: 20,
        padding: 20,
        borderColor: "#0d4985",
        borderRadius: 30,
       
        backgroundColor:'grey'
      },
      boxTitle:{
        fontFamily:'Roboto_700Bold',
        color:"white",
        fontSize:30
      },
      descriptionTitle:{
        fontFamily:'Roboto_400Regular',
        color:"white",
        fontSize:20
      }
})
