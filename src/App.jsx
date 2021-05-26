import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native-web';
import {NoticesList} from './components/NoticesList.js'
import {NewestList} from './components/Newest.js'
import {AskList} from './components/Ask.js'
import {Navigation} from './components/Navigation.js'
import {Submit} from './components/Submit.js'
import { Route, Switch } from 'react-router-dom';

export class App extends React.Component {

  render() {
    return(
      <div style = {{height:"100vh", backgroundColor: '#dfeff1'}} className="App">
        <Navigation/>
        <Switch>
           <Route path='/notices' component={NoticesList}/>
           <Route path='/newest' component={NewestList}/>
           <Route path='/ask' component={AskList}/>
           <Route path='/submit' component={Submit}/>
        </Switch>
      </div>
    );
  }

}
