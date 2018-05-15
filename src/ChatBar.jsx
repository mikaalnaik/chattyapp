import React, {Component} from 'react';



class ChatBar extends Component {
  constructor(props){
    super(props);

  }


  handleKeyPress = (e) => {
    if(e.key == 13){
      this.props.handleSubmit
    }
  }




  render() {
    // let username = this.state.currentUser
    if(this.props.name){
      return (
        <footer className="chatbar">
        <input id="chatbar-username" name="username" value={this.props.name} />
        <input id="chatbar-message" name="content" onKeyDown={this.handleKeyPress} placeholder={this.props.placeholder} />
      </footer>
      );
    } else {
    return (
      <footer className="chatbar">
      <input id="chatbar-username" name="username"  placeholder="Your Name (Optional)" />
      <input id="chatbar-message" name="content"  onKeyDown={this.handleKeyPress} placeholder="Type a message and hit ENTER" />
    </footer>
    );
  }
  }
}
export default ChatBar;
