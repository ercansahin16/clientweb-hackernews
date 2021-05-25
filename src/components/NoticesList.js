import React from "react";
import {Notice} from './Notice';

export class NoticesList extends React.Component {

  state = {
    loading: true,
    notices: []
  };

  async componentDidMount(){
    const url = "https://project-asw.herokuapp.com/notices.json";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({notices: data});
    console.log(data);
  }

  render() {
    return (
        <ul style={{backgroundColor: '#dfeff1'}}>
        {this.state.notices.map((notice) => (
          <Notice
            title={notice.title}
          />
        ))}
        </ul>
    );
  }
}
