import React, {Component} from 'react';



class ChatBar extends Component {
  constructor(props){
    super(props);

  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.props.onMessageSubmit(e.target.value)
      e.target.value = ''
    }
  }


  handleUserSubmit = (e) => {
    if(e.key === 'Enter'){
      this.props.handleUserChange(e.target.value)
    }
  }



  render() {
    // let username = this.state.currentUser
    return (
      <footer className="chatbar">
      <input id="chatbar-username" name="username" onKeyDown={this.handleUserSubmit} placeholder={ this.props.name  || "Your Name (Optional)"}   />
      <input id="chatbar-message" name="content" onKeyDown={this.handleKeyPress} placeholder="Type a message and hit ENTER" />
    </footer>
    );
  }
}
export default ChatBar;
