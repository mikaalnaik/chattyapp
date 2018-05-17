import React, {Component} from 'react';




class Message extends Component {
  constructor(props){
    super(props);

  }


  render() {
    let userColor = {
      color : this.props.message.color
    }
    console.log('userColor', userColor)
    if(!this.props.message.username){
      return (<div className="notification">
  <span className="notification-content">{this.props.message.content}</span>
</div>)
} else {

    return (
      <p>
        <span className="message-username" style={userColor}>{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </p>

    );
  }
}
}
export default Message;
