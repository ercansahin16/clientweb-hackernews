import React from "react";
import {Notice} from './Notice';

export class LikedNoticesList extends React.Component {

  state = {
    errorMessage: '',
    loading: true,
    notices: [],
  };

  async componentDidMount(){
    const id = window.location.pathname.replace('/likedNotices/','');
    const url = `https://project-asw.herokuapp.com/upvoted/${id}.json`;
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

            this.setState({notices: data});
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
        });

    //const response = await fetch(url, requestOptions);
    //const data = await response.json();
    //this.setState({notices: data});
    //console.log(data);
  }

  render() {
    return (
      <ul style={{backgroundColor: '#dfeff1'}}>
      { this.state.errorMessage && <h3 className="error"> { this.state.errorMessage } </h3> }
      <br></br>
      {this.state.notices.map((notice) => (
        <Notice
        title={notice.title}
        id={notice.id}
        votes={notice.votes}
        author={notice.author}
        user_id={notice.user.id}
        createdAt={notice.created_at}
        comments={notice.comments}
        />
      ))}
      </ul>
    );
  }
}
