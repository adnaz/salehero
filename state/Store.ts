import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
export interface IData {
    id: string;
    name: string;
    points: number;

}
interface IState {
    user: IData;
    senarios: Array<number>;
    addPoints: (points: number,senarioId: number) => void;
    setUser: (user: IData) => void;
    getUser: () => void;
    persistUser:() => void;
    getSenarios: () => void;
    persistSenarios:() => void;


}

export const useStore = create<IState>((set,get) => (
    {
        user: { id: '01', name: 'user', points: 100 },
        senarios:[],
        addPoints: (points: number,senarioId: number) => {
            console.log(JSON.stringify(get().senarios))
            console.log(senarioId)
            if(!get().senarios.includes(senarioId)){
                set((state) => ({
                    user: { ...state.user, points: state.user.points + points },
                    // senarios:[...state.senarios,senarioId]
                })
                )
                set((state) => ({
                    senarios:[...state.senarios,senarioId]
                })
                )
            }
          
        },
        setUser: (user) => {
            set(() => ({
                user: { ...user }
            })
            )
        },
        getUser:async ()=>{
            let user = await AsyncStorage.getItem('user');
            set({user:JSON.parse(user)})
        },
        persistUser:()=>{
            AsyncStorage.setItem('user',JSON.stringify(get().user))
        },
        getSenarios:async ()=>{
            let user = await AsyncStorage.getItem('senarios');
            set({senarios:JSON.parse(user)})
            console.log(user)
        },
        persistSenarios:()=>{
            AsyncStorage.setItem('senarios',JSON.stringify(get().senarios))
        }
    }
)
)