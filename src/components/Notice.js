import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native-web';
import {Link} from "react-router-dom";

export class Notice extends React.Component {

  state = {
    id: 1,
    vote: '<3',
    votes: this.props.votes,
    author: 'author',
    createdAt: 'canviar',
    comments: 0,
    liked: false,
    user: {
      id: 0,
      username: ''
    }
  }

  incrementId = () => {
    this.setState(prevState => ({id: prevState.id + 1}))
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



  render() {
    return (
      <View>
        <h1 style={{fontFamily: 'Verdana, Geneva, sans-serif', fontSize: 20}}>{this.props.title}</h1>
        <View style={styles.contentView}>
          <TouchableOpacity
              onPress={() => this.likeDislike()}>
                  <Text style={styles.vote}> {this.state.vote} </Text>
          </TouchableOpacity>
          <Text style={styles.subtext}>Votes: {this.state.votes} | </Text>
          <Link to={{pathname:`/users/${this.props.user_id}`}}> <Text  style={styles.subtext}> Created by: {this.props.author}</Text></Link>
          <Text style={styles.subtext}> | Created at: {this.props.createdAt} | </Text>
          <TouchableOpacity>
                  <Link to={{pathname:`/comments/${this.props.id}`}}> <Text  style={styles.subtext}> {this.props.comments.length} comments  </Text></Link>
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
  display: 'flex',
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
