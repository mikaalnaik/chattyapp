import React, {
  Component
} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


// import {messages} from '../build/messages';
// const messages = require('../build/messages.json')

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    },
    {
      username: "Mikaal",
      content: "Howdy Folks!"
    }
  ]
}
  }


  render() {
    return (
      <div >
      <MessageList messages={this.state.messages} />
      <ChatBar name={this.state.currentUser.name}/>
      </div>


    );
  }
}
export default App;
