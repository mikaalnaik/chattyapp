import React, {Component} from 'react';




class Message extends Component {
  constructor(props){
    super(props);

  }

  render() {

    return (
      <p>
        <span className="message-username">{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </p>

    );
  }
}
export default Message;
