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

    let handleSubmit = (e) => {
      event.preventDefault();
      const newMessage = {
        username: event.target.username.value,
        content: event.target.content.value
      }
      const messages = this.props.messages.concat(newMessage)
      this.setState({messages:messages})
    }
    return (
      <div >
      <MessageList messages={this.state.messages} />
      <ChatBar name={this.state.currentUser.name} handleSubmit={this.handleSubmit} placeholder="Type a message and hit ENTER"/>
      </div>


    );
  }
}
export default App;
