import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native-web';

export class Notice extends React.Component {

  state = {
    vote: '<3',
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
      this.setState(prevState => ({vote: '</3'}))
    }
    else {
      this.setState(prevState => ({votes: prevState.votes - 1}))
      this.setState(prevState => ({liked: false}))
      this.setState(prevState => ({vote: '<3'}))
    }
  }

  gocomments = () => {
    return
  }

  render() {
    return (
      <View>
        <h1 style={{fontFamily: 'Verdana, Geneva, sans-serif', fontSize: 20}}>{this.props.title}</h1>
        <View style={styles.contentView}>
          <TouchableOpacity
              onPress={() => this.likeDislike()}>
                  <Text style={styles.vote}> {this.state.vote} </Text>
          </TouchableOpacity>
          <Text style={styles.subtext}>Votes: {this.state.votes} | Created by: {this.state.author} | Created at: {this.state.createdAt} </Text>
          <TouchableOpacity
              onPress={() => this.gocomments()}>
                  <Text style={styles.subtext}> {this.state.comments} comments</Text>
          </TouchableOpacity>
          <br></br>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
title: {
  alignItems: 'left',
  fontSize: 40,
  fontWeight: 'bold',
  fontFamily: 'Verdana, Geneva, sans-serif',
},
subtext: {
  fontFamily: 'Verdana, Geneva, sans-serif',
  fontSize:  10,
  color: '#828282',
},
contentView: {
  paddingLeft: 10,
  flex: 1,
  flexDirection:'row',
  flexWrap:'wrap',
},
vote: {
  fontWeight: 'bold',
  fontFamily: 'Verdana, Geneva, sans-serif',
  fontSize:  10,
  color: 'blue',
}
});
