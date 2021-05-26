import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native-web';

export class User extends React.Component {

  state = {

    comments: [],
      loading: true,
      user: {
        id: 1,
        username: "",
        about: "",
        email: "",
        uid: "",
        provider: "",
        created_at: "",
        updated_at: "",
        url: ""
      }
  }

  async componentDidMount(){
    const id = window.location.pathname.replace('/users/','');
    const url = `https://project-asw.herokuapp.com/users/${id}.json`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({user: data});
    console.log(data);
  }

  render() {
    return (
        <ul style={{backgroundColor: '#dfeff1'}}>
            <View style={styles.paddings}>
                <h1 style={{fontFamily: 'Verdana, Geneva, sans-serif', fontSize: 20}}>{this.state.user.username}</h1>
                <Text> {this.state.user.about} </Text>
                <View style={styles.contentView}>
                    <Text style={styles.subtext}>Email: {this.state.user.email} | Created at: {this.state.user.created_at}</Text>
                    <br></br>
                </View>
            </View>
        </ul>
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
},
paddings: {
  padding: 30
}
});
