import * as React from "react";
import { StyleSheet, TouchableOpacity,FlatList } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { EvilIcons } from "@expo/vector-icons";
import Box from "../components/Box";
import { Value } from "react-native-reanimated";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import { useStore } from "../state/Store";
interface Course {
  title : string;
  description : string;
  time :string;
  image?:string;
  score: number;
}
const courses : Course[] = [
  {
  title:"course 1",
  description:'description 1',
  time:'100 min',
  score:100
},
{
  title:"course 2",
  description:'description course 2',
  time:'100 min',
  score:2000
},
]
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const navigate = () =>{

    navigation.navigate('Senarios')
  }
  const {user}= useStore();
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontFamily: "Roboto_500Medium", fontSize: 20 }}>
          Courses 
        </Text>
      </View>
      {/* {
        courses.map((value)=>{
         return <Box title={value.title} description={value.description} time={value.time}/>
        })
      } */}
      <FlatList
          data={courses}
          renderItem={({item})=>{
            return <Box navigate={navigate} title={item.title} description={item.description} time={item.time} userPoints={user.points} points={item.score}/>
          }}
          keyExtractor={(_,index)=>index.toString()}
          style={{alignSelf:'stretch'}}
          showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor:"#e1ebfa",
    // justifyContent: 'center',
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  title: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    padding: 10,
  },
  box: {
    alignSelf: "stretch",
    justifyContent:'space-around',
    height: 150,
    margin: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 30,
    shadowColor: "#ebf3ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  boxTitle:{
    fontFamily:'Roboto_700Bold'
  }
});
