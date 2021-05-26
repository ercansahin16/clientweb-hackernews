import React from "react";
import {Notice} from './Notice';
import '../stylesheets/form.css';

export class Submit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: '',
      content: '',
      errorMessage: ''
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
        body: JSON.stringify({ title: this.state.title, url: this.state.url, content: this.state.content })
    };
    fetch('https://project-asw.herokuapp.com/notices.json', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type').includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            this.props.history.push('/newest');


        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
        });
        event.preventDefault();
  }

  render() {
    return (
      <div class="formContainer">
        <form onSubmit={this.handleSubmit}>
          { this.state.errorMessage && <h3 className="error"> { this.state.errorMessage } </h3> }
          <div class="row">
            <div class="col-25">
              <label for="title">Title</label>
            </div>
            <div class="col-75">
              <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Title of the notice.." />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
            </div>
            <div class="col-75">
              <span>or</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="url">URL</label>
            </div>
            <div class="col-75">
              <input type="text" name="url" value={this.state.url} onChange={this.handleChange} placeholder="URL of the notice.." />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="content">Content</label>
            </div>
            <div class="col-75">
              <textarea name="content" value={this.state.content} onChange={this.handleChange} placeholder="Write something.."></textarea>
            </div>
          </div>
          <div class="row">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
