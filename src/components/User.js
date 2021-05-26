import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native-web';
import {Link} from "react-router-dom";
import '../stylesheets/form.css';

export class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount(){
    const id = window.location.pathname.replace('/users/','');
    const url = `https://project-asw.herokuapp.com/users/${id}.json`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({user: data});
    console.log(data);
  }

  handleChange(event) {
    const name = event.target.name;
    console.log(event.target.value);
    let newUser = this.state.user;
    if (name == "username") newUser.username = event.target.value;
    else if (name == "about") newUser.about = event.target.value;
    this.setState({user: newUser});
    console.log(this.state.user.username);
  }

  handleSubmit(event) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': 'p3ggo4igayia', 'Accept': 'application/json' },
        body: JSON.stringify({user: { username: this.state.user.username, about: this.state.user.about }})
    };
    fetch(`https://project-asw.herokuapp.com/users/${this.state.user.id}`, requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type').includes('application/json');
            const data = isJson && await response.json();

            console.log(response);

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
        });
        event.preventDefault();
  }

  render() {

    if (this.state.user.id == 1) {
      return (
          <ul style={{backgroundColor: '#dfeff1'}}>
              <View style={styles.paddings}>
                  <h1 style={{fontFamily: 'Verdana, Geneva, sans-serif', fontSize: 20}}>{this.state.user.username}</h1>
                  <Text> {this.state.user.about} </Text>
                  <form onSubmit={this.handleSubmit}>
                  <div class="row">
                  <input type="text" name="username" value={this.state.user.username} onChange={this.handleChange} placeholder="Write your username..." />
                  </div>
                  <div class="row">
                    <textarea name="about" value={this.state.user.about} onChange={this.handleChange} placeholder="Write something about you..."></textarea>
                    <input type="submit" value="Update" />
                  </div>
                  </form>
                    <br></br>
                  <View style={styles.contentView}>
                      <Text style={styles.subtext}>Email: {this.state.user.email} | Created at: {this.state.user.created_at}</Text>
                  </View>
                  <View style={styles.contentView}>
                      <Link to={{pathname:`/threads/${this.state.user.id}`}}> <Text  style={styles.subtext}>comments </Text></Link>
                      <Link to={{pathname:`/submitted/${this.state.user.id}`}}> <Text  style={styles.subtext}>| submitted posts</Text></Link>
                  </View>
              </View>
          </ul>
      )}
    else {
      return (
        <ul style={{backgroundColor: '#dfeff1'}}>
            <View style={styles.paddings}>
                <h1 style={{fontFamily: 'Verdana, Geneva, sans-serif', fontSize: 20}}>{this.state.user.username}</h1>
                <Text> {this.state.user.about} </Text>
                <View style={styles.contentView}>
                    <Text style={styles.subtext}>Email: {this.state.user.email} | Created at: {this.state.user.created_at}</Text>
                </View>
                <View style={styles.contentView}>
                      <Link to={{pathname:`/threads/${this.state.user.id}`}}> <Text  style={styles.subtext}>comments </Text></Link>
                      <Link to={{pathname:`/submitted/${this.state.user.id}`}}> <Text  style={styles.subtext}>| submitted posts</Text></Link>
                  </View>
            </View>
        </ul>
    )}
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
