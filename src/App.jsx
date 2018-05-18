import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
  currentUser: {
    name: "Anonymous",
    },
  messages: [],
  color: ""
}
  }
//sending user change
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
// sending new messages
   handleMessageSubmit = content => {
     const username = this.state.currentUser.name;
     const color = this.state.color
     const type = "postMessage"
     const message = {
       type,
       username,
       content,
       color
     }
     console.log('submit message', message);
     this.socket.send(JSON.stringify({message}))
  }



  componentDidMount() {

  console.log("componentDidMount <App />");
  this.socket = new WebSocket("ws://localhost:3001", "Howdy");

   this.socket.addEventListener("message", event => {
     console.log('eventdata listner',event.data);
     let message = JSON.parse(event.data);

//evaluate the message type to display either a new message or a username change
     switch(message.message.type){
       case "incomingMessage":
       const messageFormat = {
         username: message.message.username,
         content: message.message.content,
         id: message.message.id,
         color: message.message.color

       }
       let messages = [...this.state.messages, messageFormat]
       console.log("incoming state",this.state)
       this.setState({messages});
      break;

     case "incomingNotification":
      console.log("incomingNotification", event.data)
      const notifyMessage = {
        username: message.message.username,
        content: message.message.content,
        id: message.message.id
      }
       messages = [...this.state.messages, notifyMessage]
      this.setState({messages});
     break;

      case "userNumber":
        const displayUserNumber = message.message.numberofUsers
        console.log("Number of users" ,displayUserNumber);
        this.setState({displayUserNumber})
        console.log("usernumber",this.state);
        break;
        case "currentUser":
        let color = message.message.color
        this.setState({color})
        console.log('Newcolor state' , this.state);
        break;
     default:
     console.log("Unknown data type")
   }
   });
}

  render() {
    return (
      <div>
      <NavBar userNums ={this.state.displayUserNumber}/>
      <MessageList messages={this.state.messages}
      updateUser={this.state.messages}
      color={this.state.color}
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
