import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native-web';
import {NoticesList} from './components/NoticesList.js'
import {NewestList} from './components/Newest.js'
import {AskList} from './components/Ask.js'
import {Index} from './components/index.js'

export function App(){

  return(
    <View>
      <Index />
      <NoticesList />
      <Text  style={{fontSize: 30, color: 'red'}} >HOLAAAAA NEWESSTTTTTT</Text>
      <NewestList />
      <Text  style={{fontSize: 30, color: 'red'}} >HOLAAAAA ASKKKKKK</Text>
      <AskList />
    </View>
  );
}
