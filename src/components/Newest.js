import React from "react";
import {Notice} from './Notice';
import { View } from 'react-native-web';

export class NewestList extends React.Component {

  state = {
    loading: true,
    notices: [],
  };

  async componentDidMount(){
    const url = "https://project-asw.herokuapp.com/newest.json";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({notices: data});
    console.log(data);
  }

  render() {
    return (
      <View style={{backgroundColor: '#dfeff1'}}>

        <ul style={{backgroundColor: '#dfeff1'}}>
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

      </View>
    );
  }
}
