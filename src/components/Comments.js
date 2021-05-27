import React from "react";
import {Notice} from './Notice';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {SingleComment} from './SingleComment';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native-web';

export class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notice: {
        id: 1,
        title: '',
        author: '',
        url: '',
        content: '',
        votes: 1,
        created_at: '',
        updated_at: '',
        comments: [],
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
        headers: { 'Content-Type': 'application/json', 'X-API-Key': 'p3ggo4igayia' },
        body: JSON.stringify({ text: this.state.content, notice_id: this.state.notice.id, commentable_id: this.state.notice.id, commentable_type: "Notice" })
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

            window.location.reload(false);

        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
        });
        event.preventDefault();
  }



  async componentDidMount(){
    const id = window.location.pathname.replace('/comments/','');
    console.log(`id = ${id}`);
    const url = `https://project-asw.herokuapp.com/notices/${id}.json`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({notice: data});
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
        <h1 style={{fontFamily: 'Verdana, Geneva, sans-serif', fontSize: 20}}>{this.state.notice.title}</h1>
        <br></br>
        <h1 style={{fontFamily: 'Verdana, Geneva, sans-serif', fontSize: 13}}>{this.state.notice.content}</h1>
        <View style={styles.contentView}>
          <TouchableOpacity
              onPress={() => this.likeDislike()}>
                  <Text style={styles.vote}> {this.state.vote} </Text>
          </TouchableOpacity>
          <Text style={styles.subtext}>Votes: {this.state.notice.votes} | Created by: {this.state.notice.author} | Created at: {this.state.notice.created_at} </Text>
          <br></br>
        </View>
        <br></br>

        <form onSubmit={this.handleSubmit}>
          <textarea name="content" value={this.state.content} onChange={this.handleChange} placeholder="Write a comment.."></textarea>
          <input type="submit" value="Submit" />
        </form>

        {this.state.notice.comments.map((comment) => (
          <SingleComment
            text={comment.text}
            author={comment.author}
            commentId={comment.id}
            noticetitle={comment.notice_id}
            noticeId={comment.notice_id}
          />
        ))}
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
