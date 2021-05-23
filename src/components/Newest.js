import React from "react";
import {Notice} from './Notice';

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
      <ul>
      {this.state.notices.map((notice) => (
        <Notice
          title={notice.title}
        />
      ))}
      </ul>
    );
  }
}
