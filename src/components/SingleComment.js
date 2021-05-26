import React from "react";
import {Notice} from './Notice';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native-web';

export class SingleComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: {
        id: 1,
        title: '',
        author: '',
        url: '',
        content: '',
        votes: 1,
        created_at: '',
        updated_at: '',
        comments: [],
      }
    };

  }

  async componentDidMount(){
    const url = `https://project-asw.herokuapp.com/comments/${this.props.id}.json`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.comment_ids);

  }

  render() {
    const count = 0;
    return (
      <View>
        <h1 style={{fontFamily: 'Verdana, Geneva, sans-serif', fontSize: 20}}>{this.props.text}</h1>
        <View style={styles.contentView}>
          <Text style={styles.subtext}>Votes:0 | Created by: {this.props.author} | Created at: </Text>
          <br></br>
        </View>
      </View>
    );
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
