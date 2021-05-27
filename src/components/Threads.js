import React from "react";
import {SingleComment} from './SingleComment';

export class Threads extends React.Component {

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
    const id = window.location.pathname.replace('/threads/','');
    console.log(`id = ${id}`);
    const url = `https://project-asw.herokuapp.com/threads/${id}.json`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({comments: data});
    console.log(data);
  }

  render() {
    return (
        <ul style={{backgroundColor: '#dfeff1'}}>
        <br></br>
        {this.state.comments.map((comment) => (
          <SingleComment
            text={comment.text}
            author={comment.author}
            commentId={comment.id}
            noticetitle={comment.notice_id}
            noticeId={comment.notice_id}
          />
        ))}
        </ul>
    );
  }
}
