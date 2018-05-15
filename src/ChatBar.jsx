import React, {Component} from 'react';

class ChatBar extends Component {

  render() {
    // let username = this.state.currentUser
    return (
      <footer className="chatbar">
      <input id="chatbar-username" placeholder="Your Name (Optional)" />
      <input id="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
    );
  }
}
export default ChatBar;
