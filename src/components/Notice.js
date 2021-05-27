import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native-web';
import {Link} from "react-router-dom";

export class Notice extends React.Component {

  state = {
    id: 1,
    vote: '<3',
    votes: this.props.votes,
    author: 'author',
    url: '',
    createdAt: 'canviar',
    comments: 0,
    liked: false,
    user: {
      id: 0,
      username: ''
    },
    errorMessage: ''
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
    window.location.reload(false);
  }

  async componentDidMount(){
    const requestOptions = {
        headers: { 'Content-Type': 'application/json', 'X-API-Key': 'p3ggo4igayia', 'Accept': 'application/json'}
    };
    const url = `https://project-asw.herokuapp.com/upvoted/1.json`;
    const response = await fetch(url,requestOptions);
    const data = await response.json();
    console.log(data);
    data.forEach((item,index) => {
      if (item.id==this.props.id) this.setState({liked: true});
    });
    if(!this.state.liked) {
      this.setState(prevState => ({vote: '<3'}))
    }
    else {
      this.setState(prevState => ({vote: '</3'}))
    }
  }

  handlePutLike = () => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': 'p3ggo4igayia', 'Accept': 'application/json'},
    };
    let likedpost = 'like'
    if (this.state.liked) likedpost = 'dislike'

    fetch(`https://project-asw.herokuapp.com/notices/${this.props.id}/${likedpost}`, requestOptions)
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

  render() {
    return (
      <View>
      { this.props.url!=null && <a href={`${this.props.url}`}><h1 style={{fontFamily: 'Verdana, Geneva, sans-serif', fontSize: 20}}>{this.props.title}</h1></a> }
      { this.props.url==null && <h1 style={{fontFamily: 'Verdana, Geneva, sans-serif', fontSize: 20}}>{this.props.title}</h1> }
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
