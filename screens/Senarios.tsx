import React ,{useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Box from '../components/Box'
import { senariosUri } from '../constants/Uris'
import { getData } from '../includes/fetch'
import { useStore } from '../state/Store'
import { RootStackScreenProps } from '../types'
interface Senario {
    title : string;
    description : string;
    id: number;
    time :string;
    image?:string;
    minPointsToOpen?: number;
  }
  
const Senarios = ({navigation}:RootStackScreenProps<'Senarios'>) => {
  const [data, setData] = useState<Senario[] |  null>(null)
  const {user} = useStore();
  useEffect(() => {
    getData(senariosUri).then((data)=>{
      // console.log(data)
      setData(data.all_course)
   })
  }, [])
    const navigate = (id,points) =>{
        navigation.navigate("Senario",{id,points})
    }
    return (
        <View style={{alignItems:'center',backgroundColor:'white',flex:1}}> 

            <FlatList
          data={data}
          renderItem={({item})=>{
            return <Box navigate={()=>navigate(item.id,item.minPointsToOpen)} title={item.title} userPoints={user.points} points={item.minPointsToOpen} description={item.description} time={item.time}/>
          }}
          keyExtractor={(_,index)=>index.toString()}
        //   style={{alignSelf:'stretch'}}
          showsVerticalScrollIndicator={false}
          // numColumns={2}
          // columnWrapperStyle={{justifyContent:'space-around', }}
      />
        </View>
    )
}

export default Senarios

const styles = StyleSheet.create({})
