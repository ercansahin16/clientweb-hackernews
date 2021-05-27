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

  async componentDidMount(){
    const url = `https://project-asw.herokuapp.com/comments/${this.props.id}.json`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({comment: data});
    console.log(data.comment_ids);
    if (data.comment_ids){
      const repliesAux = data.comment_ids.map(async (reply) =>  {
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
          <Text style={styles.subtext}>Votes: {this.state.votes} | Commented by: {this.props.author} | on <a href={`/reply/${this.props.link}`}>{this.props.noticetitle}</a> | <a href={`/reply/${this.state.comment.id}`}>Reply</a></Text>
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
