import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
  currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [],
  id: ""
}
  }

  handleUserChange = name => {
    const type = "postNotification";
    const content = `${this.state.currentUser.name} changed their name to ${name}`
    const message = {
      type,
      content
    }
    this.socket.send(JSON.stringify({message}))
    this.setState({currentUser:{name}})
  }

   handleMessageSubmit = content => {
     const username = this.state.currentUser.name;
     const type = "postMessage"
     const message = {
       type,
       username,
       content
     }
     this.socket.send(JSON.stringify({message}))
  }

  componentDidMount() {

  console.log("componentDidMount <App />");
  this.socket = new WebSocket("ws://localhost:3001", "Howdy");

   this.socket.addEventListener("message", event => {
     let message = JSON.parse(event.data);


     switch(message.message.type){
       case "incomingMessage":
       console.log(event.data);
       const messageFormat = {
         username: message.message.username,
         content: message.message.content,
         id: message.message.id
       }
       let messages = [...this.state.messages, messageFormat]
       this.setState({messages});
      break;
     case "incomingNotification":
      console.log(event.data)
      const notifyMessage = {
        username: message.message.username,
        content: message.message.content,
        id: message.message.id
      }
       messages = [...this.state.messages, notifyMessage]
      this.setState({messages});
     break;
     default:
     throw new Error("Unknown data type" , message.message.type)
   }
   });
}

  render() {
    return (
      <div >
      <MessageList messages={this.state.messages}
      updateUser={this.state.messages}
      />
      <ChatBar name={this.state.currentUser.name}
      handleUserChange={this.handleUserChange}
      onMessageSubmit={this.handleMessageSubmit}
      placeholder="Type a message and hit ENTER"
      />
      </div>
    );
  }
}
export default App;
