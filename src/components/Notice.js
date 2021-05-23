import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native-web';

export class Notice extends React.Component {

  state = {
    votes: 0,
    author: 'author',
    createdAt: 'canviar',
    comments: 0,
    liked: false
  }

  likeDislike = () => {
    //if(this.state.votes === 25) this.setState(prevState => ({minutes: 24}))
    if(!this.state.liked) {
      this.setState(prevState => ({votes: prevState.votes + 1}))
      this.setState(prevState => ({liked: true}))
    }
    else {
      this.setState(prevState => ({votes: prevState.votes - 1}))
      this.setState(prevState => ({liked: false}))
    }
  }

  gocomments = () => {
    return
  }

  render() {
    return (
      <View>
        <h1>{this.props.title}</h1>
        <TouchableOpacity
            onPress={() => this.likeDislike()}>
                <Text>Vote</Text>
        </TouchableOpacity>
        <Text>Votes: {this.state.votes} </Text>
        <Text>Created by: {this.state.author} </Text>
        <Text>Created at: {this.state.createdAt} </Text>
        <TouchableOpacity
            onPress={() => this.gocomments()}>
                <Text>{this.state.comments} comments</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
