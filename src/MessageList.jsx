import React, {Component} from 'react';
import Message  from './Message.jsx';


class MessageList extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let MessageOutput = this.props.messages.map((message, index) => (
      <div key={message.id}>
    <Message message={message} color={this.props.message} />
    </div>
    ))

    return (
      <main className="messages">
      {MessageOutput}
      <div className="message">
      </div>
      </main>
    );
  }
}
export default MessageList;
