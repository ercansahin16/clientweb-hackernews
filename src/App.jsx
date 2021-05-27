import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native-web';
import {NoticesList} from './components/NoticesList.js'
import {NewestList} from './components/Newest.js'
import {AskList} from './components/Ask.js'
import {SubmittedList} from './components/Submitted.js'
import {LikedCommentsList} from './components/LikedComments.js'
import {LikedNoticesList} from './components/LikedNotices.js'
import {User} from './components/User.js'
import {Navigation} from './components/Navigation.js'
import {Submit} from './components/Submit.js'
import {Threads} from './components/Threads.js';
import { Route, Switch } from 'react-router-dom';
import {Comments} from './components/Comments.js';
import {ReplyForm} from './components/ReplyForm.js';


export class App extends React.Component {

  render() {
    return(
      <div style = {{minHeight: "100vh",backgroundColor: '#dfeff1'}} className="App">
        <Navigation/>
        <Switch>
           <Route path='/notices' component={NoticesList}/>
           <Route path='/newest' component={NewestList}/>
           <Route path='/ask' component={AskList}/>
           <Route path='/submitted' component={SubmittedList}/>
           <Route path='/users' component={User}/>
           <Route path='/comments' component={Comments}/>
           <Route path='/likedComments' component={LikedCommentsList}/>
           <Route path='/likedNotices' component={LikedNoticesList}/>
           <Route path='/submit' component={Submit}/>
           <Route path='/threads' component={Threads}/>
           <Route path='/reply' component={ReplyForm}/>
           <Route path='/' component={NoticesList}/>
        </Switch>
      </div>
    );
  }

}
