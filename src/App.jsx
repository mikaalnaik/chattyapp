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

  handleUserChange = name => {
    console.log(name)
  }

   handleMessageSubmit = content => {
     const username = this.state.currentUser.name;
     const message = {
       username,
       content
     }
     const messages = [...this.state.messages, message]
     this.setState({messages})
  }



  componentDidMount() {

  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 4, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}


  render() {

    return (
      <div >
      <MessageList messages={this.state.messages} />
      <ChatBar name={this.state.currentUser.name} handleUserChange={this.handleUserChange}  onMessageSubmit={this.handleMessageSubmit} placeholder="Type a message and hit ENTER"/>
      </div>


    );
  }
}
export default App;
