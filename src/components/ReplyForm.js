import React from "react";
import {Notice} from './Notice';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {SingleComment} from './SingleComment';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native-web';

export class ReplyForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: {
        id: 1,
        text: "",
        author: "",
        votes: 0,
        notice_id: 0,
        comment_ids: []
      },
      content: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleSubmit(event) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': 'p3ggo4igayia', 'Accept': 'application/json'},
        body: JSON.stringify({ text: this.state.content, notice_id: this.state.comment.notice_id, commentable_id: this.state.comment.id, commentable_type: "Comment" })
    };
    fetch('https://project-asw.herokuapp.com/comments.json', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type').includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            this.props.history.push(`/comments/${this.state.comment.notice_id}`);

        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
        });
        event.preventDefault();
  }



  async componentDidMount(){
    const id = window.location.pathname.replace('/reply/','');
    console.log(`id = ${id}`);
    const url = `https://project-asw.herokuapp.com/comments/${id}.json`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({comment: data});
    console.log(data);
  }

  likeDislike = () => {
    if(!this.state.notice.liked) {
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
    const count = 0;
    return (
      <View style={styles.paddings}>
        <h1 style={{fontFamily: 'Verdana, Geneva, sans-serif', fontSize: 20}}>{this.state.comment.text}</h1>
        <View>
          <Text style={styles.subtext}>Votes: {this.state.comment.votes} | Created by: {this.state.comment.author}</Text>
          <br></br>
        </View>
        <br></br>

        <form onSubmit={this.handleSubmit}>
          <textarea name="content" value={this.state.content} onChange={this.handleChange} placeholder="Write a reply.."></textarea>
          <input type="submit" value="Submit" />
        </form>

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
},
paddings: {
  padding: 30
}
});
