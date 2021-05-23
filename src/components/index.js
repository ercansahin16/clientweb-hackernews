import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native-web';
import {NoticesList} from './NoticesList.js'

export class Index extends React.Component {
  gonotices = () => {
      return (<NoticesList />)
  }

  gonewest = () => {
    return
  }

  gothreads = () => {
    return
  }

  goask = () => {
    return
  }

  gosubmit = () => {
    return
  }

  render () {
    return(
      <View>
        <TouchableOpacity
            onPress={() => this.gonotices()}>
                <Text>welcome</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => this.gonewest()}>
                <Text>newest</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => this.gothreads()}>
                <Text>threads</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => this.goask()}>
                <Text>ask</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => this.gosubmit()}>
                <Text>submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
