import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Intro from './screens/Intro';
import { useStore } from './state/Store';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [done, setDone] = useState(false)
  const {user,addPoints}=useStore();
  const _done = () =>{
    setDone(true)
  }

  if (!isLoadingComplete) {
    return null;
  } else if(!done){
    return <Intro  onDone={_done}/>
  }else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
