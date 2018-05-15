import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);

  }

  render() {
    // let username = this.state.currentUser
    if(this.props.name){
      return (
        <footer className="chatbar">
        <input id="chatbar-username" value={this.props.name} />
        <input id="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
      );
    } else {
    return (
      <footer className="chatbar">
      <input id="chatbar-username" placeholder="Your Name (Optional)" />
      <input id="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
    );
  }
  }
}
export default ChatBar;
