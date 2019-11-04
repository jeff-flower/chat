import React from 'react';

import {Message} from './Messenger';

import './MessageList.css';

export interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({messages}) => (
  <div>
    <h2 id="messages">Messages</h2>
    <ul aria-labelledby="messages" className="message-list">
      {messages.map(message => (
        <li
          key={message.id}
          className="message-list__message"
          data-testid="messageListItem"
        >
          {`${message.from}: ${message.text}`}
        </li>
      ))}
    </ul>
  </div>
);