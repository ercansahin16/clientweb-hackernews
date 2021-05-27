import React from "react";
import {SingleComment} from './SingleComment';

export class LikedCommentsList extends React.Component {

  state = {
    errorMessage: '',
    loading: true,
    comments: [],
  };

  async componentDidMount(){
    const id = window.location.pathname.replace('/likedComments/','');
    console.log(`id = ${id}`);
    const url = `https://project-asw.herokuapp.com/upvotedcomments/${id}.json`;
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': 'p3ggo4igayia', 'Accept': 'application/json' }
    };
    fetch(url, requestOptions)
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

            this.setState({comments: data});
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
        });
  }

  render() {
    return (
      <ul style={{backgroundColor: '#dfeff1'}}>
      { this.state.errorMessage && <h3 className="error"> { this.state.errorMessage } </h3> }
      <br></br>
      {this.state.comments.map((comment) => (
          <SingleComment
            text={comment.text}
            author={comment.author}
          />
        ))}
      </ul>
    );
  }
}
