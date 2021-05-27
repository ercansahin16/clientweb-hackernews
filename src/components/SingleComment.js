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
      },
      vote: '<3',
      votes: this.props.votes,
      liked: false,
      replies: []
    };

  }

  likeDislike = () => {
    if(!this.state.liked) {
      this.setState(prevState => ({votes: prevState.votes + 1}))
      this.setState(prevState => ({liked: true}));
      this.setState(prevState => ({vote: '</3'}));
    }
    else {
      this.setState(prevState => ({votes: prevState.votes - 1}))
      this.setState(prevState => ({liked: false}));
      this.setState(prevState => ({vote: '<3'}));
    }
    this.handlePutLike();
  }

  handlePutLike = () => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': 'p3ggo4igayia', 'Accept': 'application/json'},
    };
    let likedpost = 'like'
    if (this.state.liked) likedpost = 'dislike'

    fetch(`https://project-asw.herokuapp.com/comments/${this.props.id}/${likedpost}`, requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type').includes('application/json');
            const data = isJson && await response.json();

            console.log(response)

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            //this.setState(prevState => ({votes: data.votes}))

        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
  }

  async componentDidMount(){
    const requestOptions = {
        headers: { 'Content-Type': 'application/json', 'X-API-Key': 'p3ggo4igayia', 'Accept': 'application/json'}
    };
    const url = `https://project-asw.herokuapp.com/upvotedcomments/1.json`;
    const response = await fetch(url,requestOptions);
    const data = await response.json();
    data.forEach((item,index) => {
      if (item.id==this.props.id) this.setState({liked: true});
    });
    if(!this.state.liked) {
      this.setState(prevState => ({vote: '<3'}))
    }
    else {
      this.setState(prevState => ({vote: '</3'}))
    }

    const url2 = `https://project-asw.herokuapp.com/comments/${this.props.id}.json`;
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    this.setState({comment: data2});
    if (data2.comment_ids){
      const repliesAux = data2.comment_ids.map(async (reply) =>  {
        const url = `https://project-asw.herokuapp.com/comments/${reply}.json`;
        const response = await fetch(url);
        const data = await response.json();
        var newArr = this.state.replies;
        newArr.push(data);
        this.setState({replies:newArr});
      });
    }
  }

  render() {
    const count = 0;
    return (
      <View>
        <h1 style={{fontFamily: 'Verdana, Geneva, sans-serif', fontSize: 20}}>{this.props.text}</h1>
        <View style={styles.contentView}>
          <TouchableOpacity
              onPress={() => this.likeDislike()}>
                  <Text style={styles.vote}> {this.state.vote} </Text>
          </TouchableOpacity>
          <Text style={styles.subtext}>Votes: {this.state.votes} | Created by: {this.props.author} | <a href={`/reply/${this.state.comment.id}`}>Reply</a></Text>
          <br></br>
        </View>
        <div style={{marginLeft: 30}}>
          {this.state.replies.map((comment) => (
            <SingleComment
              text={comment.text}
              author={comment.author}
              id={comment.id}
              created_at={comment.created_at}
              votes={comment.votes}
            />
          ))}
        </div>
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
